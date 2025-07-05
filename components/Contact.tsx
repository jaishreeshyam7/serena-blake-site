
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact & Schedule
            </h2>
            <p className="text-lg text-gray-700">
              Ready to take the first step? I'm here to help.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-gray-900">
                    <Phone className="mr-3 h-6 w-6 text-blue-600" />
                    Phone & Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-lg py-6 border-2 border-blue-200 hover:bg-blue-50"
                      onClick={() => window.open('tel:3235550192')}
                    >
                      <Phone className="mr-3 h-5 w-5 text-blue-600" />
                      (323) 555-0192
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-lg py-6 border-2 border-blue-200 hover:bg-blue-50"
                      onClick={() => window.open('mailto:serena@blakepsychology.com')}
                    >
                      <Mail className="mr-3 h-5 w-5 text-blue-600" />
                      serena@blakepsychology.com
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-gray-900">
                    <Calendar className="mr-3 h-6 w-6 text-blue-600" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">In-Person Sessions</h4>
                    <p className="text-gray-700">Tuesday & Thursday</p>
                    <p className="text-gray-700">10:00 AM - 6:00 PM</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Virtual Sessions (Zoom)</h4>
                    <p className="text-gray-700">Monday, Wednesday & Friday</p>
                    <p className="text-gray-700">1:00 PM - 5:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location & Action */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Office Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg">
                      1287 Maplewood Drive<br />
                      Los Angeles, CA 90026
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-blue-200 hover:bg-blue-50"
                      onClick={() => window.open('https://maps.google.com/?q=1287+Maplewood+Drive+Los+Angeles+CA+90026')}
                    >
                      View on Google Maps
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
                  <p className="mb-6 text-blue-100">
                    Take the first step towards positive change. Contact me today to schedule your consultation.
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                    onClick={() => window.open('tel:3235550192')}
                  >
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                <p className="text-amber-800">
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
