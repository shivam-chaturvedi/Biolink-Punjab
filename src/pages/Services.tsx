import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  TrendingUp, 
  Truck, 
  Bell, 
  CreditCard,
  Search,
  Shield,
  Filter,
  Phone,
  FileText,
  Info
} from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-primary">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions for farmers and buyers to trade stubble efficiently and sustainably
          </p>
        </div>

        {/* Farmer Services */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-primary mb-4">Farmer Services</h2>
            <p className="text-lg text-muted-foreground">
              Empowering farmers to turn agricultural waste into income
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-large transition-smooth">
              <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Stubble Listing</h3>
              <p className="text-muted-foreground mb-4">
                Easily register and list your stubble quantity with detailed information about quality, location, and availability.
              </p>
              <Link to="/farmer-login">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Start Listing
                </Button>
              </Link>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth">
              <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Price Suggestions</h3>
              <p className="text-muted-foreground mb-4">
                Get real-time market prices and suggestions based on current demand, helping you set competitive rates.
              </p>
              <div className="text-primary font-semibold">₹1,500 - ₹2,000 per quintal</div>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth">
              <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transportation Support</h3>
              <p className="text-muted-foreground mb-4">
                Request logistics assistance for pickup and delivery. We connect you with reliable transport services.
              </p>
              <div className="text-primary font-semibold">Full logistics support</div>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth">
              <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Price Updates</h3>
              <p className="text-muted-foreground mb-4">
                Stay informed with instant notifications about market trends, new buyers, and price changes.
              </p>
              <div className="text-primary font-semibold">SMS & App notifications</div>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth">
              <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Payments</h3>
              <p className="text-muted-foreground mb-4">
                Receive payments immediately after transaction completion through secure digital payment methods.
              </p>
              <div className="text-primary font-semibold">100% secure & instant</div>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth">
              <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Helpline</h3>
              <p className="text-muted-foreground mb-4">
                Access round-the-clock support in Punjabi and Hindi for any questions or technical assistance.
              </p>
              <div className="text-primary font-semibold">Always available</div>
            </Card>
          </div>
        </section>

        {/* Buyer Services */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-secondary mb-4">Buyer Services</h2>
            <p className="text-lg text-muted-foreground">
              Streamlined solutions for industries seeking quality biomass resources
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-large transition-smooth border-secondary/30">
              <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Farmer Listings</h3>
              <p className="text-muted-foreground mb-4">
                Browse through authenticated farmer profiles with detailed stubble information and quality ratings.
              </p>
              <Link to="/buyer-login">
                <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  Browse Listings
                </Button>
              </Link>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth border-secondary/30">
              <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-muted-foreground mb-4">
                Multiple payment options including bank transfer, UPI, and digital wallets with transaction protection.
              </p>
              <div className="text-secondary font-semibold">Bank-grade security</div>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth border-secondary/30">
              <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Logistics Matchmaking</h3>
              <p className="text-muted-foreground mb-4">
                Connect with transport partners or arrange your own pickup. We facilitate smooth delivery coordination.
              </p>
              <div className="text-secondary font-semibold">Flexible arrangements</div>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth border-secondary/30">
              <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4">
                <Filter className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Crop Selection Filters</h3>
              <p className="text-muted-foreground mb-4">
                Filter listings by crop type (paddy, wheat, mustard), quality grade, district, and quantity available.
              </p>
              <div className="text-secondary font-semibold">Advanced search</div>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth border-secondary/30">
              <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
              <p className="text-muted-foreground mb-4">
                All farmers are verified, and stubble quality is documented to ensure you get exactly what you ordered.
              </p>
              <div className="text-secondary font-semibold">Verified quality</div>
            </Card>

            <Card className="p-6 hover:shadow-large transition-smooth border-secondary/30">
              <div className="w-12 h-12 rounded-full gradient-warm flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">New Listing Alerts</h3>
              <p className="text-muted-foreground mb-4">
                Get notified instantly when new stubble matching your criteria becomes available in your preferred areas.
              </p>
              <div className="text-secondary font-semibold">Real-time alerts</div>
            </Card>
          </div>
        </section>

        {/* Additional Services */}
        <section className="bg-muted rounded-2xl p-8 md:p-12">
          <h2 className="text-center mb-12 text-primary">Additional Services</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Helpline Support</h3>
              <p className="text-muted-foreground">
                Dedicated phone support in local languages for both farmers and buyers. Technical assistance available 24/7.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Awareness Resources</h3>
              <p className="text-muted-foreground">
                Educational materials on sustainable stubble management, composting techniques, and environmental benefits.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Government Scheme Info</h3>
              <p className="text-muted-foreground">
                Up-to-date information about subsidies, incentives, and government programs related to stubble management.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="mb-6 text-primary">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of farmers and buyers creating a sustainable future for Punjab
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/farmer-login">
                <Button size="lg" className="gradient-green text-primary-foreground hover:opacity-90 w-full sm:w-auto">
                  Register as Farmer
                </Button>
              </Link>
              <Link to="/buyer-login">
                <Button size="lg" className="gradient-warm text-secondary-foreground hover:opacity-90 w-full sm:w-auto">
                  Register as Buyer
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
