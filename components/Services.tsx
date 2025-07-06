
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Anxiety & Stress Management",
      description: "Learn effective strategies to manage overwhelming thoughts, reduce worry, and develop healthy coping mechanisms for daily stressors.",
      features: ["Cognitive Behavioral Therapy", "Mindfulness & Relaxation", "Stress Reduction Techniques", "Panic Disorder Treatment"],
      price: "$200",
      duration: "50 minutes"
    },
    {
      title: "Relationship Counseling",
      description: "Individual and couples therapy to improve communication, resolve conflicts, and build stronger, more fulfilling relationships.",
      features: ["Communication Skills", "Conflict Resolution", "Couples Therapy", "Relationship Building"],
      price: "$240",
      duration: "60 minutes"
    },
    {
      title: "Trauma Recovery",
      description: "Compassionate, evidence-based care to help you process traumatic experiences and develop resilience for healing and growth.",
      features: ["Trauma-Informed Therapy", "EMDR Therapy", "Post-Traumatic Growth", "Safety & Stabilization"],
      price: "$200",
      duration: "50 minutes"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">
              Services & Specialties
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Evidence-based therapeutic approaches tailored to your unique needs and goals, delivered with compassion and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-800 mb-3 font-semibold">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">Session Fee</span>
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                    </div>
                    <p className="text-sm text-gray-500">{service.duration} session</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 p-8 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Insurance & Payment</h3>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              <strong>Insurance:</strong> I do not accept insurance directly, but I provide detailed superbills that you can submit to your insurance provider for potential reimbursement. Many clients find their out-of-network benefits help cover a portion of the cost.
            </p>
            <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <strong>Payment Methods:</strong><br />
                Credit Card, HSA/FSA
              </div>
              <div>
                <strong>Cancellation:</strong><br />
                24-hour notice required
              </div>
              <div>
                <strong>Good Faith Estimate:</strong><br />
                Available upon request
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
