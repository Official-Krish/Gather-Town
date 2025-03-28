import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight: boolean;
  buttonText: string;
}

const PricingSection = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$0",
      description: "For individuals and small teams getting started with virtual collaboration.",
      features: [
        "Up to 5 team members",
        "1 virtual meeting room",
        "Basic virtual office layout",
        "Video and voice chat",
        "Screen sharing",
        "Text chat"
      ],
      highlight: false,
      buttonText: "Get Started"
    },
    {
      name: "Professional",
      price: "$12",
      description: "For growing teams that need more space and enhanced features.",
      features: [
        "Up to 20 team members",
        "5 virtual meeting rooms",
        "Custom office layouts",
        "Advanced audio/video quality",
        "Screen and application sharing",
        "File sharing up to 5GB",
        "Recording capabilities",
        "Priority support"
      ],
      highlight: true,
      buttonText: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations requiring a complete virtual HQ solution.",
      features: [
        "Unlimited team members",
        "Unlimited meeting rooms",
        "Multiple office floors",
        "HD audio/video quality",
        "Advanced security features",
        "SSO integration",
        "API access",
        "24/7 dedicated support",
        "Custom branding"
      ],
      highlight: false,
      buttonText: "Contact Sales"
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="relative py-20 bg-metaverse-midnight overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient opacity-30"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Simple, <span className="text-gradient">Transparent Pricing</span>
          </h2>
          <p className={`text-lg text-metaverse-text/70 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Choose the plan that works best for your team. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200 + 500}ms` }}
            >
              {tier.highlight && (
                <div className="absolute -inset-px bg-gradient-to-r from-metaverse-purple to-metaverse-blue rounded-xl blur-sm opacity-70"></div>
              )}
              
              <div className={`relative h-full glass-card rounded-xl p-${tier.highlight ? '0.5' : '1'}`}>
                <div className={`h-full ${tier.highlight ? 'bg-metaverse-midnight/90' : 'bg-gradient-to-br from-white/5 to-transparent'} rounded-lg p-8`}>
                  {tier.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-metaverse-text/70 ml-1">/user/mo</span>}
                    </div>
                    <p className="mt-3 text-metaverse-text/70 text-sm">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check size={18} className={`min-w-[18px] mt-0.5 ${tier.highlight ? 'text-metaverse-accent' : 'text-metaverse-purple'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Button 
                      className={`w-full ${
                        tier.highlight 
                          ? 'bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white hover:shadow-lg hover:shadow-metaverse-purple/20' 
                          : 'bg-transparent border border-metaverse-text/20 hover:bg-metaverse-text/5'
                      }`}
                    >
                      {tier.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`mt-16 text-center max-w-2xl mx-auto transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-metaverse-text/70 mb-4">
            Need a custom solution for your organization?
          </p>
          <Button variant="outline" className="border-metaverse-text/20 hover:bg-metaverse-text/5">
            Contact Our Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
