import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-32 -right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-foreground/30 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Leaf className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold inline-flex items-center gap-2">
                  <span>Biolink भारत</span>
                  <img
                    src="/images/bharat-logo.jpg"
                    alt="Bharat logo"
                    className="w-[2.6rem] h-[2.6rem] object-contain flex-shrink-0 rounded-sm"
                    decoding="async"
                    loading="lazy"
                  />
                </h3>
                <p className="text-sm opacity-80">By Samaira Sapra</p>
              </div>
            </div>
            <p className="text-base opacity-90 leading-relaxed">
              North India's first stubble marketplace powering clean air, higher farmer income, and circular economy innovation.
            </p>
            <div className="flex gap-3">
              <Link to="/farmer-login">
                <Button variant="secondary" size="sm" className="text-primary">
                  Farmers
                </Button>
              </Link>
              <Link to="/buyer-login">
                <Button size="sm" className="bg-orange-600 border-primary-foreground text-primary-foreground">
                  Buyers
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Explore</h4>
            <ul className="space-y-3 text-base">
              <li><Link to="/" className="group flex items-center gap-2 opacity-85 hover:opacity-100 transition-smooth">Home <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-smooth" /></Link></li>
              <li><Link to="/research" className="group flex items-center gap-2 opacity-85 hover:opacity-100 transition-smooth">Research <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-smooth" /></Link></li>
              <li><Link to="/trading" className="group flex items-center gap-2 opacity-85 hover:opacity-100 transition-smooth">Trading Platform <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-smooth" /></Link></li>
              <li><Link to="/about" className="group flex items-center gap-2 opacity-85 hover:opacity-100 transition-smooth">About Us <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-smooth" /></Link></li>
            </ul>
          </div>

  {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-5">Resources</h4>
            <ul className="space-y-3 text-base">
              <li><Link to="/services" className="opacity-85 hover:opacity-100 transition-smooth">Services</Link></li>
              <li><Link to="/gallery" className="opacity-85 hover:opacity-100 transition-smooth">Gallery</Link></li>
              <li><Link to="/contact" className="opacity-85 hover:opacity-100 transition-smooth">Contact</Link></li>
              <li className="opacity-60 text-sm">Blog (coming soon)</li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-5">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-sm opacity-90">Get market updates, policy news, and platform announcements in your inbox.</p>
            <div className="flex gap-2">
              <Input placeholder="Email address" className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/70 border-none" />
              <Button variant="secondary">Join</Button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1" />
                <span>samairasapra02@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1" />
                <span>24/7 Helpline Available</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Punjab, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm opacity-80 gap-4">
          <p>&copy; {new Date().getFullYear()} Biolink भारत. Created by Samaira Sapra.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:opacity-100 opacity-80">Support</Link>
            <span className="opacity-50">•</span>
            <Link to="/services" className="hover:opacity-100 opacity-80">Partnerships</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
