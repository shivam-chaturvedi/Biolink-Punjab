import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, MapPin, Package, Phone, Eye } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface OwnerProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  district: string | null;
}

interface Listing {
  id: string;
  crop_type: string;
  quantity: number | null;
  price_per_quintal: number | null;
  district: string | null;
  needs_transport: boolean;
  owner_id: string;
  created_at: string;
  owner_profile?: OwnerProfile | null;
}

const BuyerDashboard = () => {
  const { user, profile, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [viewListingId, setViewListingId] = useState<string | null>(null);
  const [interestListingId, setInterestListingId] = useState<string | null>(null);
  const [interestNote, setInterestNote] = useState("");
  const [interestQuantity, setInterestQuantity] = useState("");
  const [interestPrice, setInterestPrice] = useState("");
  const [interestLocation, setInterestLocation] = useState("");
  const [submittingInterest, setSubmittingInterest] = useState(false);

  const {
    data: listings = [],
    isLoading,
  } = useQuery<Listing[]>({
    queryKey: ["buyerListings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      const listings = data ?? [];
      

      const enrichedListings = await Promise.all(
        listings.map(async (listing) => {
          if (!listing.owner_id) {
            return { ...listing, owner_profile: null };
          }

          const { data: ownerProfile, error: ownerError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", listing.owner_id)
            .maybeSingle();

          if (ownerError) {
            console.error("Unable to fetch farmer profile", ownerError);
          }
          return {
            ...listing,
            owner_profile: ownerProfile
              ? {
                  id: ownerProfile.id,
                  full_name: ownerProfile.full_name,
                  phone: ownerProfile.phone,
                  district: ownerProfile.district,
                }
              : null,
          };
        })
      );

      return enrichedListings;
    },
  });

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesCrop = listing.crop_type
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDistrict = districtFilter
        ? listing.district?.toLowerCase().includes(districtFilter.toLowerCase())
        : true;
      return (matchesCrop ?? false) && matchesDistrict;
    });
  }, [listings, searchTerm, districtFilter]);

  const totalQuantity = filteredListings.reduce((sum, listing) => sum + (listing.quantity || 0), 0);
  const totalDistricts = new Set(filteredListings.map((listing) => listing.district)).size;
  const activeFarmers = new Set(filteredListings.map((listing) => listing.owner_id)).size;
  const [interestListing, setInterestListing] = useState<Listing | null>(null);

  const openInterestDialog = (listing: Listing) => {
    setInterestListing(listing);
    setInterestListingId(listing.id);
    setInterestQuantity("");
    setInterestNote("");
    setInterestPrice("");
    setInterestLocation(profile?.district || listing.owner_profile?.district || "");
  };

  const handleSubmitInterest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !interestListingId || !interestListing) return;
    setSubmittingInterest(true);
    const requestedQuantity = interestQuantity ? Number(interestQuantity) : null;
    if (
      requestedQuantity &&
      interestListing.quantity &&
      requestedQuantity > interestListing.quantity
    ) {
      toast.error("Requested quantity cannot exceed farmer availability.");
      setSubmittingInterest(false);
      return;
    }
    const offeredPrice = interestPrice ? Number(interestPrice) : null;
    if (offeredPrice && interestListing.price_per_quintal) {
      const maxDiff = interestListing.price_per_quintal * 0.4;
      if (Math.abs(offeredPrice - interestListing.price_per_quintal) > maxDiff) {
        toast.error("Offer price must stay within 40% of the listed price.");
        setSubmittingInterest(false);
        return;
      }
    }
    const { error } = await supabase.from("listing_interests").insert({
      listing_id: interestListingId,
      buyer_id: user.id,
      quantity: requestedQuantity,
      message: interestNote,
      offered_price: offeredPrice,
      buyer_location: interestLocation || profile?.district || null,
    });
    if (error) {
      toast.error(error.message);
      setSubmittingInterest(false);
      return;
    }
    toast.success("Interest submitted to farmer");
    setSubmittingInterest(false);
    setInterestQuantity("");
    setInterestNote("");
    setInterestPrice("");
    setInterestLocation("");
    setInterestListing(null);
    setInterestListingId(null);
  };

  const handleUseCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation not supported in your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInterestLocation(
          `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        );
        toast.success("Location captured");
      },
      () => toast.error("Unable to fetch your location")
    );
  };

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
          <h2 className="text-2xl font-bold text-secondary">Login Required</h2>
          <p className="text-muted-foreground">Please sign in as a buyer to browse listings.</p>
          <Button asChild className="gradient-warm text-secondary-foreground">
            <Link to="/buyer-login">Go to Buyer Login</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (profile?.role !== "buyer") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-secondary">Access Restricted</h2>
          <p className="text-muted-foreground">Switch to a buyer account to view this page.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Browse verified farmer listings across Punjab</p>
        </div>

        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 flex items-center gap-2 border border-input rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by crop type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus-visible:ring-0 px-2"
              />
            </div>
            <div className="flex items-center gap-2 border border-input rounded-lg px-3 py-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="District"
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="border-0 focus-visible:ring-0 px-2"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => {
              setSearchTerm("");
              setDistrictFilter("");
            }}>
              <Filter className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Available Listings</p>
            <p className="text-3xl font-bold text-secondary">{filteredListings.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Quantity</p>
            <p className="text-3xl font-bold text-secondary">{totalQuantity}</p>
            <p className="text-xs text-muted-foreground">quintals</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Districts Covered</p>
            <p className="text-3xl font-bold text-secondary">{totalDistricts}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Active Farmers</p>
            <p className="text-3xl font-bold text-secondary">{activeFarmers}</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-secondary">Available Listings</h2>
            {isLoading ? (
              <Card className="p-6 text-center text-muted-foreground">Loading listings...</Card>
            ) : filteredListings.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground">No listings match your criteria yet.</Card>
            ) : (
              filteredListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="p-6 hover:shadow-medium transition-smooth flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-secondary">{listing.crop_type} Stubble</h3>
                      <p className="text-sm text-muted-foreground">
                        Farmer: {listing.owner_profile?.full_name || "Unknown"}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {listing.district || listing.owner_profile?.district || "NA"}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-2xl font-bold text-secondary">
                        ₹{listing.price_per_quintal?.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">per quintal</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{listing.quantity} quintals</span>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-3 sm:flex-nowrap w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        disabled={!listing.owner_profile?.phone}
                      >
                        <a href={listing.owner_profile?.phone ? `tel:${listing.owner_profile.phone}` : undefined}>
                          <Phone className="w-4 h-4 mr-1" /> Call Farmer
                        </a>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="gradient-warm text-secondary-foreground"
                            onClick={() => setViewListingId(listing.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" /> View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] sm:max-w-2xl border border-secondary/20 shadow-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl text-secondary">{listing.crop_type} Stubble</DialogTitle>
                            <DialogDescription className="text-base">
                              Full listing details and seller information.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid sm:grid-cols-2 gap-4 py-4 text-sm">
                            <div className="rounded-xl bg-muted p-4">
                              <p className="text-muted-foreground text-xs uppercase">Quantity</p>
                              <p className="text-xl font-semibold">{listing.quantity} quintals</p>
                            </div>
                            <div className="rounded-xl bg-muted p-4">
                              <p className="text-muted-foreground text-xs uppercase">Price</p>
                              <p className="text-xl font-semibold">₹{listing.price_per_quintal}</p>
                            </div>
                            <div className="rounded-xl bg-muted p-4">
                              <p className="text-muted-foreground text-xs uppercase">District</p>
                              <p className="text-lg">{listing.district || listing.owner_profile?.district || "NA"}</p>
                            </div>
                            <div className="rounded-xl bg-muted p-4">
                              <p className="text-muted-foreground text-xs uppercase">Transport</p>
                              <p className="text-lg">{listing.needs_transport ? "Required" : "Not required"}</p>
                            </div>
                            <div className="rounded-xl bg-muted p-4">
                              <p className="text-muted-foreground text-xs uppercase">Farmer</p>
                              <p className="text-lg">{listing.owner_profile?.full_name || "Unknown"}</p>
                            </div>
                            <div className="rounded-xl bg-muted p-4">
                              <p className="text-muted-foreground text-xs uppercase">Contact</p>
                              <p className="text-lg">{listing.owner_profile?.phone || "—"}</p>
                            </div>
                        <div className="rounded-xl bg-muted p-4">
                          <p className="text-muted-foreground text-xs uppercase">Farmer</p>
                          <p className="text-lg">{listing.owner_profile?.full_name || "Unknown"}</p>
                          <p className="text-sm text-muted-foreground">
                            {listing.owner_profile?.phone || "Contact not shared"}
                          </p>
                        </div>
                        <div className="rounded-xl bg-muted p-4">
                          <p className="text-muted-foreground text-xs uppercase">Farmer District</p>
                          <p className="text-lg">{listing.owner_profile?.district || "Punjab"}</p>
                        </div>
                        <div className="rounded-xl bg-muted p-4 col-span-full">
                          <p className="text-muted-foreground text-xs uppercase">Created</p>
                          <p className="text-lg">
                            {listing.created_at
                              ? new Date(listing.created_at).toLocaleString()
                              : "—"}
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Close</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={interestListingId === listing.id}
                        onOpenChange={(open) => {
                          if (open) {
                            openInterestDialog(listing);
                          } else {
                            setInterestListingId(null);
                            setInterestListing(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-secondary text-secondary"
                            onClick={() => openInterestDialog(listing)}
                          >
                            Show Interest
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] sm:max-w-xl border border-secondary/20 shadow-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-secondary">Express Interest</DialogTitle>
                            <DialogDescription>
                              Share your requirements with the farmer so they can respond quickly.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmitInterest} className="space-y-4">
                            <Input
                              type="number"
                              placeholder="Quantity needed (quintals)"
                              value={interestQuantity}
                              onChange={(e) => setInterestQuantity(e.target.value)}
                              min="1"
                              required
                            />
                            <Input
                              type="number"
                              placeholder="Your offer price per quintal (₹)"
                              value={interestPrice}
                              onChange={(e) => setInterestPrice(e.target.value)}
                              min="1"
                            />
                            <div className="space-y-2">
                              <Input
                                placeholder="Your location"
                                value={interestLocation}
                                onChange={(e) => setInterestLocation(e.target.value)}
                                required
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleUseCurrentLocation}
                              >
                                Use Current Location
                              </Button>
                            </div>
                            <Textarea
                              placeholder="Add a message for the farmer"
                              value={interestNote}
                              onChange={(e) => setInterestNote(e.target.value)}
                              rows={4}
                            />
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="ghost" type="button">
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button type="submit" disabled={submittingInterest}>
                                {submittingInterest ? "Sending..." : "Submit Interest"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-secondary/10">
              <Phone className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-bold mb-2">Need Assistance?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our team is ready to help you find the right suppliers.
              </p>
              <Button asChild className="w-full gradient-warm text-secondary-foreground">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
