import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 ${hover ? 'hover:border-purple-500/30 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};