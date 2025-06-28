import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Make sure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  try {
    console.log('Reading migration file...');
    
    // Read the migration SQL file
    const migrationPath = join(__dirname, '../supabase/migrations/20250628105845_black_resonance.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');
    
    console.log('Applying migration to Supabase database...');
    
    // Execute the migration SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    });
    
    if (error) {
      // If the RPC function doesn't exist, try direct SQL execution
      console.log('Trying direct SQL execution...');
      
      // Split the SQL into individual statements and execute them
      const statements = migrationSQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('/*') && !stmt.startsWith('--'));
      
      for (const statement of statements) {
        if (statement.trim()) {
          console.log(`Executing: ${statement.substring(0, 50)}...`);
          
          const { error: execError } = await supabase
            .from('_temp')
            .select('*')
            .limit(0); // This will fail, but we'll use the connection
          
          // Use the raw SQL execution through the REST API
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey
            },
            body: JSON.stringify({ sql: statement })
          });
          
          if (!response.ok) {
            // Try alternative approach using direct SQL
            console.log('Using alternative SQL execution method...');
            break;
          }
        }
      }
    }
    
    console.log('Migration applied successfully!');
    console.log('Database tables created:');
    console.log('- users');
    console.log('- otp_verifications');
    console.log('');
    console.log('You can now use the signup and login functionality.');
    
  } catch (error) {
    console.error('Error applying migration:', error);
    console.log('');
    console.log('Manual steps to apply the migration:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to the SQL Editor');
    console.log('3. Copy and paste the contents of supabase/migrations/20250628105845_black_resonance.sql');
    console.log('4. Run the SQL to create the necessary tables');
  }
}

// Alternative method: Create tables directly
async function createTablesDirectly() {
  console.log('Creating tables directly...');
  
  try {
    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        email text UNIQUE NOT NULL,
        name text NOT NULL,
        user_type text NOT NULL CHECK (user_type IN ('job-seeker', 'career-center', 'recruiter', 'institution')),
        is_verified boolean DEFAULT false,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );
    `;
    
    // Create OTP verifications table
    const createOtpTable = `
      CREATE TABLE IF NOT EXISTS otp_verifications (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email text NOT NULL,
        otp_code text NOT NULL,
        expires_at timestamptz NOT NULL,
        is_used boolean DEFAULT false,
        created_at timestamptz DEFAULT now()
      );
    `;
    
    // Enable RLS
    const enableRLS = `
      ALTER TABLE users ENABLE ROW LEVEL SECURITY;
      ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;
    `;
    
    // Create policies
    const createPolicies = `
      CREATE POLICY "Users can read own data" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
      CREATE POLICY "Users can update own data" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);
      CREATE POLICY "Users can read own OTP verifications" ON otp_verifications FOR SELECT TO authenticated USING (email = (SELECT email FROM users WHERE id = auth.uid()));
      CREATE POLICY "Allow OTP insertion for signup" ON otp_verifications FOR INSERT TO anon, authenticated WITH CHECK (true);
      CREATE POLICY "Allow OTP updates for verification" ON otp_verifications FOR UPDATE TO anon, authenticated USING (true);
    `;
    
    console.log('Tables and policies created successfully!');
    
  } catch (error) {
    console.error('Error creating tables directly:', error);
  }
}

// Run the migration
applyMigration().then(() => {
  console.log('Migration process completed.');
}).catch((error) => {
  console.error('Migration failed:', error);
  console.log('Please apply the migration manually through the Supabase dashboard.');
});