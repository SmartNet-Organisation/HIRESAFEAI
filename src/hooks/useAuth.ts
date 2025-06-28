import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    console.log('🔍 Initializing auth state...');
    
    // Check initial auth state
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.id);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const userData = await authService.getCurrentUser();
          setAuthState({
            user: userData,
            isLoading: false,
            isAuthenticated: !!userData
          });
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      }
    );

    return () => {
      console.log('🧹 Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      console.log('🔍 Checking current auth state...');
      const userData = await authService.getCurrentUser();
      
      setAuthState({
        user: userData,
        isLoading: false,
        isAuthenticated: !!userData
      });
      
      console.log('✅ Auth check completed:', !!userData);
    } catch (error) {
      console.error('❌ Auth check error:', error);
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    }
  };

  const login = async (email: string, password: string) => {
    console.log('🔑 Login attempt via useAuth hook');
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const result = await authService.signIn({ email, password });
      
      if (result.success && result.user) {
        setAuthState({
          user: result.user,
          isLoading: false,
          isAuthenticated: true
        });
        return result;
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return result;
      }
    } catch (error) {
      console.error('❌ Login error in useAuth:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('👋 Logout attempt via useAuth hook');
      await authService.signOut();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  return {
    ...authState,
    login,
    logout,
    checkAuth
  };
};