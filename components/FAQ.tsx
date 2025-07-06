
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Do you accept insurance?",
      answer: "No, I do not accept insurance directly. However, I provide detailed superbills that you can submit to your insurance provider for potential reimbursement. Many clients find that their out-of-network benefits help cover a portion of the cost."
    },
    {
      question: "Are online sessions available?",
      answer: "Yes! I offer virtual sessions via Zoom on Mondays, Wednesdays, and Fridays from 1 PM to 5 PM. Online therapy can be just as effective as in-person sessions and offers greater flexibility for busy schedules."
    },
    {
      question: "What is your cancellation policy?",
      answer: "I require 24-hour notice for cancellations or rescheduling. Appointments cancelled with less than 24 hours notice will be charged the full session fee, except in cases of emergency or illness."
    },
    {
      question: "How long are therapy sessions?",
      answer: "Individual therapy sessions are 50 minutes long, while couples sessions are 60 minutes. This allows adequate time to explore issues deeply while maintaining a structured therapeutic framework."
    },
    {
      question: "How often should I attend sessions?",
      answer: "Most clients benefit from weekly sessions initially. As progress is made, we may adjust to bi-weekly or monthly sessions based on your needs and therapeutic goals. We'll discuss what frequency works best for your situation."
    },
    {
      question: "What should I expect in the first session?",
      answer: "The first session focuses on understanding your concerns, history, and goals for therapy. We'll discuss confidentiality, treatment approaches, and develop an initial plan. It's normal to feel nervous - my goal is to create a comfortable, non-judgmental space."
    }
  ];

  return (
    <section className="py-20 bg-pattern-dots bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 relative overflow-hidden" id="faq">
      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-2xl animate-pulse delay-300"></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-pink-300/20 to-rose-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-r from-cyan-300/15 to-teal-300/15 rounded-full blur-lg animate-bounce delay-700"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700">
              Common questions about therapy sessions and my practice
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mt-4 rounded animate-pulse"></div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover-lift glass-effect bg-gradient-to-r from-white/90 via-blue-50/20 to-purple-50/20 relative overflow-hidden group"
              >
                {/* Decorative elements */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <AccordionTrigger className="text-left text-lg font-medium text-gray-900 py-6 px-6 hover:text-blue-800 transition-colors duration-300 relative z-10">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed pb-6 px-6 relative z-10">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
