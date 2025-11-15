import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/research", label: "Research" },
    { to: "/trading", label: "Trading Platform" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/blog", label: "Blog" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center transition-smooth group-hover:scale-110">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Biolink Punjab</h1>
              <p className="text-xs text-muted-foreground hidden md:block">By Samaira Sapra</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth rounded-lg hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/farmer-login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Farmer Login
              </Button>
            </Link>
            <Link to="/buyer-login">
              <Button className="gradient-green text-primary-foreground hover:opacity-90">
                Buyer Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-screen pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary transition-smooth rounded-lg hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link to="/farmer-login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-primary text-primary">
                  Farmer Login
                </Button>
              </Link>
              <Link to="/buyer-login" onClick={() => setIsOpen(false)}>
                <Button className="w-full gradient-green text-primary-foreground">
                  Buyer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
