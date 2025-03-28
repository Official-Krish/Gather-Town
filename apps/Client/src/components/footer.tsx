import { MessageSquare, Users, Video, Home, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-metaverse-dark-blue pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-metaverse-purple/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-metaverse-blue/5 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* CTA Section */}
      <div className="container px-4 mx-auto relative z-10 mb-16">
        <div className="glass-card rounded-xl p-0.5 overflow-hidden">
          <div className="bg-gradient-to-br from-metaverse-purple/10 to-metaverse-blue/10 rounded-lg p-10 md:p-14">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-gradient">Remote Workspace</span>?
              </h2>
              <p className="text-lg text-metaverse-text/70 mb-8">
                Join thousands of teams already working together in their virtual offices. Get started with a free trial today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-gradient-to-r from-metaverse-purple to-metaverse-blue text-white hover:shadow-lg hover:shadow-metaverse-purple/20 transition-all px-8 py-6 text-lg">
                  Start Free Trial
                </Button>
                <Button variant="outline" className="border-metaverse-text/20 hover:bg-metaverse-text/5 px-8 py-6 text-lg">
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-metaverse-purple to-metaverse-accent bg-clip-text text-transparent mb-4">
              MetaverseConvene
            </h2>
            <p className="text-metaverse-text/70 mb-6 max-w-md">
              Bringing teams together in immersive virtual workspaces. Collaborate, communicate, and connect like never before.
            </p>
            <div className="flex space-x-4">
              {[MessageSquare, Video, Users, Home].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Icon size={18} className="text-metaverse-text/70" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Virtual Office', 'Meeting Rooms', 'Security'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-metaverse-text/70 hover:text-metaverse-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-metaverse-text/70 hover:text-metaverse-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-metaverse-text/70 mb-4">
              Get the latest updates and news
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-metaverse-midnight rounded-l-md px-4 py-2 border border-white/10 focus:outline-none focus:ring-1 focus:ring-metaverse-purple flex-1"
              />
              <Button className="rounded-l-none bg-metaverse-purple text-white hover:bg-metaverse-purple/90">
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 text-sm text-metaverse-text/50 flex flex-col md:flex-row justify-between items-center">
          <div>
            © {currentYear} MetaverseConvene. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-metaverse-text/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-metaverse-text/70 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-metaverse-text/70 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
