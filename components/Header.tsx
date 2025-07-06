'use client'

import Image from "next/image";
import { Phone, Mail } from "lucide-react";

const Header = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/image.png"
              alt="Dr. Serena Blake - Clinical Psychologist"
              className="rounded-full w-12 h-12 object-cover shadow-lg ring-2 ring-blue-100"
              width={48}
              height={48}
              priority
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Dr. Serena Blake</h1>
              <p className="text-sm text-blue-600">Clinical Psychologist, PsyD</p>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:3235550192"
              className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <Phone className="w-4 h-4 mr-2" />
              (323) 555-0192
            </a>
            <button
              onClick={scrollToContact}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Schedule Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={scrollToContact}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;