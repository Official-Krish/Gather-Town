import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

const VirtualOfficeSection = () => {
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

  const benefits = [
    "Seamless spatial audio for natural conversations",
    "Customizable office layouts and meeting spaces",
    "Personalized avatars for team members",
    "One-click joining for scheduled meetings",
    "Screen sharing and collaborative whiteboards",
    "Secure, encrypted communications"
  ];

  return (
    <section id="virtual-office" ref={sectionRef} className="relative py-20 bg-metaverse-dark-blue overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-gradient opacity-50"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Virtual Office Visualization */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-[-20px]'}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-metaverse-purple/30 to-metaverse-blue/30 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative glass-card rounded-2xl p-6 overflow-hidden">
                {/* Office Grid Layout */}
                <div className="relative aspect-square bg-metaverse-midnight/60 rounded-xl p-4">
                  {/* Office Grid */}
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0.5 p-4">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-metaverse-accent/5"></div>
                    ))}
                  </div>
                  
                  {/* Office Areas */}
                  <div className="absolute inset-4 grid grid-cols-6 grid-rows-6 gap-2">
                    {/* Lobby Area */}
                    <div className="col-span-2 row-span-1 bg-blue-500/10 border border-blue-500/20 rounded-md flex items-center justify-center">
                      <span className="text-xs text-blue-300">Lobby</span>
                    </div>
                    
                    {/* Meeting Rooms */}
                    <div className="col-span-3 row-span-2 col-start-3 row-start-1 bg-purple-500/10 border border-purple-500/20 rounded-md flex flex-col items-center justify-center p-1">
                      <span className="text-xs text-purple-300">Conference Room</span>
                      <div className="mt-1 flex space-x-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-purple-400/40"></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Lounge Area */}
                    <div className="col-span-2 row-span-2 col-start-1 row-start-2 bg-teal-500/10 border border-teal-500/20 rounded-md flex items-center justify-center">
                      <span className="text-xs text-teal-300">Lounge</span>
                    </div>
                    
                    {/* Work Pods */}
                    <div className="col-span-4 row-span-2 col-start-3 row-start-3 bg-cyan-500/10 border border-cyan-500/20 rounded-md grid grid-cols-2 grid-rows-2 gap-1 p-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-cyan-400/10 rounded flex items-center justify-center">
                          <span className="text-[8px] text-cyan-300">Pod {i}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Breakout Room */}
                    <div className="col-span-2 row-span-2 col-start-1 row-start-4 bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-center justify-center">
                      <span className="text-xs text-emerald-300">Breakout</span>
                    </div>
                    
                    {/* Social Space */}
                    <div className="col-span-3 row-span-1 col-start-3 row-start-5 bg-amber-500/10 border border-amber-500/20 rounded-md flex items-center justify-center">
                      <span className="text-xs text-amber-300">Social Space</span>
                    </div>
                  </div>
                  
                  {/* Avatars */}
                  <div className="absolute w-3 h-3 top-[20%] left-[15%] rounded-full bg-blue-400 animate-pulse-soft"></div>
                  <div className="absolute w-3 h-3 top-[30%] right-[40%] rounded-full bg-purple-400 animate-pulse-soft"></div>
                  <div className="absolute w-3 h-3 bottom-[35%] left-[40%] rounded-full bg-green-400 animate-pulse-soft"></div>
                  <div className="absolute w-3 h-3 bottom-[25%] right-[25%] rounded-full bg-amber-400 animate-pulse-soft"></div>
                  
                  {/* Movement Path */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M20,20 C30,15 40,40 50,45 C60,50 70,25 80,30" 
                      stroke="url(#gradient)" 
                      strokeWidth="0.5" 
                      strokeDasharray="2 2" 
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Controls Mockup */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-metaverse-purple/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-metaverse-purple"></div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-metaverse-blue/20 flex items-center justify-center">
                      <div className="w-3 h-3 bg-metaverse-blue"></div>
                    </div>
                  </div>
                  <div className="text-xs text-metaverse-text/60">MetaverseConvene Office</div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-metaverse-accent/10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-metaverse-accent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-[20px]'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience the <span className="text-gradient">Future of Work</span>
            </h2>
            <p className="text-lg text-metaverse-text/70 mb-8">
              Our virtual office creates a sense of presence and spontaneity that traditional video calls lack. Move around the space, collaborate in real-time, and connect with teammates effortlessly.
            </p>
            
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100 + 300}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-metaverse-purple to-metaverse-blue flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <Button className="bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white hover:shadow-lg hover:shadow-metaverse-purple/20 transition-all px-8 py-6">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualOfficeSection;
