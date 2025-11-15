import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MapPin, Package, IndianRupee, Phone } from "lucide-react";

const BuyerDashboard = () => {
  const listings = [
    { id: 1, farmer: "Rajpal Singh", cropType: "Paddy", quantity: "50 quintals", price: "₹2,000", district: "Ludhiana" },
    { id: 2, farmer: "Gurpreet Kaur", cropType: "Wheat", quantity: "30 quintals", price: "₹1,800", district: "Amritsar" },
    { id: 3, farmer: "Balwinder Singh", cropType: "Paddy", quantity: "75 quintals", price: "₹1,900", district: "Patiala" },
  ];

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Browse verified farmer listings across Punjab</p>
        </div>

        {/* Search & Filter */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <Input placeholder="Search by crop type..." className="md:col-span-2" />
            <Input placeholder="District" />
            <Button className="gradient-warm text-secondary-foreground"><Filter className="w-4 h-4 mr-2" />Filter</Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Available Listings</p>
            <p className="text-3xl font-bold text-secondary">45</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Quantity</p>
            <p className="text-3xl font-bold text-secondary">2,500</p>
            <p className="text-xs text-muted-foreground">quintals</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Districts Covered</p>
            <p className="text-3xl font-bold text-secondary">22</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Active Farmers</p>
            <p className="text-3xl font-bold text-secondary">180</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-secondary">Available Listings</h2>
            {listings.map((listing) => (
              <Card key={listing.id} className="p-6 hover:shadow-medium transition-smooth">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-secondary">{listing.cropType} Stubble</h3>
                    <p className="text-sm text-muted-foreground">Farmer: {listing.farmer}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />{listing.district}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-secondary">{listing.price}</p>
                    <p className="text-sm text-muted-foreground">per quintal</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{listing.quantity}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">Contact</Button>
                    <Button size="sm" className="gradient-warm text-secondary-foreground">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-secondary/10">
              <Phone className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-bold mb-2">Need Assistance?</h3>
              <p className="text-sm text-muted-foreground mb-4">Our team is ready to help you find the right suppliers.</p>
              <Button className="w-full gradient-warm text-secondary-foreground">Contact Support</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
