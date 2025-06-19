import React from 'react';
import { Zap, Twitter, Github, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = {
    Solutions: [
      { name: 'For Job Seekers', href: '#' },
      { name: 'For Universities', href: '#' },
      { name: 'For Job Boards', href: '#' },
      { name: 'For Recruiters', href: '#' },
      { name: 'API Access', href: '#' }
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Events', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#' },
    { icon: Github, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Facebook, href: '#' }
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">HIRESAFE AI</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Protecting job seekers from scams with advanced AI and blockchain technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-500/30 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-white mb-6">{category}</h4>
              <ul className="space-y-4">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 HireSafe AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};