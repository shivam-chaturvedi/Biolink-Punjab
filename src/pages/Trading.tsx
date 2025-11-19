import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Database,
  Phone,
  Bell,
  Shield,
  Leaf,
  Smartphone,
} from "lucide-react";

const marketplaceVisual =
  "/images/Trading%20Platform/the%20marketplace.png";
const approachVisual = "/images/Trading%20Platform/approach.png";

const farmerSteps = [
  "Register to list the amount of residue you wish to sell.",
  "Set your preferred price and indicate transport needs.",
  "Receive instant notifications when a buyer is interested.",
];

const buyerSteps = [
  "Browse available listings by district, price, and volume.",
  "Connect directly with verified farmers.",
  "Arrange transportation and make payments securely.",
];

const supportHighlights = [
  {
    icon: Phone,
    title: "Helpline Access",
    description:
      "Dedicated support for technical assistance, onboarding, and dispute resolution.",
  },
  {
    icon: Bell,
    title: "Real-Time Prices",
    description:
      "Live updates on district-level pricing trends so negotiations stay transparent.",
  },
  {
    icon: Leaf,
    title: "Awareness Resources",
    description:
      "Guides on safe stubble management and current government incentive schemes.",
  },
];

const approachPillars = [
  {
    icon: Smartphone,
    title: "Accessibility",
    description:
      "Optimized for basic phone users through helplines and SMS, while offering a modern web app for smartphones.",
  },
  {
    icon: Shield,
    title: "Trust",
    description:
      "All participants are verified. Escrow-like payment flows ensure funds are released instantly and securely.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Encourages reuse, recycling, and renewable applications for every bale traded on the platform.",
  },
];

const Trading = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 space-y-16">
        {/* Hero */}
        <section className="grid lg:grid-cols-[3fr_2fr] gap-10 items-center">
          <div className="space-y-6">
            <p className="text-sm tracking-[0.4em] uppercase text-secondary">
              Trading Platform
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              The Marketplace Where Stubble Finds Real Value
            </h1>
            <p className="text-lg text-muted-foreground">
              Our digital platform bridges the gap between farmers with surplus
              residue and industries seeking biomass resources. It is a
              transparent, user-friendly hub where both sides can connect,
              negotiate, and transact securely.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/farmer-login">
                <Button className="gradient-green text-primary-foreground">
                  Join as Farmer
                </Button>
              </Link>
              <Link to="/buyer-login">
                <Button variant="outline" className="border-primary text-primary">
                  Join as Buyer
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-large">
            <img
              src={marketplaceVisual}
              alt="Trading marketplace overview"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* For Farmers & Buyers */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 border-primary/20">
            <h2 className="text-2xl font-bold text-primary mb-4">
              For Farmers
            </h2>
            <p className="text-muted-foreground mb-6">
              List your residue in minutes, stay in control of price, and get
              transport support when needed.
            </p>
            <ul className="space-y-3 text-lg">
              {farmerSteps.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <Link to="/farmer-login" className="block mt-8">
              <Button className="w-full gradient-green text-primary-foreground">
                Start Selling
              </Button>
            </Link>
          </Card>

          <Card className="p-8 border-secondary/20">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              For Buyers
            </h2>
            <p className="text-muted-foreground mb-6">
              Procure reliable biomass supply with full visibility into volumes,
              locations, and pricing.
            </p>
            <ul className="space-y-3 text-lg">
              {buyerSteps.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-1" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <Link to="/buyer-login" className="block mt-8">
              <Button className="w-full gradient-warm text-secondary-foreground">
                Start Buying
              </Button>
            </Link>
          </Card>
        </section>

        {/* Database & Connectivity */}
        <section className="bg-muted rounded-3xl p-8 md:p-12 grid md:grid-cols-[3fr_2fr] gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">
              Database and Connectivity
            </h2>
            <p className="text-lg text-muted-foreground">
              The platform is powered by a verified database of farmers and
              buyers, complete with contact information, preferred crops, and
              districts. It ensures that every match is relevant and
              trustworthy.
            </p>
            <div className="space-y-4">
              <p className="font-semibold text-foreground">
                Farmers also gain direct access to:
              </p>
              <ul className="space-y-3">
                {supportHighlights.map((highlight) => (
                  <li key={highlight.title} className="flex items-start gap-3">
                    <highlight.icon className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {highlight.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Card className="p-8 text-center border-secondary/40">
            <Database className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-secondary">
              Verified Profiles
            </h3>
            <p className="text-muted-foreground">
              Every listing shows phone, district, crop type, quantity, and
              logistics preferences so you can make informed decisions instantly.
            </p>
          </Card>
        </section>

        {/* Our Approach */}
        <section className="grid lg:grid-cols-[2fr_3fr] gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-large order-2 lg:order-1">
            <img
              src={approachVisual}
              alt="Platform approach"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-primary">Our Approach</h2>
            <p className="text-lg text-muted-foreground">
              The platform operates on three guiding principles that make stubble
              trading practical for every farmer and reliable for every buyer.
            </p>
            <div className="space-y-5">
              {approachPillars.map((pillar) => (
                <Card
                  key={pillar.title}
                  className="p-5 flex items-start gap-4 border-primary/20"
                >
                  <pillar.icon className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground">{pillar.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Trading;
