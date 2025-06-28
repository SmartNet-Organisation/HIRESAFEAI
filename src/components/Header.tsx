import React, { useState } from 'react';
import { Zap, Menu, X, Download } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddToChrome = () => {
    // Check if running as extension
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
      alert('HireSafe AI is already installed as a Chrome extension!');
      return;
    }

    // For web version, provide download instructions
    const instructions = `To install HireSafe AI as a Chrome extension:

1. Download the extension files from our website
2. Open Chrome and go to chrome://extensions/
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the downloaded folder
5. The HireSafe AI extension will be added to Chrome

Note: This is a demo. In production, the extension would be available on the Chrome Web Store.`;

    alert(instructions);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">HIRESAFE AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            
            {/* Add to Chrome Button */}
            <button
              onClick={handleAddToChrome}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              <Download className="h-4 w-4" />
              <span>Add to Chrome</span>
            </button>

            <button
              onClick={() => onNavigate('signup')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800">
          <nav className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors">How It Works</a>
            <button
              onClick={() => onNavigate('pricing')}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <a href="#about" className="block text-gray-300 hover:text-white transition-colors">About</a>
            
            {/* Mobile Add to Chrome Button */}
            <button
              onClick={handleAddToChrome}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full justify-center"
            >
              <Download className="h-4 w-4" />
              <span>Add to Chrome</span>
            </button>

            <button
              onClick={() => onNavigate('signup')}
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium text-center"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};