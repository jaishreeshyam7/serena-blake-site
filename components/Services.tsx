
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Anxiety & Stress Management",
      description: "Evidence-based techniques to help you manage overwhelming thoughts, reduce worry, and develop healthy coping strategies for daily stressors.",
      features: ["Cognitive Behavioral Therapy", "Mindfulness Techniques", "Relaxation Training", "Stress Reduction Strategies"],
      price: "$200"
    },
    {
      title: "Relationship Counseling",
      description: "Support for couples and individuals to improve communication, resolve conflicts, and build stronger, more fulfilling relationships.",
      features: ["Communication Skills", "Conflict Resolution", "Intimacy Building", "Couples Therapy"],
      price: "$240"
    },
    {
      title: "Trauma Recovery",
      description: "Compassionate, specialized care to help you process traumatic experiences and develop resilience for healing and growth.",
      features: ["Trauma-Informed Care", "EMDR Therapy", "Somatic Approaches", "Post-Traumatic Growth"],
      price: "$200"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Services & Specialties
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Personalized therapeutic approaches tailored to your unique needs and goals
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-900 mb-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Session Fee</span>
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto">
              <strong>Insurance:</strong> Not accepted, but superbills provided for self-submission to your insurance provider.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
