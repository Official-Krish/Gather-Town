import { useState, useEffect, useRef } from "react";
import { Video, MessageSquare, Users, Home } from "lucide-react";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

const FeatureSection = () => {
  const features: Feature[] = [
    {
      icon: <Video className="h-8 w-8 text-purple-400" />,
      title: "HD Video Conferencing",
      description: "Crystal clear video calls with up to 50 participants. Share your screen and present with confidence.",
      color: "from-purple-500/20 to-pink-500/5"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-400" />,
      title: "Team Chat",
      description: "Stay connected with instant messaging. Share files, links, and reactions in real-time.",
      color: "from-blue-500/20 to-cyan-400/5"
    },
    {
      icon: <Users className="h-8 w-8 text-cyan-400" />,
      title: "Virtual Office Space",
      description: "Create your customized office layout. Move freely between spaces just like in a physical office.",
      color: "from-cyan-500/20 to-teal-400/5"
    },
    {
      icon: <Home className="h-8 w-8 text-teal-400" />,
      title: "Meeting Rooms",
      description: "Private spaces for focused discussions. Schedule meetings or jump in spontaneously.",
      color: "from-teal-500/20 to-emerald-400/5"
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
    <section id="features" ref={sectionRef} className="relative py-20 bg-metaverse-midnight overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-metaverse-purple/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-metaverse-blue/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <span className="text-gradient">Powerful Features</span> for Remote Collaboration
          </h2>
          <p className={`text-lg text-metaverse-text/70 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Everything you need to make remote work feel more connected and productive in one seamless virtual environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200 + 500}ms` }}
            >
              <div className={`h-full bg-gradient-to-br ${feature.color} rounded-lg p-8 border border-white/5`}>
                <div className="bg-metaverse-midnight/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-metaverse-text/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
