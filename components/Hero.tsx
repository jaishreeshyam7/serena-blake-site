
'use client'

import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-magic bg-pattern-dots floating-shapes flex items-center relative overflow-hidden pt-20">
      {/* Additional floating elements */}
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-lg animate-bounce delay-500"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Dr. Serena Blake
              </h1>
              <p className="text-xl md:text-2xl text-blue-600 font-medium">
                Clinical Psychologist, PsyD
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded animate-pulse"></div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
              Creating a <span className="font-semibold text-blue-700 relative">
                safe, supportive space
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></span>
              </span> for you to overcome anxiety, strengthen relationships, and heal from trauma through evidence-based therapy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105 neon-glow hover-lift"
              >
                Schedule Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 px-8 py-6 text-lg rounded-lg transition-all duration-300 hover-lift glass-effect"
                onClick={() => window.open('tel:3235550192')}
              >
                <Phone className="mr-2 h-5 w-5" />
                (323) 555-0192
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center glass-effect px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2 animate-pulse"></div>
                8+ Years Experience
              </div>
              <div className="flex items-center glass-effect px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2 animate-pulse delay-300"></div>
                500+ Sessions
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative z-10">
              <Image
              src="/image.png"
              alt="Dr. Serena Blake - Clinical Psychologist"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover aspect-[4/5] hover-lift"
              width={400}
              height={500}
              priority
              />
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-sm -z-10"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 via-purple-200/50 to-pink-200/50 rounded-2xl transform rotate-3 scale-95 -z-20 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-200/30 via-blue-200/30 to-indigo-200/30 rounded-2xl transform -rotate-2 scale-90 -z-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
