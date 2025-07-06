
const About = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">
              About Dr. Blake
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Providing compassionate, evidence-based therapy to help you navigate life's challenges and discover your inner strength.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Dr. Serena Blake is a licensed clinical psychologist (PsyD) based in Los Angeles, CA, with eight years of experience helping individuals and couples overcome anxiety, strengthen relationships, and heal from trauma.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                She integrates <strong>evidence-based approaches</strong> including cognitive-behavioral therapy, mindfulness techniques, and trauma-informed care with compassionate, personalized treatment to help you achieve lasting positive change.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you meet in her comfortable Los Angeles office or connect through secure virtual sessions, Dr. Blake creates a safe, non-judgmental space where you can explore your thoughts and feelings at your own pace.
              </p>

              <div className="pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">My Approach</h3>
                <p className="text-gray-700 leading-relaxed">
                  I believe that everyone has the capacity for growth and healing. My role is to provide you with the tools, support, and insights needed to overcome challenges and build a more fulfilling life.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Credentials & Training</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Doctor of Psychology (PsyD)</p>
                    <p className="text-gray-600">Licensed Clinical Psychologist</p>
                    <p className="text-gray-600">California State License</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-800">8+ Years Clinical Experience</p>
                    <p className="text-gray-600">Over 500 successful therapy sessions</p>
                    <p className="text-gray-600">Anxiety, Relationships, Trauma</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-800">Specialized Training</p>
                    <p className="text-gray-600">Cognitive Behavioral Therapy</p>
                    <p className="text-gray-600">Trauma-Informed Care</p>
                    <p className="text-gray-600">Mindfulness-Based Interventions</p>
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
