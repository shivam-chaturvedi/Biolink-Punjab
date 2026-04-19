import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Leaf, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const isLoggedIn = Boolean(user);
  const userType = profile?.role;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleMobileSignOut = async () => {
    await handleSignOut();
    setIsOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/research", label: "Research" },
    { to: "/trading", label: "Trading Platform" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  const actionButtonClasses =
    "px-3 h-10 text-sm font-semibold tracking-wide whitespace-nowrap transition-smooth";

  return (
    <nav className="sticky top-0 z-50 w-full glass shadow-soft border-b border-primary/10">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6 py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex min-w-0 flex-shrink items-center gap-2 pr-3 group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full gradient-green flex items-center justify-center transition-smooth group-hover:scale-105">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-primary leading-snug truncate">
                <span className="inline-flex items-center gap-2 min-w-0">
                  <span className="truncate">Biolink भारत</span>
                  <img
                    src="/images/bharat-logo.jpg"
                    alt="Bharat logo"
                    className="w-[1.95rem] h-[1.95rem] sm:w-[2.275rem] sm:h-[2.275rem] object-contain flex-shrink-0 rounded-sm"
                    decoding="async"
                  />
                </span>
              </h1>
              <p className="hidden sm:block text-[11px] sm:text-sm text-muted-foreground">
                Stubble Trading Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary transition-smooth rounded-full hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {isLoggedIn ? (
              <>
                <Link
                  to={userType === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard"}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${actionButtonClasses} border-primary text-primary hover:bg-primary hover:text-primary-foreground`}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1.5" />
                    Dashboard
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className={`${actionButtonClasses} flex items-center justify-center`}
                    >
                      <LogOut className="w-4 h-4 mr-1.5" />
                      Sign Out
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sign out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will need to log in again to access your dashboard.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Stay Logged In</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSignOut}>Sign Out</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <>
                <Link to="/farmer-login">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${actionButtonClasses} border-primary text-primary hover:bg-primary hover:text-primary-foreground`}
                  >
                    Farmer
                  </Button>
                </Link>
                <Link to="/buyer-login">
                  <Button
                    size="sm"
                    className={`${actionButtonClasses} gradient-green text-primary-foreground hover:opacity-90`}
                  >
                    Buyer
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden ml-auto rounded-lg p-2 hover:bg-muted transition-smooth"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-screen pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-2 pt-4 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-base font-semibold text-muted-foreground hover:text-primary transition-smooth rounded-lg hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {isLoggedIn ? (
                <>
                  <Link
                    to={userType === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard"}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary text-sm"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full text-sm">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Ready to sign out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Confirm to end your session and return to the homepage.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Maybe Later</AlertDialogCancel>
                        <AlertDialogAction onClick={handleMobileSignOut}>Sign Out</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <>
                  <Link to="/farmer-login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-primary text-primary text-sm">
                      Farmer Login
                    </Button>
                  </Link>
                  <Link to="/buyer-login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gradient-green text-primary-foreground text-sm">
                      Buyer Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
