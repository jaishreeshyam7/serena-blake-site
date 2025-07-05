
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
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700">
              Common questions about therapy sessions and my practice
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-gray-900 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed pb-6">
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
