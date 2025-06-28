import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, header, sidebar, className = '' }) => {
  return (
    <div className="min-h-screen bg-black">
      {header}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
        {sidebar ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">{children}</div>
            <div className="lg:col-span-1">{sidebar}</div>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};