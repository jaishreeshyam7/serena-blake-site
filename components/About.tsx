
import Image from "next/image";

const About = () => {
  return (
    <section className="py-20 bg-pattern-waves bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 relative overflow-hidden" id="about">
      {/* Floating background elements */}
      <div className="absolute top-10 right-20 w-24 h-24 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-300/15 to-cyan-300/15 rounded-full blur-2xl animate-pulse delay-700"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Dr. Blake
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded animate-pulse"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            {/* Office Image */}
            <div className="lg:order-1 flex justify-center">
              <div className="relative group">
                <div className="relative z-10 hover-lift">
                  <Image
                    src="/images/office/therapy-office.svg"
                    alt="Dr. Blake's therapy office - a calm, welcoming space for healing"
                    width={350}
                    height={260}
                    className="rounded-2xl shadow-xl object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-emerald-400/20 blur-sm -z-10 group-hover:blur-md transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-purple-200/30 to-emerald-200/30 rounded-2xl transform rotate-2 scale-95 -z-20 animate-pulse delay-300"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:order-2 lg:col-span-2 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA, with eight years of experience and over 500 client sessions.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                She blends evidence-based approaches—like <span className="font-semibold text-blue-700 relative">
                  cognitive-behavioral therapy and mindfulness
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded"></span>
                </span>—with compassionate, personalized care to help you overcome anxiety, strengthen relationships, and heal from trauma.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you meet in her Maplewood Drive office or connect virtually via Zoom, Dr. Blake is committed to creating a <span className="font-semibold text-blue-700 relative">
                  safe, supportive space
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></span>
                </span> for you to thrive.
              </p>
            </div>
          </div>

          {/* Credentials Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80 p-8 rounded-2xl glass-effect hover-lift relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-6 relative z-10 text-center">Credentials & Experience</h3>
              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 mr-3 flex-shrink-0 group-hover:animate-pulse"></div>
                  <div>
                    <p className="font-medium text-gray-900">Licensed Clinical Psychologist (PsyD)</p>
                    <p className="text-gray-600">State of California</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-3 mr-3 flex-shrink-0 group-hover:animate-pulse"></div>
                  <div>
                    <p className="font-medium text-gray-900">8+ Years of Practice</p>
                    <p className="text-gray-600">Specializing in anxiety, relationships, and trauma</p>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mt-3 mr-3 flex-shrink-0 group-hover:animate-pulse"></div>
                  <div>
                    <p className="font-medium text-gray-900">500+ Client Sessions</p>
                    <p className="text-gray-600">Evidence-based therapeutic approaches</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-sm"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
