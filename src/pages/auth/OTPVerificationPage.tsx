import React, { useState, useEffect, useRef } from 'react';
import { Zap, ArrowLeft, Mail, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { authService } from '../../services/authService';

interface OTPVerificationPageProps {
  onNavigate: (page: string, data?: any) => void;
  email: string;
  userName: string;
}

export const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({ 
  onNavigate, 
  email, 
  userName 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Start timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        // Allow resend after 1 minute (540 seconds remaining)
        if (prev === 540) {
          setCanResend(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    setSuccess('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      setSuccess('');
      
      // Focus last input
      inputRefs.current[5]?.focus();
      
      // Auto-verify
      handleVerifyOTP(pastedData);
    }
  };

  const handleVerifyOTP = async (otpCode?: string) => {
    const code = otpCode || otp.join('');
    
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('🔍 Verifying OTP...');
      
      const result = await authService.verifyOTP(email, code);
      
      if (result.success) {
        console.log('✅ OTP verification successful');
        setSuccess('Email verified successfully! Redirecting...');
        
        // Wait a moment to show success message
        setTimeout(() => {
          onNavigate('dashboard', { userName });
        }, 1500);
      } else {
        console.error('❌ OTP verification failed:', result.message);
        setError(result.message);
        
        // Clear OTP and focus first input
        setOtp(['', '', '', '', '', '']);
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      }
    } catch (error) {
      console.error('❌ Unexpected OTP verification error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      console.log('🔄 Resending OTP...');
      
      const result = await authService.resendOTP(email);
      
      if (result.success) {
        console.log('✅ OTP resent successfully');
        setSuccess('New verification code sent to your email!');
        setTimeLeft(600); // Reset timer
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        
        // Focus first input
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      } else {
        console.error('❌ Failed to resend OTP:', result.message);
        setError(result.message);
      }
    } catch (error) {
      console.error('❌ Unexpected resend error:', error);
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleManualVerify = () => {
    handleVerifyOTP();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10 max-w-md w-full">
        <button
          onClick={() => onNavigate('signup')}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          disabled={isLoading}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Sign Up
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HIRESAFE AI</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
          <p className="text-gray-400 mb-4">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-purple-400 font-medium break-all">{email}</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
          {/* Email Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-purple-500/20 p-4 rounded-full">
              <Mail className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* OTP Input */}
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-bold bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                disabled={isLoading}
                autoComplete="off"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">
              {timeLeft > 0 ? (
                <>Code expires in: <span className="text-purple-400 font-medium">{formatTime(timeLeft)}</span></>
              ) : (
                <span className="text-red-400">Code has expired</span>
              )}
            </p>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleManualVerify}
            disabled={isLoading || otp.some(digit => digit === '') || timeLeft === 0}
            className="w-full mb-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </Button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
            <button
              onClick={handleResendOTP}
              disabled={isResending || !canResend}
              className="flex items-center justify-center space-x-2 text-purple-400 hover:text-purple-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
            >
              <RefreshCw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
              <span>
                {isResending ? 'Sending...' : 
                 !canResend ? `Resend in ${Math.ceil((540 - (600 - timeLeft)) / 60)}m` : 
                 'Resend Code'}
              </span>
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Check your spam folder if you don't see the email in your inbox
          </p>
        </div>
      </div>
    </div>
  );
};