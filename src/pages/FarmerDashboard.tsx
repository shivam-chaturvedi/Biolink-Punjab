import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShoppingBag,
  TrendingUp,
  Bell,
  Phone,
  Plus,
  Package,
  IndianRupee,
  MapPin,
  Trash,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { PUNJAB_DISTRICTS } from "@/constants/punjabDistricts";
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

interface Interest {
  id: string;
  buyer_id: string;
  quantity: number | null;
  message: string | null;
  offered_price: number | null;
  buyer_location: string | null;
  status: string;
  created_at: string;
  buyer?: {
    id: string;
    full_name: string | null;
    phone: string | null;
    district: string | null;
  } | null;
}

interface Listing {
  id: string;
  owner_id: string;
  crop_type: string;
  quantity: number | null;
  price_per_quintal: number | null;
  district: string | null;
  needs_transport: boolean;
  status: string | null;
  created_at: string;
  interests?: Interest[];
}

const FarmerDashboard = () => {
  const { user, profile, loading } = useAuth();
  const [showAddListing, setShowAddListing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newListing, setNewListing] = useState({
    cropType: "",
    quantity: "",
    price: "",
    district: "",
    customDistrict: "",
    needsTransport: false,
  });
  const navigate = useNavigate();

  const {
    data: listings = [],
    isLoading,
    refetch,
  } = useQuery<Listing[]>({
    queryKey: ["farmerListings", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("listings")
        .select(`
          id,
          owner_id,
          crop_type,
          quantity,
          price_per_quintal,
          district,
          needs_transport,
          status,
          created_at,
          interests:listing_interests (
            id,
            buyer_id,
            quantity,
            message,
            offered_price,
            buyer_location,
            status,
            created_at,
            buyer:profiles (
              id,
              full_name,
              phone,
              district
            )
          )
        `)
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data as Listing[];
    },
    enabled: Boolean(user),
  });

  const handleAddListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);

    const finalDistrict =
      newListing.district === "Other" ? newListing.customDistrict : newListing.district;

    const { error } = await supabase.from("listings").insert({
      owner_id: user.id,
      crop_type: newListing.cropType,
      quantity: Number(newListing.quantity),
      price_per_quintal: Number(newListing.price),
      district: finalDistrict,
      needs_transport: newListing.needsTransport,
    });

    if (error) {
      toast.error(error.message);
      setIsSaving(false);
      return;
    }

    toast.success("Listing added successfully!");
    setNewListing({ cropType: "", quantity: "", price: "", district: "", customDistrict: "", needsTransport: false });
    setShowAddListing(false);
    setIsSaving(false);
    refetch();
  };

  const handleDeleteListing = async (id: string) => {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Listing removed");
    refetch();
  };

  const getInterestCount = (listing: Listing) => (listing.interests ? listing.interests.length : 0);

  const totalQuantity = listings.reduce((sum, listing) => sum + (listing.quantity || 0), 0);
  const totalInterested = listings.reduce((sum, listing) => sum + getInterestCount(listing), 0);
  const totalEarnings = listings.reduce(
    (sum, listing) => sum + (listing.quantity || 0) * (listing.price_per_quintal || 0),
    0
  );
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary">Login Required</h2>
          <p className="text-muted-foreground">Please log in as a farmer to view your dashboard.</p>
          <Button asChild className="gradient-green text-primary-foreground">
            <Link to="/farmer-login">Go to Farmer Login</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (profile?.role !== "farmer") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary">Access Restricted</h2>
          <p className="text-muted-foreground">Switch to a farmer account to view this page.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your stubble listings and track earnings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border border-primary/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Listings</p>
                <p className="text-3xl font-bold text-primary">{listings.length}</p>
              </div>
              <ShoppingBag className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-primary/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Quantity</p>
                <p className="text-3xl font-bold text-primary">{totalQuantity}</p>
                <p className="text-xs text-muted-foreground">quintals</p>
              </div>
              <Package className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-primary/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Interested Buyers</p>
                <p className="text-3xl font-bold text-secondary">{totalInterested}</p>
              </div>
              <Bell className="w-10 h-10 text-secondary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-primary/20 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expected Earnings</p>
                <p className="text-3xl font-bold text-primary">
                  ₹{totalEarnings.toLocaleString()}
                </p>
              </div>
              <IndianRupee className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-8 bg-gradient-to-r from-primary to-primary-light text-primary-foreground border border-primary/30 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">Current Market Price</h3>
              <p className="text-3xl font-bold text-secondary">
                ₹{listings[0]?.price_per_quintal ?? 2000}
              </p>
              <p className="text-sm opacity-90 mt-1">per quintal (Paddy stubble)</p>
            </div>
            <TrendingUp className="w-16 h-16 opacity-30" />
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">My Listings</h2>
              <Button onClick={() => setShowAddListing(!showAddListing)} className="gradient-green text-primary-foreground">
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
                      <select
                        value={newListing.district}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            district: e.target.value,
                            customDistrict: e.target.value === "Other" ? newListing.customDistrict : "",
                          })
                        }
                        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      >
                        <option value="" disabled>
                          Select district
                        </option>
                        {PUNJAB_DISTRICTS.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      {newListing.district === "Other" && (
                        <Input
                          className="mt-3"
                          placeholder="Enter district"
                          value={newListing.customDistrict}
                          onChange={(e) => setNewListing({ ...newListing, customDistrict: e.target.value })}
                          required
                        />
                      )}
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
                    <Button type="submit" className="gradient-green text-primary-foreground" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Add Listing"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddListing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="space-y-4">
              {isLoading ? (
                <Card className="p-6 text-center text-muted-foreground">Loading listings...</Card>
              ) : listings.length === 0 ? (
                <Card className="p-6 text-center text-muted-foreground">No listings yet. Create your first listing to get started.</Card>
              ) : (
                listings.map((listing) => (
                  <Card
                    key={listing.id}
                    className="p-6 hover:shadow-medium transition-smooth cursor-pointer"
                    onClick={() => navigate(`/farmer-dashboard/listings/${listing.id}`)}
                    role="button"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{listing.crop_type} Stubble</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          {listing.district}
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          listing.status === "Active"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        {listing.status || "Active"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-semibold">{listing.quantity} quintals</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-semibold text-primary">₹{listing.price_per_quintal}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interested</p>
                        <p className="font-semibold text-secondary">{getInterestCount(listing)} buyers</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click anywhere on this card to open detailed buyer information in a dedicated view.
                    </p>
                    <div className="flex gap-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-destructive text-destructive"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone and will remove all buyer interests tied to this listing.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteListing(listing.id)}>
                              Delete Listing
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        size="sm"
                        className="gradient-green text-primary-foreground ml-auto"
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(`/farmer-dashboard/listings/${listing.id}`);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Interested Buyers
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-secondary/10 border-secondary/30">
              <Phone className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Have questions or need support with your listings? Reach out anytime.
              </p>
              <Button asChild className="w-full gradient-warm text-secondary-foreground">
                <Link to="/contact">Contact Support</Link>
              </Button>
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
