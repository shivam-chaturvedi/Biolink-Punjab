import { Card } from "@/components/ui/card";
import { Target, Heart, Lightbulb, TrendingUp } from "lucide-react";

const farmerPortrait = "/images/goals-image.png";

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-primary">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A sustainable circular-economy initiative connecting Punjab farmers to biomass industries
          </p>
        </div>

        {/* Who We Are */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-large">
              <img src={farmerPortrait} alt="Punjab Farmer" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="mb-6 text-primary">Who We Are</h2>
              <div className="space-y-4 text-lg">
                <p>
                  <strong className="text-primary">Biolink Punjab</strong> is a pioneering initiative created by <strong>Samaira Sapra</strong> to address one of North India's most pressing environmental challenges.
                </p>
                <p>
                  We are a sustainable circular-economy platform that connects Punjab's farmers directly with biomass industries, transforming agricultural waste into valuable resources.
                </p>
                <p className="text-primary-light font-semibold">
                  Our platform serves as the crucial missing link in Punjab's agricultural supply chain, enabling farmers to profit from their stubble while protecting the environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-16 h-16 mx-auto mb-6 text-secondary" />
            <h2 className="mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed opacity-95">
              To create a cleaner, healthier Punjab by establishing a transparent marketplace that ensures <strong>clean air</strong>, increases <strong>farmer income</strong>, and promotes <strong>resource reuse</strong> through sustainable agricultural practices.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-center mb-12 text-primary">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-large transition-smooth">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in honest, open dealings between all stakeholders. Every transaction is clear, verifiable, and fair.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-large transition-smooth">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Environmental Responsibility</h3>
              <p className="text-muted-foreground">
                Protecting our air, soil, and climate is at the core of everything we do. Sustainability drives our innovation.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-large transition-smooth">
              <div className="w-16 h-16 rounded-full gradient-green flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Innovation</h3>
              <p className="text-muted-foreground">
                We leverage technology to solve age-old problems, making sustainable practices accessible and profitable.
              </p>
            </Card>
          </div>
        </section>

        {/* Why Biolink Punjab */}
        <section className="mb-16">
          <h2 className="text-center mb-12 text-primary">Why Biolink Punjab?</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-l-4 border-l-primary">
                <h3 className="text-xl font-bold mb-4 text-primary">Solves Market Failure</h3>
                <p className="text-muted-foreground">
                  The stubble burning crisis exists because farmers lack buyers. We've built the infrastructure to connect supply with demand, eliminating the need to burn.
                </p>
              </Card>

              <Card className="p-8 border-l-4 border-l-secondary">
                <h3 className="text-xl font-bold mb-4 text-secondary">Makes Waste into Income</h3>
                <p className="text-muted-foreground">
                  What was once burned as waste can now be sold as a valuable resource. We help farmers turn every quintal of stubble into revenue.
                </p>
              </Card>

              <Card className="p-8 border-l-4 border-l-primary">
                <h3 className="text-xl font-bold mb-4 text-primary">Helps Fight Air Pollution</h3>
                <p className="text-muted-foreground">
                  By reducing stubble burning, we directly tackle the root cause of North India's winter smog, protecting millions of lives.
                </p>
              </Card>

              <Card className="p-8 border-l-4 border-l-secondary">
                <h3 className="text-xl font-bold mb-4 text-secondary">Supports Circular Economy</h3>
                <p className="text-muted-foreground">
                  We enable bioenergy, paper, and composting industries to source renewable materials, creating a sustainable cycle.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section className="bg-muted rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-primary">About the Creator</h2>
            <p className="text-lg mb-4">
              <strong className="text-primary">Samaira Sapra</strong> is a passionate environmental advocate and innovator dedicated to solving Punjab's stubble burning crisis.
            </p>
            <p className="text-lg mb-4">
              Through extensive field research and collaboration with farmers across Punjab, Samaira identified the critical gap in the market and developed Biolink Punjab as a comprehensive solution.
            </p>
            <p className="text-lg text-primary-light font-semibold">
              "Farmers are not unwilling to change—they are simply unequipped. Our mission is to equip them with the tools and market access they need to thrive sustainably."
            </p>
            <div className="mt-8 pt-8 border-t">
              <p className="text-muted-foreground">
                Contact: <a href="mailto:samairasapra02@gmail.com" className="text-primary hover:underline">samairasapra02@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
