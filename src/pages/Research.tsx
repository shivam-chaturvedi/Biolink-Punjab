import { Card } from "@/components/ui/card";
import { FileText, BarChart, Users, AlertCircle } from "lucide-react";
import researchField from "@/assets/research-field.png";

const Research = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-primary">Research & Results</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the economic, behavioral, and logistical barriers that keep farmers dependent on stubble burning
          </p>
        </div>

        {/* Objectives */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-primary">Objectives and Aims</h2>
              <p className="text-lg leading-relaxed mb-4">
                Our research investigates the economic, behavioral, and logistical barriers that keep farmers dependent on stubble burning.
              </p>
              <p className="text-lg leading-relaxed">
                Through field surveys conducted in Punjab, the study sought to understand farmer attitudes toward selling crop residue, their price expectations, and their openness to technological solutions.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-large">
              <img src={researchField} alt="Research field" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Summary of Findings */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-primary">Summary of Findings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="text-6xl font-bold text-primary mb-4">90%</div>
              <p className="text-lg">
                of farmers currently burn stubble, yet <strong>all expressed willingness to sell</strong> if given fair prices and transport support.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="text-6xl font-bold text-secondary mb-4">60%</div>
              <p className="text-lg">
                expect at least <strong>₹2,000 per quintal</strong>, while others would sell at slightly lower rates if logistics were provided.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="text-6xl font-bold text-primary mb-4">70%</div>
              <p className="text-lg">
                lack buyers, <strong>20% lack information</strong>, and <strong>10% face high transportation costs</strong>.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="text-6xl font-bold text-secondary mb-4">90%</div>
              <p className="text-lg">
                prefer <strong>simple phone-based helplines</strong> over complex mobile apps (70% open to digital tools).
              </p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="text-6xl font-bold text-primary mb-4">100%</div>
              <p className="text-lg">
                emphasized the need for <strong>transportation assistance and timely payments</strong>.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-medium transition-smooth bg-primary text-primary-foreground">
              <AlertCircle className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Key Insight</h3>
              <p className="text-lg opacity-90">
                Farmers are not unwilling — they are unequipped.
              </p>
            </Card>
          </div>
        </section>

        {/* Key Insight */}
        <section className="mb-16 bg-muted rounded-2xl p-8">
          <h2 className="mb-4 text-primary text-center">Key Insight</h2>
          <p className="text-xl text-center leading-relaxed">
            <strong>Farmers are not unwilling — they are unequipped.</strong><br />
            Stubble burning persists not due to resistance but due to a missing market structure that fails to connect supply with demand.
          </p>
        </section>

        {/* Research Paper Outline */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-primary">Research Paper Outline</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <FileText className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Abstract</h3>
              <p className="text-muted-foreground">
                Summarizes the ongoing issue of stubble burning in Punjab and its contribution to North India's winter pollution crisis. Highlights the project's aim to develop a stubble-to-value marketplace.
              </p>
            </Card>
            <Card className="p-6">
              <FileText className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Introduction</h3>
              <p className="text-muted-foreground">
                Provides context on the scale and seasonal nature of stubble burning, detailing its effects on air quality, climate, and health.
              </p>
            </Card>
            <Card className="p-6">
              <FileText className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Literature Review</h3>
              <p className="text-muted-foreground">
                Reviews national and international studies on crop residue management, evaluating environmental, economic, and policy perspectives.
              </p>
            </Card>
            <Card className="p-6">
              <FileText className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Methodology</h3>
              <p className="text-muted-foreground">
                Describes a field survey conducted with 15 farmers in Punjab using structured questionnaires and descriptive analysis.
              </p>
            </Card>
            <Card className="p-6">
              <BarChart className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Results</h3>
              <p className="text-muted-foreground">
                Summarizes survey outcomes showing willingness to sell under fair conditions and identifies key barriers.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Discussion & Conclusion</h3>
              <p className="text-muted-foreground">
                Connects findings to market failure theories and recommends holistic policy frameworks combining price assurance and logistics.
              </p>
            </Card>
          </div>
        </section>

        {/* Research Analytics Table */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-primary">Research Analytics Summary</h2>
          <div className="overflow-x-auto shadow-medium rounded-lg">
            <table className="w-full">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="p-4 text-left">Theme</th>
                  <th className="p-4 text-left">Key Insights</th>
                  <th className="p-4 text-left">Implications</th>
                </tr>
              </thead>
              <tbody className="bg-card">
                <tr className="border-b">
                  <td className="p-4 font-semibold">Disposal Practices</td>
                  <td className="p-4">90% burn residue; small fraction compost or sell</td>
                  <td className="p-4">Burning is the default due to lack of viable alternatives</td>
                </tr>
                <tr className="border-b bg-muted/50">
                  <td className="p-4 font-semibold">Willingness to Sell</td>
                  <td className="p-4">100% willing if conditions are met</td>
                  <td className="p-4">Indicates strong readiness for market participation</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Price Expectation</td>
                  <td className="p-4">60% expect ₹2,000 per quintal; others ₹1,500–₹1,800</td>
                  <td className="p-4">Sets a benchmark for market pricing models</td>
                </tr>
                <tr className="border-b bg-muted/50">
                  <td className="p-4 font-semibold">Barriers</td>
                  <td className="p-4">70% lack buyers, 20% lack information, 10% face transport issues</td>
                  <td className="p-4">Shows need for market linkage and logistics solutions</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Digital Solutions</td>
                  <td className="p-4">90% prefer phone helplines, 30% apps, 20% SMS</td>
                  <td className="p-4">Simplicity and trust drive digital adoption</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-4 font-semibold">Logistics & Payments</td>
                  <td className="p-4">100% need transport and immediate payment</td>
                  <td className="p-4">Core operational needs for platform success</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Goals & Recommendations */}
        <section>
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
              <h2 className="mb-6">Project Goals</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-secondary text-2xl mr-3">1.</span>
                  <span>Less stubble burning by offering farmers direct market linkages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary text-2xl mr-3">2.</span>
                  <span>Increase farm earnings through commercializing farm residue</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary text-2xl mr-3">3.</span>
                  <span>Circular economy promotes environmental sustainability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary text-2xl mr-3">4.</span>
                  <span>Make trading easy, reliable and accessible with digital technology</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="mb-6 text-primary">Policy Recommendations</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">•</span>
                  <span><strong>Price Assurance Programs:</strong> Offer minimum support prices on stubble</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">•</span>
                  <span><strong>Public-Private Partnerships:</strong> Engage paper mills, biomass plants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">•</span>
                  <span><strong>Logistics Support:</strong> Organize government-paid transport services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">•</span>
                  <span><strong>Simple Digital Access:</strong> User-friendly tools over complex apps</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary text-2xl mr-3">•</span>
                  <span><strong>Payment Transparency:</strong> Instant and safe payment systems</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Research;
