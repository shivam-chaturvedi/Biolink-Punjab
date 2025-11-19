import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowLeft,
  MapPin,
  Package,
  IndianRupee,
  Truck,
  Phone,
  CalendarDays,
} from "lucide-react";

interface BuyerProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  district: string | null;
  company_name: string | null;
  gst_number: string | null;
  contact_person: string | null;
  role?: string | null;
  created_at?: string | null;
}

interface Interest {
  id: string;
  buyer_id: string;
  quantity: number | null;
  message: string | null;
  offered_price: number | null;
  buyer_location: string | null;
  status: string;
  created_at: string;
  buyer: BuyerProfile | null;
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
  interests: Interest[];
}

const parseCoordinateString = (value?: string | null): { lat: number; lng: number } | null => {
  if (!value) return null;
  const [latString, lngString] = value.split(",").map((part) => part.trim());
  if (!latString || !lngString) return null;
  const lat = Number(latString);
  const lng = Number(lngString);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return { lat, lng };
  }
  return null;
};

const FarmerListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const { data: listing, isLoading, refetch } = useQuery<Listing | null>({
    queryKey: ["farmerListingDetails", id, user?.id],
    queryFn: async () => {
      if (!user || !id) return null;

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
              district,
              company_name,
              gst_number,
              contact_person,
              role,
              created_at
            )
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);

      return data as Listing;
    },
    enabled: Boolean(user && id),
  });

  const sortedInterests = useMemo(() => {
    if (!listing?.interests) return [];
    return [...listing.interests].sort((a, b) =>
      a.created_at < b.created_at ? 1 : -1
    );
  }, [listing?.interests]);

  const handleInterestAction = async (interestId: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("listing_interests")
      .update({ status })
      .eq("id", interestId);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Interest ${status}`);
    refetch();
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading listing details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="p-8 space-y-4 text-center">
          <h2 className="text-2xl font-bold text-primary">Login Required</h2>
          <p className="text-muted-foreground">
            Please log in as a farmer to view listing details.
          </p>
          <Button asChild className="gradient-green text-primary-foreground">
            <Link to="/farmer-login">Go to Farmer Login</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (!listing || listing.owner_id !== user.id) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <Card className="p-8 space-y-4 text-center">
          <h2 className="text-2xl font-bold text-primary">Listing not available</h2>
          <p className="text-muted-foreground">
            We could not find this listing or you do not have access.
          </p>
          <Button
            className="gradient-green text-primary-foreground"
            onClick={() => navigate("/farmer-dashboard")}
          >
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
            Back to listings
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            {new Date(listing.created_at).toLocaleString()}
          </div>
        </div>

        {/* Listing summary */}
        <Card className="p-6 border border-primary/20 shadow-sm bg-background">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase text-muted-foreground">Listing</p>
              <h1 className="text-3xl font-bold text-primary">
                {listing.crop_type} Stubble
              </h1>
              <p className="text-muted-foreground">Listing ID: {listing.id}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                listing.status === "Active"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary"
              }`}
            >
              {listing.status || "Active"}
            </span>
          </div>

          {/* Quick details */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="rounded-xl bg-muted p-4 flex items-center gap-3">
              <Package className="w-10 h-10 text-primary" />
              <div>
                <p className="text-xs uppercase text-muted-foreground">Quantity</p>
                <p className="text-xl font-semibold">{listing.quantity} quintals</p>
              </div>
            </div>

            <div className="rounded-xl bg-muted p-4 flex items-center gap-3">
              <IndianRupee className="w-10 h-10 text-primary" />
              <div>
                <p className="text-xs uppercase text-muted-foreground">Price / Quintal</p>
                <p className="text-xl font-semibold">₹{listing.price_per_quintal}</p>
              </div>
            </div>

            <div className="rounded-xl bg-muted p-4 flex items-center gap-3">
              <MapPin className="w-10 h-10 text-primary" />
              <div>
                <p className="text-xs uppercase text-muted-foreground">District</p>
                <p className="text-xl font-semibold">{listing.district || "Not shared"}</p>
              </div>
            </div>

            <div className="rounded-xl bg-muted p-4 flex items-center gap-3">
              <Truck className="w-10 h-10 text-primary" />
              <div>
                <p className="text-xs uppercase text-muted-foreground">Transport</p>
                <p className="text-xl font-semibold">
                  {listing.needs_transport ? "Support required" : "No support needed"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Buyer Interests */}
        <Card className="p-6 border border-primary/20 bg-background shadow-sm">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold text-primary">Interested Buyers</h2>
            <p className="text-muted-foreground text-sm">
              Buyer details are shown after opening the listing.
            </p>
          </div>

          {sortedInterests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No buyer has shown interest yet.
            </p>
          ) : (
            <div className="space-y-4">
              {sortedInterests.map((interest) => {
                const interestCoords = parseCoordinateString(interest.buyer_location);
                return (
                  <Card
                    key={interest.id}
                    className="p-4 border border-primary/20 bg-muted/50"
                  >
                  {/* Buyer header */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-lg font-semibold">
                        {interest.buyer?.full_name || "Buyer"}{" "}
                        <span className="text-xs uppercase text-muted-foreground">
                          ({interest.buyer?.company_name || "Individual"})
                        </span>
                      </p>

                      <p className="text-sm text-muted-foreground">
                        District:{" "}
                        {interest.buyer?.district ||
                          interest.buyer_location ||
                          "Not shared"}
                      </p>

                      {interest.buyer?.company_name && (
                        <p className="text-sm text-muted-foreground">
                          Company: {interest.buyer.company_name}
                        </p>
                      )}

                      {interest.buyer?.gst_number && (
                        <p className="text-sm text-muted-foreground">
                          GST: {interest.buyer.gst_number}
                        </p>
                      )}

                      {interest.buyer?.contact_person && (
                        <p className="text-sm text-muted-foreground">
                          Contact Person: {interest.buyer.contact_person}
                        </p>
                      )}

                      {interest.buyer?.created_at && (
                        <p className="text-sm text-muted-foreground">
                          Profile Created:{" "}
                          {new Date(
                            interest.buyer.created_at
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold ${
                          interest.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : interest.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {interest.status}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {new Date(interest.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Interest details */}
                  <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                    <p>
                      <strong>Quantity needed:</strong>{" "}
                      {interest.quantity ?? "—"} quintals
                    </p>
                    <p>
                      <strong>Offer price:</strong> ₹
                      {interest.offered_price ?? "—"}
                    </p>

                    <p className="md:col-span-2">
                      <strong>Message:</strong>{" "}
                      {interest.message || "No additional message shared"}
                    </p>
                    {interestCoords && (
                      <div className="md:col-span-2 space-y-2">
                        <strong>Location Preview:</strong>
                        <div className="rounded-lg overflow-hidden border border-primary/20">
                          <iframe
                            title={`Buyer location ${interest.buyer?.full_name || interest.id}`}
                            src={`https://www.google.com/maps?q=${interestCoords.lat},${interestCoords.lng}&z=14&output=embed`}
                            className="w-full h-56"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {interest.buyer?.phone ? (
                      <Button asChild size="sm" variant="outline" className="gap-2">
                        <a href={`tel:${interest.buyer.phone}`}>
                          <Phone className="w-4 h-4" />
                          Call {interest.buyer.phone}
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        <Phone className="w-4 h-4" />
                        No phone shared
                      </Button>
                    )}

                    {interest.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="gradient-green text-primary-foreground"
                          onClick={() =>
                            handleInterestAction(interest.id, "approved")
                          }
                        >
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-destructive text-destructive"
                          onClick={() =>
                            handleInterestAction(interest.id, "rejected")
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FarmerListingDetails;
