/*
  # Fix user profile creation issue

  1. Problem
    - The RLS policy "Allow authenticated user to insert own data" is preventing 
      the handle_new_user trigger from creating user profiles
    - This policy blocks system-level inserts performed by SECURITY DEFINER functions

  2. Solution
    - Remove the conflicting RLS policy
    - The trigger function will handle user creation automatically
    - Users can still read and update their own data via existing policies

  3. Security
    - User creation will be handled exclusively by the database trigger
    - Existing read and update policies remain intact
    - This prevents direct client inserts while allowing system inserts
*/

-- Drop the conflicting RLS policy that prevents trigger-based inserts
DROP POLICY IF EXISTS "Allow authenticated user to insert own data" ON users;

-- Note: The handle_new_user trigger will handle user creation automatically
-- Users can still read and update their data via the existing policies:
-- - "Users can read own data" 
-- - "Users can update own data"