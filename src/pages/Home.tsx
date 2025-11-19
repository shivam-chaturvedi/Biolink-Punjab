import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Users, TrendingUp, Leaf, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const heroBackground = "/images/home/hero section.png";
const introductionImage = "/images/home/pollution.png";
const problemImage = "/images/home/the problem.png";
const visionImage = "/images/home/our-vision.png";

const Home = () => {
  const { user, profile } = useAuth();
  const userRole = profile?.role;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="mb-6 animate-fade-in text-4xl md:text-5xl font-bold">
            Welcome to North India’s First Stubble Trading Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95 animate-slide-up font-medium">
            Where Farmers Meet Buyers for a Cleaner Tomorrow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            {!user && (
              <>
                <Link to="/farmer-login">
                  <Button 
                    size="lg" 
                    className="gradient-green text-primary-foreground hover:opacity-90 text-lg px-8 shadow-large hover:shadow-xl transition-smooth"
                  >
                    Become a Seller (Farmers)
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/buyer-login">
                  <Button 
                    size="lg" 
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-2 border-primary-foreground text-lg px-8 shadow-large hover:shadow-xl transition-smooth font-bold"
                  >
                    Become a Buyer (Industries)
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </>
            )}
            {user && userRole === "farmer" && (
              <Link to="/farmer-dashboard">
                <Button 
                  size="lg" 
                  className="gradient-green text-primary-foreground hover:opacity-90 text-lg px-8 shadow-large hover:shadow-xl transition-smooth"
                >
                  Go to Farmer Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            {user && userRole === "buyer" && (
              <Link to="/buyer-dashboard">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-2 border-primary-foreground text-lg px-8 shadow-large hover:shadow-xl transition-smooth font-bold"
                >
                  Browse Listings
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Introduction</h2>
              <div className="space-y-4 text-lg leading-relaxed text-foreground">
                <p>
                  North India is facing a serious air pollution crisis every winter, and stubble burning in Punjab is one of the leading contributors to it. Millions of tonnes of paddy residue are burned every year, and this contributes to almost <strong className="text-primary">40–60 percent of PM</strong> in winter that results in smog that is dense and covers millions of people in the region.
                </p>
                <p>
                  The health costs are terrifying — some research estimates that <strong className="text-destructive">44,000–98,000 premature deaths</strong> per year happen as a result of the pollution of residue burning.
                </p>
                <p>
                  Burning is still taking place even with government intervention in the form of machinery subsidies, bio fuel programs, and fines. This is because the explanation is relatively simple and yet systemic: farmers do not have a structured, profitable and easily available market to sell their crop remnants.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-large">
              <img
                src={introductionImage}
                alt="Pollution impact"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-primary">The Problem</h2>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  In Punjab, an average of over <strong className="text-primary">7 million tonnes</strong> of paddy straw are burnt every year. Farmers have very little time between harvest and planting, they lack buyers and their logistics are expensive.
                </p>
                <p>
                  To the majority, burning is the quickest and the most cost effective solution to clear the fields; although they are ready to use sustainable practices in case of the existence of viable alternatives.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-large">
              <img src={problemImage} alt="Stubble burning problem" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* What We’re Doing Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold">What We’re Doing</h2>
            <p className="text-xl leading-relaxed mb-8">
              This platform aims at transforming that. Through linking farmers to bioenergy, paper and composting industries that can use stubble to generate energy, we will transform agricultural waste into job creation.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 bg-primary-foreground/10 border-primary-foreground/20 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">Connect</h3>
                <p className="opacity-90">Link farmers with verified buyers</p>
              </Card>
              <Card className="p-6 bg-primary-foreground/10 border-primary-foreground/20 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">Prosper</h3>
                <p className="opacity-90">Turn waste into income streams</p>
              </Card>
              <Card className="p-6 bg-primary-foreground/10 border-primary-foreground/20 text-center">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-xl font-bold mb-2">Sustain</h3>
                <p className="opacity-90">Reduce pollution & protect environment</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-large order-2 md:order-1">
              <img src={visionImage} alt="Our vision" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left order-1 md:order-2">
              <Shield className="w-16 h-16 mx-auto md:mx-0 mb-6 text-primary" />
              <h2 className="mb-6 text-primary text-3xl font-bold">Our Vision</h2>
              <p className="text-xl leading-relaxed mb-8">
                To establish a circular, transparent and sustainable ecosystem enabling farmers, minimizing pollution and green innovation throughout Punjab.
              </p>
              <Link to="/trading">
                <Button size="lg" className="gradient-green text-primary-foreground hover:opacity-90 text-lg px-8">
                  Explore Trading Platform
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
