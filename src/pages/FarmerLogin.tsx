import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Phone } from "lucide-react";
import { toast } from "sonner";
import heroBackground from "@/assets/hero-background.jpg";

const FarmerLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    district: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? "Welcome back!" : "Registration successful!");
    navigate("/farmer-dashboard");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-16 px-4"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <Card className="relative z-10 w-full max-w-md p-8 shadow-large">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            {isLogin ? "Farmer Login" : "Farmer Registration"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back! Login to sell your stubble" : "Join thousands of farmers earning from stubble"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
                className="mt-2"
              />
            </div>
          )}

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

          {!isLogin && (
            <div>
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="Your district"
                required
                className="mt-2"
              />
            </div>
          )}

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

          <Button type="submit" className="w-full gradient-green text-primary-foreground">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span className="text-sm">Need help? Call our 24/7 helpline</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2 text-primary">Simple Registration Process:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✓ Register with your phone number</li>
            <li>✓ Large buttons for easy navigation</li>
            <li>✓ Mobile-first design</li>
            <li>✓ Support available via phone</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default FarmerLogin;
