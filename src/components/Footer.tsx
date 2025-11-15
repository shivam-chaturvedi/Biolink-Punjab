import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Biolink Punjab</h3>
                <p className="text-xs opacity-80">By Samaira Sapra</p>
              </div>
            </div>
            <p className="text-sm opacity-90">
              North India's First Stubble Trading Platform - Where Farmers Meet Buyers for a Cleaner Tomorrow
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="opacity-90 hover:opacity-100 transition-smooth">Home</Link></li>
              <li><Link to="/research" className="opacity-90 hover:opacity-100 transition-smooth">Research</Link></li>
              <li><Link to="/trading" className="opacity-90 hover:opacity-100 transition-smooth">Trading Platform</Link></li>
              <li><Link to="/about" className="opacity-90 hover:opacity-100 transition-smooth">About Us</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/farmer-login" className="opacity-90 hover:opacity-100 transition-smooth">Farmer Login</Link></li>
              <li><Link to="/buyer-login" className="opacity-90 hover:opacity-100 transition-smooth">Buyer Login</Link></li>
              <li><Link to="/services" className="opacity-90 hover:opacity-100 transition-smooth">Services</Link></li>
              <li><Link to="/contact" className="opacity-90 hover:opacity-100 transition-smooth">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">samairasapra02@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Helpline Available</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Punjab, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 Biolink Punjab. Created by Samaira Sapra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
