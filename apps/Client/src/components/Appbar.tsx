import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Appbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-metaverse-midnight/80 backdrop-blur-md shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-metaverse-purple to-metaverse-accent bg-clip-text text-transparent">
            MetaverseConvene
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-metaverse-text/80 hover:text-metaverse-accent transition-colors">
            Features
          </a>
          <a href="#virtual-office" className="text-metaverse-text/80 hover:text-metaverse-accent transition-colors">
            Virtual Office
          </a>
          <a href="#pricing" className="text-metaverse-text/80 hover:text-metaverse-accent transition-colors">
            Pricing
          </a>
          <Link to="/signup">
              <Button className="bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white hover:shadow-lg hover:shadow-metaverse-purple/20 transition-all">
                Get Started
              </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-metaverse-text"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-metaverse-midnight/95 backdrop-blur-lg py-4 shadow-lg animate-slide-up">
          <div className="container px-4 mx-auto space-y-4 flex flex-col">
            <a 
              href="#features" 
              className="text-metaverse-text/80 hover:text-metaverse-accent transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#virtual-office" 
              className="text-metaverse-text/80 hover:text-metaverse-accent transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Virtual Office
            </a>
            <a 
              href="#pricing" 
              className="text-metaverse-text/80 hover:text-metaverse-accent transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white hover:shadow-lg hover:shadow-metaverse-purple/20 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Appbar;