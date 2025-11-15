import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "farmer",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      userType: "farmer",
      message: ""
    });
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-primary">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to our team for support and information
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 shadow-large">
            <h2 className="text-2xl font-bold mb-6 text-primary">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
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

              <div>
                <Label>I am a *</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="farmer" id="farmer" />
                    <Label htmlFor="farmer" className="font-normal cursor-pointer">
                      Farmer / Seller
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label htmlFor="buyer" className="font-normal cursor-pointer">
                      Buyer / Industry
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="font-normal cursor-pointer">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help you..."
                  required
                  rows={5}
                  className="mt-2"
                />
              </div>

              <Button type="submit" className="w-full gradient-green text-primary-foreground">
                <Send className="mr-2 w-4 h-4" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-primary to-primary-light text-primary-foreground shadow-large">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg opacity-90 mb-8">
                We're committed to helping farmers and buyers connect for a sustainable future. Reach out through any of the channels below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:samairasapra02@gmail.com" className="opacity-90 hover:opacity-100 transition-smooth">
                      samairasapra02@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Helpline</h3>
                    <p className="opacity-90">24/7 Support Available</p>
                    <p className="text-sm opacity-75 mt-1">Available in Punjabi, Hindi, and English</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Location</h3>
                    <p className="opacity-90">Punjab, India</p>
                    <p className="text-sm opacity-75 mt-1">Serving farmers and buyers across Punjab</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-8 shadow-medium">
              <h3 className="text-xl font-bold mb-4 text-primary">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="/farmer-login" className="text-muted-foreground hover:text-primary transition-smooth">
                  Farmer Login
                </a>
                <a href="/buyer-login" className="text-muted-foreground hover:text-primary transition-smooth">
                  Buyer Login
                </a>
                <a href="/services" className="text-muted-foreground hover:text-primary transition-smooth">
                  Services
                </a>
                <a href="/research" className="text-muted-foreground hover:text-primary transition-smooth">
                  Research
                </a>
                <a href="/about" className="text-muted-foreground hover:text-primary transition-smooth">
                  About Us
                </a>
                <a href="/blog" className="text-muted-foreground hover:text-primary transition-smooth">
                  Blog
                </a>
              </div>
            </Card>

            {/* Office Hours */}
            <Card className="p-8 shadow-medium bg-muted">
              <h3 className="text-xl font-bold mb-4 text-primary">Support Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Phone Support:</span>
                  <span className="font-semibold text-primary">24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Email Response:</span>
                  <span className="font-semibold text-primary">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Access:</span>
                  <span className="font-semibold text-primary">Always Open</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="p-4 shadow-large">
            <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-lg">Serving all districts across Punjab</p>
                <p className="text-sm mt-2">Connecting farmers and buyers statewide</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
