
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center">
      <div className="container mx-auto px-4 py-16">
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
              <div className="w-24 h-1 bg-blue-600 rounded"></div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
              Creating a <span className="font-semibold text-blue-700">safe, supportive space</span> for you to overcome anxiety, strengthen relationships, and heal from trauma through evidence-based therapy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:scale-105"
              >
                Schedule Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg transition-all duration-300"
                onClick={() => window.open('tel:3235550192')}
              >
                <Phone className="mr-2 h-5 w-5" />
                (323) 555-0192
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                8+ Years Experience
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                500+ Sessions
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Dr. Serena Blake - Clinical Psychologist"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto object-cover aspect-[4/5]"
                width={400}
                height={500}
                priority
              />
            </div>
            <div className="absolute inset-0 bg-blue-200 rounded-2xl transform rotate-3 scale-95 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
