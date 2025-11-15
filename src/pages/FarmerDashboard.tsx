import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ShoppingBag, 
  TrendingUp, 
  Bell, 
  Phone, 
  Plus,
  Package,
  IndianRupee,
  MapPin
} from "lucide-react";
import { toast } from "sonner";

const FarmerDashboard = () => {
  const [showAddListing, setShowAddListing] = useState(false);
  const [newListing, setNewListing] = useState({
    cropType: "",
    quantity: "",
    price: "",
    district: "",
    needsTransport: false
  });

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Listing added successfully!");
    setShowAddListing(false);
    setNewListing({
      cropType: "",
      quantity: "",
      price: "",
      district: "",
      needsTransport: false
    });
  };

  const myListings = [
    {
      id: 1,
      cropType: "Paddy",
      quantity: "50 quintals",
      price: "₹2,000/quintal",
      status: "Active",
      district: "Ludhiana",
      interestedBuyers: 3
    },
    {
      id: 2,
      cropType: "Wheat",
      quantity: "30 quintals",
      price: "₹1,800/quintal",
      status: "Under Negotiation",
      district: "Amritsar",
      interestedBuyers: 1
    },
  ];

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your stubble listings and track earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Listings</p>
                <p className="text-3xl font-bold text-primary">2</p>
              </div>
              <ShoppingBag className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Quantity</p>
                <p className="text-3xl font-bold text-primary">80</p>
                <p className="text-xs text-muted-foreground">quintals</p>
              </div>
              <Package className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Interested Buyers</p>
                <p className="text-3xl font-bold text-secondary">4</p>
              </div>
              <Bell className="w-10 h-10 text-secondary opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expected Earnings</p>
                <p className="text-3xl font-bold text-primary">₹1.5L</p>
              </div>
              <IndianRupee className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        {/* Current Market Price */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">Current Market Price</h3>
              <p className="text-3xl font-bold text-secondary">₹1,800 - ₹2,000</p>
              <p className="text-sm opacity-90 mt-1">per quintal (Paddy stubble)</p>
            </div>
            <TrendingUp className="w-16 h-16 opacity-30" />
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Listings */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">My Listings</h2>
              <Button 
                onClick={() => setShowAddListing(!showAddListing)}
                className="gradient-green text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Listing
              </Button>
            </div>

            {showAddListing && (
              <Card className="p-6 mb-6 border-primary/30">
                <h3 className="text-lg font-bold mb-4 text-primary">Add New Listing</h3>
                <form onSubmit={handleAddListing} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Crop Type</Label>
                      <Input
                        value={newListing.cropType}
                        onChange={(e) => setNewListing({ ...newListing, cropType: e.target.value })}
                        placeholder="e.g., Paddy, Wheat"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Quantity (quintals)</Label>
                      <Input
                        type="number"
                        value={newListing.quantity}
                        onChange={(e) => setNewListing({ ...newListing, quantity: e.target.value })}
                        placeholder="Enter quantity"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Price per Quintal (₹)</Label>
                      <Input
                        type="number"
                        value={newListing.price}
                        onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                        placeholder="e.g., 2000"
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>District</Label>
                      <Input
                        value={newListing.district}
                        onChange={(e) => setNewListing({ ...newListing, district: e.target.value })}
                        placeholder="Your district"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="transport"
                      checked={newListing.needsTransport}
                      onChange={(e) => setNewListing({ ...newListing, needsTransport: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="transport" className="font-normal cursor-pointer">
                      I need transportation support
                    </Label>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="gradient-green text-primary-foreground">
                      Add Listing
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddListing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="space-y-4">
              {myListings.map((listing) => (
                <Card key={listing.id} className="p-6 hover:shadow-medium transition-smooth">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary">{listing.cropType} Stubble</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        {listing.district}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      listing.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                    }`}>
                      {listing.status}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="font-semibold">{listing.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-semibold text-primary">{listing.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interested</p>
                      <p className="font-semibold text-secondary">{listing.interestedBuyers} buyers</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="border-destructive text-destructive">Remove</Button>
                    <Button size="sm" className="gradient-green text-primary-foreground ml-auto">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-secondary/10 border-secondary/30">
              <Phone className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Call our 24/7 helpline for assistance in Punjabi, Hindi, or English.
              </p>
              <Button className="w-full gradient-warm text-secondary-foreground">
                Call Helpline
              </Button>
            </Card>

            <Card className="p-6">
              <Bell className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-bold mb-2">Recent Notifications</h3>
              <div className="space-y-3 text-sm">
                <div className="pb-3 border-b">
                  <p className="font-semibold">New buyer interest</p>
                  <p className="text-muted-foreground">A buyer from Ludhiana is interested in your Paddy listing</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
                <div className="pb-3 border-b">
                  <p className="font-semibold">Price update</p>
                  <p className="text-muted-foreground">Market price for Wheat stubble increased to ₹1,900</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-bold mb-2">Quick Tips</h3>
              <ul className="text-sm space-y-2 opacity-90">
                <li>• Set competitive prices based on market rates</li>
                <li>• Respond quickly to buyer inquiries</li>
                <li>• Keep quality information accurate</li>
                <li>• Use transport support if needed</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
