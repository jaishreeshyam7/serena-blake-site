
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const Services = () => {
  const services = [
    {
      title: "Anxiety & Stress Management",
      description: "Evidence-based techniques to help you manage overwhelming thoughts, reduce worry, and develop healthy coping strategies for daily stressors.",
      features: ["Cognitive Behavioral Therapy", "Mindfulness Techniques", "Relaxation Training", "Stress Reduction Strategies"],
      price: "$200",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "from-blue-500 to-cyan-500",
      icon: "/images/services/anxiety-icon.svg"
    },
    {
      title: "Relationship Counseling",
      description: "Support for couples and individuals to improve communication, resolve conflicts, and build stronger, more fulfilling relationships.",
      features: ["Communication Skills", "Conflict Resolution", "Intimacy Building", "Couples Therapy"],
      price: "$240",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "from-purple-500 to-pink-500",
      icon: "/images/services/relationship-icon.svg"
    },
    {
      title: "Trauma Recovery",
      description: "Compassionate, specialized care to help you process traumatic experiences and develop resilience for healing and growth.",
      features: ["Trauma-Informed Care", "EMDR Therapy", "Somatic Approaches", "Post-Traumatic Growth"],
      price: "$200",
      gradient: "from-emerald-500/10 to-orange-500/10",
      iconColor: "from-emerald-500 to-orange-500",
      icon: "/images/services/trauma-icon.svg"
    }
  ];

  return (
    <section className="py-20 bg-gradient-magic bg-pattern-waves relative overflow-hidden" id="services">
      {/* Floating background elements */}
      <div className="absolute top-16 left-16 w-28 h-28 bg-gradient-to-r from-violet-300/20 to-purple-300/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-36 h-36 bg-gradient-to-r from-cyan-300/15 to-blue-300/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-emerald-300/10 to-teal-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Services & Specialties
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Personalized therapeutic approaches tailored to your unique needs and goals
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mt-4 rounded animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg hover-lift glass-effect bg-gradient-to-br ${service.gradient} relative overflow-hidden group`}>
                {/* Card background pattern */}
                <div className="absolute inset-0 bg-pattern-dots opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                {/* Decorative elements */}
                <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${service.iconColor} opacity-10 rounded-full blur-sm group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className={`absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r ${service.iconColor} opacity-10 rounded-full blur-sm group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 mr-4 hover:scale-110 transition-transform duration-300">
                      <Image
                        src={service.icon}
                        alt={`${service.title} icon`}
                        width={64}
                        height={64}
                        className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                    <CardTitle className="text-xl text-gray-900 group-hover:text-blue-800 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.iconColor} rounded-full mr-3 flex-shrink-0 group-hover:animate-pulse`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-200/50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Session Fee</span>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${service.iconColor} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>{service.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50/80 via-white/90 to-purple-50/80 glass-effect p-6 rounded-2xl max-w-2xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
              <p className="text-gray-600 relative z-10">
                <strong className="text-blue-700">Insurance:</strong> Not accepted, but superbills provided for self-submission to your insurance provider.
              </p>
              <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
