
'use client'

import { Button } from "@/components/ui/button";
import { Phone, Calendar } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 leading-tight">
                Ready to heal, grow, and thrive?
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                You deserve a safe space to explore your thoughts, feelings, and goals with compassionate, evidence-based care.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm Dr. Serena Blake, a licensed clinical psychologist specializing in <strong>anxiety</strong>, <strong>relationship counseling</strong>, and <strong>trauma recovery</strong>. Together, we'll work to help you overcome challenges and build the life you want.
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 pt-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  8+ Years Experience
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  500+ Sessions
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Licensed in California
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-md font-medium transition-all duration-300"
                onClick={() => window.open('tel:3235550192')}
              >
                <Phone className="mr-2 h-5 w-5" />
                (323) 555-0192
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative">
              <Image
                src="/image.png"
                alt="Dr. Serena Blake - Clinical Psychologist"
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto object-cover aspect-[3/4]"
                width={500}
                height={600}
                priority
              />
              {/* Subtle background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
