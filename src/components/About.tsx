
const About = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Dr. Blake
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA, with eight years of experience and over 500 client sessions.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                She blends evidence-based approaches—like <span className="font-semibold text-blue-700">cognitive-behavioral therapy and mindfulness</span>—with compassionate, personalized care to help you overcome anxiety, strengthen relationships, and heal from trauma.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you meet in her Maplewood Drive office or connect virtually via Zoom, Dr. Blake is committed to creating a <span className="font-semibold text-blue-700">safe, supportive space</span> for you to thrive.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Credentials & Experience</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">Licensed Clinical Psychologist (PsyD)</p>
                    <p className="text-gray-600">State of California</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">8+ Years of Practice</p>
                    <p className="text-gray-600">Specializing in anxiety, relationships, and trauma</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">500+ Client Sessions</p>
                    <p className="text-gray-600">Evidence-based therapeutic approaches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
