import { useState, useEffect } from "react";
import { MessageSquare, Video } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center hero-gradient overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-metaverse-purple/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-metaverse-blue/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-metaverse-accent/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center justify-between z-10 pt-10 pb-20">
        {/* Hero Text */}
        <div className="lg:w-1/2 text-left mb-10 lg:mb-0 animate-fade-in">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Your <span className="text-gradient">Virtual Office</span> in the Metaverse
          </h1>
          <p className={`text-lg md:text-xl text-metaverse-text/80 mb-8 max-w-lg transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Connect with your team in an immersive virtual workspace. Voice, video, text chat and dedicated meeting rooms all in one platform.
          </p>
          
          <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <Button className="bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white px-8 py-6 text-lg hover:shadow-lg hover:shadow-metaverse-purple/20 transition-all">
              Get Started Free
            </Button>
            <Button variant="outline" className="border-metaverse-text/20 text-metaverse-text hover:bg-metaverse-text/5 px-8 py-6 text-lg">
              See How It Works
            </Button>
          </div>
          
          <div className={`flex items-center mt-8 text-metaverse-muted transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex -space-x-2 mr-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-metaverse-purple to-metaverse-blue p-0.5">
                  <div className="w-full h-full rounded-full bg-metaverse-dark-blue flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                </div>
              ))}
            </div>
            <p>Join 10,000+ teams already connected</p>
          </div>
        </div>
        
        {/* Hero Image/Visual */}
        <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-x-10'}`}>
          <div className="relative">
              <div className="bg-metaverse-midnight/80 rounded-lg overflow-hidden">
                <div className="aspect-video w-full h-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-metaverse-midnight to-metaverse-dark-blue rounded-lg">
                    <video src="https://cdn.vidzflow.com/v/h3yy6rTnJQ_720p_1691443174.mp4" autoPlay loop muted className=" w-full h-full object-cover"></video>
                  </div>
                </div>
            </div>
            
            {/* Floating Indicators */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-metaverse-purple to-metaverse-blue p-0.5 rounded-lg animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="bg-metaverse-dark-blue p-2 rounded-lg flex items-center gap-2">
                <Video size={16} className="text-metaverse-accent" />
                <span className="text-xs font-medium">Video Call</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-6 bg-gradient-to-r from-metaverse-blue to-metaverse-accent p-0.5 rounded-lg animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="bg-metaverse-dark-blue p-2 rounded-lg flex items-center gap-2">
                <MessageSquare size={16} className="text-metaverse-blue" />
                <span className="text-xs font-medium">Team Chat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-metaverse-text/60 text-sm mb-2">Discover More</span>
        <div className="w-6 h-10 border-2 border-metaverse-text/20 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-metaverse-accent rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;