/*
  # Create user trigger for automatic user data insertion

  1. New Functions
    - `handle_new_user()` - Automatically inserts user data into public.users table when a new auth user is created
  
  2. New Triggers
    - `on_auth_user_created` - Triggers the handle_new_user function after auth.users insert
  
  3. Security
    - Function uses SECURITY DEFINER to bypass RLS for this specific operation
    - Ensures user data is properly populated without client-side RLS violations
*/

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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();