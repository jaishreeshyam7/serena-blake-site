'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Calendar } from "lucide-react";

const GetInTouch = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-r from-blue-300/15 to-purple-300/15 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-r from-emerald-300/15 to-cyan-300/15 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Taking the first step toward healing and growth is brave. I'm here to support you every step of the way.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 mx-auto mt-4 rounded animate-pulse"></div>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Phone */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift glass-effect bg-gradient-to-br from-white/90 to-blue-50/30 group relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern-dots opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call</h3>
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto font-normal text-sm"
                  onClick={() => window.open('tel:3235550192')}
                >
                  (323) 555-0192
                </Button>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift glass-effect bg-gradient-to-br from-white/90 to-purple-50/30 group relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern-dots opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700 p-0 h-auto font-normal text-sm"
                  onClick={() => window.open('mailto:serena@blakepsychology.com')}
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift glass-effect bg-gradient-to-br from-white/90 to-emerald-50/30 group relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern-dots opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Form</h3>
                <Button
                  variant="ghost"
                  className="text-emerald-600 hover:text-emerald-700 p-0 h-auto font-normal text-sm"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Fill Out Form
                </Button>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift glass-effect bg-gradient-to-br from-white/90 to-orange-50/30 group relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern-dots opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Schedule</h3>
                <Button
                  variant="ghost"
                  className="text-orange-600 hover:text-orange-700 p-0 h-auto font-normal text-sm"
                  onClick={() => window.open('tel:3235550192')}
                >
                  Book Session
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-white/10 to-cyan-300/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Take the First Step Today</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Whether you're dealing with anxiety, relationship challenges, or trauma, you don't have to face it alone. 
                I'm here to provide the support and tools you need to thrive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 neon-glow"
                  onClick={() => window.open('tel:3235550192')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              <strong>Response Time:</strong> I typically respond to new inquiries within 24 hours • 
              <strong> Emergency:</strong> For urgent mental health concerns, please contact your local emergency services
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;