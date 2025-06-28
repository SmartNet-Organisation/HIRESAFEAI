import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file');
  process.exit(1);
}

async function setupDatabase() {
  console.log('🚀 Setting up HireSafe AI database...\n');

  try {
    // Read all migration files
    const migrationFiles = [
      '20250628105845_black_resonance.sql',
      '20250628112435_noisy_mouse.sql', 
      '20250628113056_fierce_pebble.sql'
    ];

    console.log('📋 Database Setup Instructions');
    console.log('================================\n');
    
    console.log('Since we\'re in a WebContainer environment, please follow these steps to set up your database:\n');
    
    console.log('1. Open your Supabase Dashboard: https://supabase.com/dashboard');
    console.log('2. Navigate to your project');
    console.log('3. Go to the SQL Editor');
    console.log('4. Copy and paste the following SQL code:\n');
    
    console.log('--- START OF SQL CODE ---');
    console.log('/*');
    console.log(' * HireSafe AI Database Setup');
    console.log(' * This creates all necessary tables, policies, and triggers');
    console.log(' */\n');

    // Combine all migration content
    let combinedSQL = '';
    
    for (const fileName of migrationFiles) {
      const migrationPath = join(__dirname, '../supabase/migrations', fileName);
      try {
        const migrationContent = readFileSync(migrationPath, 'utf8');
        combinedSQL += `-- Migration: ${fileName}\n`;
        combinedSQL += migrationContent;
        combinedSQL += '\n\n';
      } catch (error) {
        console.log(`⚠️  Could not read ${fileName} - it may not exist yet`);
      }
    }

    // If no migration files found, provide the essential schema
    if (!combinedSQL.trim()) {
      combinedSQL = `
-- Essential HireSafe AI Database Schema

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

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data" ON users 
  FOR SELECT TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users 
  FOR UPDATE TO authenticated 
  USING (auth.uid() = id);

-- Create policies for OTP verifications
CREATE POLICY "Users can read own OTP verifications" ON otp_verifications 
  FOR SELECT TO authenticated 
  USING (email = (SELECT email FROM users WHERE id = auth.uid()));

CREATE POLICY "Allow OTP insertion for signup" ON otp_verifications 
  FOR INSERT TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow OTP updates for verification" ON otp_verifications 
  FOR UPDATE TO anon, authenticated 
  USING (true);

-- Create trigger function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name, user_type, is_verified)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', 'User'),
    COALESCE(new.raw_user_meta_data->>'user_type', 'job-seeker'),
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
`;
    }

    console.log(combinedSQL);
    console.log('--- END OF SQL CODE ---\n');
    
    console.log('5. Click "Run" to execute the SQL');
    console.log('6. Verify that the tables were created successfully\n');
    
    console.log('✅ After running the SQL, your database will have:');
    console.log('   - users table (for user profiles)');
    console.log('   - otp_verifications table (for email verification)');
    console.log('   - Proper Row Level Security policies');
    console.log('   - Automatic user profile creation trigger\n');
    
    console.log('🔄 Once complete, the OTP verification should work correctly!');
    
  } catch (error) {
    console.error('❌ Error reading migration files:', error);
    console.log('\n📋 Manual Setup Required');
    console.log('Please create the database tables manually in your Supabase dashboard.');
  }
}

setupDatabase();