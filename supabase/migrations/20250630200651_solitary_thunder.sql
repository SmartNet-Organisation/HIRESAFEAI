/*
  # Authentication and User Management Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `name` (text)
      - `user_type` (text with check constraint)
      - `is_verified` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `otp_verifications`
      - `id` (uuid, primary key)
      - `email` (text)
      - `otp_code` (text)
      - `expires_at` (timestamp)
      - `is_used` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated user access
    - Add policies for OTP verification process

  3. Functions and Triggers
    - Auto-update timestamp function
    - Auto-create user profile on auth signup
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('job-seeker', 'career-center', 'recruiter', 'institution')),
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create OTP verifications table
CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  is_used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS (only if not already enabled)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'users' AND n.nspname = 'public' AND c.relrowsecurity = true
  ) THEN
    ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'otp_verifications' AND n.nspname = 'public' AND c.relrowsecurity = true
  ) THEN
    ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for users table (with existence checks)
DO $$
BEGIN
  -- Users can read own data
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data"
      ON users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  -- Users can update own data
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Users can update own data'
  ) THEN
    CREATE POLICY "Users can update own data"
      ON users
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  -- Allow authenticated user to insert own data
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Allow authenticated user to insert own data'
  ) THEN
    CREATE POLICY "Allow authenticated user to insert own data"
      ON users
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Create policies for OTP verifications table (with existence checks)
DO $$
BEGIN
  -- Users can read own OTP verifications
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'otp_verifications' AND policyname = 'Users can read own OTP verifications'
  ) THEN
    CREATE POLICY "Users can read own OTP verifications"
      ON otp_verifications
      FOR SELECT
      TO authenticated
      USING (email = (SELECT email FROM users WHERE id = auth.uid()));
  END IF;

  -- Allow OTP insertion for signup
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'otp_verifications' AND policyname = 'Allow OTP insertion for signup'
  ) THEN
    CREATE POLICY "Allow OTP insertion for signup"
      ON otp_verifications
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;

  -- Allow OTP updates for verification
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'otp_verifications' AND policyname = 'Allow OTP updates for verification'
  ) THEN
    CREATE POLICY "Allow OTP updates for verification"
      ON otp_verifications
      FOR UPDATE
      TO anon, authenticated
      USING (true);
  END IF;

  -- Allow OTP deletion for cleanup
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'otp_verifications' AND policyname = 'Allow OTP deletion for cleanup'
  ) THEN
    CREATE POLICY "Allow OTP deletion for cleanup"
      ON otp_verifications
      FOR DELETE
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

-- Create function to update updated_at timestamp (with existence check)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table (with existence check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at'
  ) THEN
    CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Create function to handle new user creation (replace if exists)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, user_type, is_verified)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'name', 
    NEW.raw_user_meta_data->>'user_type',
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic user creation (with existence check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;

-- Create indexes for better performance (with existence checks)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_verifications(email);
CREATE INDEX IF NOT EXISTS idx_otp_code ON otp_verifications(otp_code);
CREATE INDEX IF NOT EXISTS idx_otp_expires_at ON otp_verifications(expires_at);