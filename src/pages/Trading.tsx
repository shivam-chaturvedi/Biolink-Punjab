import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  CheckCircle, 
  Bell, 
  Phone, 
  CreditCard, 
  Filter,
  Truck,
  Shield,
  Users,
  Leaf
} from "lucide-react";
import marketplace1 from "@/assets/marketplace-icon1.png";
import marketplace2 from "@/assets/marketplace-icon2.png";
import approachImage from "@/assets/approach-image.png";
import mustardField from "@/assets/mustard-field.jpg";

const Trading = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-primary">Trading Platform</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A transparent and user-friendly hub where farmers and buyers connect, negotiate, and transact securely
          </p>
        </div>

        {/* The Marketplace */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-primary">The Marketplace</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our digital platform bridges the gap between farmers with surplus residue and industries seeking biomass resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* For Farmers */}
            <Card className="p-8 border-primary/20 hover:shadow-large transition-smooth">
              <div className="mb-6">
                <img src={marketplace1} alt="Farmers" className="w-full h-48 object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">For Farmers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>Register to list the amount of residue you wish to sell</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>Set your preferred price and indicate transport needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span>Receive instant notifications when a buyer is interested</span>
                </li>
              </ul>
              <Link to="/farmer-login" className="block mt-6">
                <Button className="w-full gradient-green text-primary-foreground">
                  Start Selling
                </Button>
              </Link>
            </Card>

            {/* For Buyers */}
            <Card className="p-8 border-secondary/20 hover:shadow-large transition-smooth">
              <div className="mb-6">
                <img src={marketplace2} alt="Buyers" className="w-full h-48 object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-secondary">For Buyers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <span>Browse available listings by district, price, and volume</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <span>Connect directly with verified farmers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <span>Arrange transportation and make payments securely</span>
                </li>
              </ul>
              <Link to="/buyer-login" className="block mt-6">
                <Button className="w-full gradient-warm text-secondary-foreground">
                  Start Buying
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* Platform Features */}
        <section className="mb-16 bg-muted rounded-2xl p-8 md:p-12">
          <h2 className="text-center mb-12 text-primary">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold mb-2">Easy Listing</h3>
              <p className="text-sm text-muted-foreground">Post your stubble quantity in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold mb-2">Smart Filters</h3>
              <p className="text-sm text-muted-foreground">Find exactly what you need</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold mb-2">Notifications</h3>
              <p className="text-sm text-muted-foreground">Real-time updates on all activity</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Safe and instant transactions</p>
            </div>
          </div>
        </section>

        {/* Farmer Dashboard Features */}
        <section className="mb-16">
          <h2 className="text-center mb-8 text-primary">Farmer Dashboard</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <ShoppingCart className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Register Quantity</h3>
              <p className="text-muted-foreground">List your stubble with quantity and quality details</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <CreditCard className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Select Price</h3>
              <p className="text-muted-foreground">Set competitive prices based on market rates</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <Truck className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Transport Needs</h3>
              <p className="text-muted-foreground">Indicate if you need logistics support</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <Bell className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Notification System</h3>
              <p className="text-muted-foreground">Get alerts when buyers show interest</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <Phone className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Helpline Number</h3>
              <p className="text-muted-foreground">24/7 support for any assistance</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <CheckCircle className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Payment Verification</h3>
              <p className="text-muted-foreground">Track and verify all transactions</p>
            </Card>
          </div>
        </section>

        {/* Buyer Dashboard Features */}
        <section className="mb-16">
          <h2 className="text-center mb-8 text-secondary">Buyer Dashboard</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-medium transition-smooth border-secondary/30">
              <Filter className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Browse Listings</h3>
              <p className="text-muted-foreground">Filter by district, price, and volume</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth border-secondary/30">
              <Users className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Filter Crops</h3>
              <p className="text-muted-foreground">Select specific crop residue types</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth border-secondary/30">
              <Truck className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Book Transportation</h3>
              <p className="text-muted-foreground">Arrange pickup and delivery</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth border-secondary/30">
              <CreditCard className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Multiple payment options available</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth border-secondary/30">
              <Shield className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Verified Sellers</h3>
              <p className="text-muted-foreground">All farmers are verified for authenticity</p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth border-secondary/30">
              <Bell className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">Stay informed on new listings</p>
            </Card>
          </div>
        </section>

        {/* Database and Connectivity */}
        <section className="mb-16 bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-8">Database and Connectivity</h2>
            <p className="text-lg text-center mb-8 opacity-90">
              The platform includes a verified database of farmers and buyers with their contact information (phone, district, preferred crop residue).
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-bold mb-2">Helpline Services</h3>
                <p className="text-sm opacity-90">Technical assistance available</p>
              </div>
              <div className="text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-bold mb-2">Real-time Updates</h3>
                <p className="text-sm opacity-90">Market prices and notifications</p>
              </div>
              <div className="text-center">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-bold mb-2">Awareness Materials</h3>
                <p className="text-sm opacity-90">Safe stubble management tips</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section 
          className="rounded-2xl overflow-hidden shadow-large"
          style={{
            backgroundImage: `url(${mustardField})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="gradient-hero p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-primary-foreground">
              <h2 className="text-center mb-8">Our Approach</h2>
              <p className="text-lg text-center mb-8 opacity-95">
                The platform operates on three guiding principles:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-primary-foreground/10 border-primary-foreground/20 text-center backdrop-blur-sm">
                  <div className="text-4xl font-bold text-secondary mb-4">1</div>
                  <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                  <p className="opacity-90">Designed for farmers with basic phones as well as smartphone users</p>
                </Card>
                <Card className="p-6 bg-primary-foreground/10 border-primary-foreground/20 text-center backdrop-blur-sm">
                  <div className="text-4xl font-bold text-secondary mb-4">2</div>
                  <h3 className="text-xl font-bold mb-2">Trust</h3>
                  <p className="opacity-90">Ensures secure transactions and verified users</p>
                </Card>
                <Card className="p-6 bg-primary-foreground/10 border-primary-foreground/20 text-center backdrop-blur-sm">
                  <div className="text-4xl font-bold text-secondary mb-4">3</div>
                  <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                  <p className="opacity-90">Encourages reuse, recycling, and renewable applications</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Trading;
