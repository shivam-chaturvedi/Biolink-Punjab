import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import mustardField from "@/assets/mustard-field.jpg";

const BuyerLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    gstNumber: "",
    contactPerson: "",
    phone: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? "Welcome back!" : "Registration successful!");
    navigate("/buyer-dashboard");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-16 px-4"
      style={{
        backgroundImage: `url(${mustardField})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      
      <Card className="relative z-10 w-full max-w-lg p-8 shadow-large">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full gradient-warm flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-2">
            {isLogin ? "Buyer Login" : "Buyer Registration"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Access verified farmer listings" : "Register your industry to source quality stubble"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Your company name"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  placeholder="GST number"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="Primary contact name"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="mt-2"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="company@example.com"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
              required
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full gradient-warm text-secondary-foreground">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-secondary hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2 text-secondary">Industry Registration Benefits:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✓ Access verified farmer database</li>
            <li>✓ Filter by district, price, and volume</li>
            <li>✓ Secure payment options</li>
            <li>✓ Logistics support available</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default BuyerLogin;
