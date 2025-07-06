
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Calendar } from "lucide-react";
import Image from "next/image";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-magic bg-pattern-waves relative overflow-hidden" id="contact">
      {/* Floating background elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-purple-300/15 to-pink-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-emerald-300/15 to-teal-300/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-xl animate-pulse delay-700"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact & Schedule
            </h2>
            <p className="text-lg text-gray-700">
              Ready to take the first step? I'm here to help.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mt-4 rounded animate-pulse"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg hover-lift glass-effect bg-gradient-to-br from-white/90 to-blue-50/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-pattern-dots opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center text-xl text-gray-900 group-hover:text-blue-800 transition-colors duration-300">
                    <Phone className="mr-3 h-6 w-6 text-blue-600 group-hover:animate-pulse" />
                    Phone & Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-lg py-6 border-2 border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 neon-glow"
                      onClick={() => window.open('tel:3235550192')}
                    >
                      <Phone className="mr-3 h-5 w-5 text-blue-600" />
                      (323) 555-0192
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-lg py-6 border-2 border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 neon-glow"
                      onClick={() => window.open('mailto:serena@blakepsychology.com')}
                    >
                      <Mail className="mr-3 h-5 w-5 text-blue-600" />
                      serena@blakepsychology.com
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover-lift glass-effect bg-gradient-to-br from-white/90 to-purple-50/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-pattern-dots opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center text-xl text-gray-900 group-hover:text-purple-800 transition-colors duration-300">
                    <Calendar className="mr-3 h-6 w-6 text-purple-600 group-hover:animate-pulse" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2 animate-pulse"></div>
                      In-Person Sessions
                    </h4>
                    <p className="text-gray-700">Tuesday & Thursday</p>
                    <p className="text-gray-700">10:00 AM - 6:00 PM</p>
                  </div>
                  <div className="border-t border-gray-200/50 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 animate-pulse delay-300"></div>
                      Virtual Sessions (Zoom)
                    </h4>
                    <p className="text-gray-700">Monday, Wednesday & Friday</p>
                    <p className="text-gray-700">1:00 PM - 5:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location & Action */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg hover-lift glass-effect bg-gradient-to-br from-white/90 to-emerald-50/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-pattern-dots opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl text-gray-900 group-hover:text-emerald-800 transition-colors duration-300">Office Location</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg">
                      1287 Maplewood Drive<br />
                      Los Angeles, CA 90026
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-emerald-200 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 transition-all duration-300 neon-glow"
                      onClick={() => window.open('https://maps.google.com/?q=1287+Maplewood+Drive+Los+Angeles+CA+90026')}
                    >
                      View on Google Maps
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white border-0 shadow-lg hover-lift relative overflow-hidden group">
                <div className="absolute inset-0 bg-pattern-dots opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-white/10 to-cyan-300/20 rounded-full blur-xl group-hover:animate-pulse"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Consultation Image */}
                    <div className="relative group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/images/office/consultation.svg"
                        alt="Consultation - taking the first step"
                        width={150}
                        height={100}
                        className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    
                    {/* Text Content */}
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
                      <p className="mb-6 text-blue-100">
                        Take the first step towards positive change. Contact me today to schedule your consultation.
                      </p>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-white to-blue-50 text-blue-600 hover:from-blue-50 hover:to-purple-50 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 neon-glow"
                        onClick={() => window.open('tel:3235550192')}
                      >
                        Schedule Consultation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gradient-to-r from-amber-50/90 to-orange-50/90 border-l-4 border-gradient-to-b border-amber-400 p-6 rounded-r-lg glass-effect relative overflow-hidden group">
                <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-r from-amber-300/20 to-orange-300/20 rounded-full blur-sm"></div>
                <p className="text-amber-800 relative z-10">
                  <strong>New Client Note:</strong> I typically respond to new inquiries within 24 hours. For urgent mental health concerns, please contact your local emergency services or crisis hotline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
