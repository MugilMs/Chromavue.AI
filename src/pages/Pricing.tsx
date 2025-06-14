import { SimpleLayout } from "@/components/SimpleLayout";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

// Simple button component to replace the shadcn button
const Button = ({ children, size, className, variant, ...props }: any) => (
  <button
    className={`px-4 py-2 rounded-md ${variant === 'outline' ? 'border border-gray-300 bg-white' : variant === 'secondary' ? 'bg-green-100 text-green-700' : 'bg-blue-500 text-white'} ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for occasional use and testing",
      features: [
        "5 image enhancements per month",
        "Up to 2x upscaling",
        "Basic enhancement features",
        "Standard processing speed",
        "Community support",
        "Watermarked outputs"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
      link: "/signup"
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "per month",
      description: "For professionals who need more power",
      features: [
        "100 image enhancements per month",
        "Up to 4x upscaling",
        "Advanced enhancement features",
        "Priority processing",
        "Email support",
        "Batch processing (up to 10 images)",
        "No watermarks",
        "Client presentation mode"
      ],
      buttonText: "Subscribe Now",
      buttonVariant: "default" as const,
      popular: true,
      link: "/signup?plan=pro"
    },
    {
      name: "Business",
      price: "$49.99",
      period: "per month",
      description: "For agencies and businesses with high volume",
      features: [
        "Unlimited image enhancements",
        "Up to 16x upscaling",
        "All enhancement features + exclusive filters",
        "Ultra-fast processing speed",
        "Dedicated account manager",
        "API access with white-label options",
        "Team collaboration (up to 5 users)",
        "Client portal for direct delivery",
        "Commercial usage rights",
        "Bulk processing (up to 100 images)"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary" as const,
      popular: false,
      link: "/contact"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited everything",
        "Custom AI model training",
        "On-premise deployment options",
        "Custom integration support",
        "SLA guarantees",
        "Unlimited team members",
        "Full white-label solution",
        "24/7 priority support",
        "Custom feature development"
      ],
      buttonText: "Contact Enterprise Sales",
      buttonVariant: "secondary" as const,
      popular: false,
      link: "/enterprise"
    }
  ];

  return (
    <SimpleLayout>
      {/* Pricing Header */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">
              Choose the plan that's right for you and start enhancing your images today.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                  plan.popular ? "ring-2 ring-blue-500 transform md:-translate-y-4" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="ml-1 text-xl text-gray-500">/{plan.period}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{plan.description}</p>

                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link to={plan.link}>
                      <Button
                        variant={plan.buttonVariant}
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            : ""
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
              {
                question: "How many images can I enhance?",
                answer:
                  "The number of images you can enhance depends on your plan. Free users get 10 images per month, Pro users get 100 images per month, and Enterprise users get unlimited enhancements."
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and for Enterprise customers, we also offer invoicing options."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer:
                  "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of the current billing period."
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a refund within 7 days of your purchase."
              },
              {
                question: "What happens if I exceed my monthly limit?",
                answer:
                  "If you exceed your monthly limit, you can purchase additional credits or upgrade to a higher plan to continue enhancing images."
              }
            ].map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are charging premium rates for images enhanced with Chromavue.AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/app">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SimpleLayout>
  );
};

export default Pricing;
