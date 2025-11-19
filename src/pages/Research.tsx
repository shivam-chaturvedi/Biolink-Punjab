import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Target, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const summaryVisual = "/images/research%20and%20results/summary%20of%20findings.jpg";
const summaryVisualAlt = "/images/research%20and%20results/summary%20of%20findings2.jpg";
const goalsVisual = "/images/research%20and%20results/goals%20and%20recommendation.png";
const visionVisual = "/images/research%20and%20results/long%20term%20vision.png";

const findings = [
  "90% of farmers currently burn stubble, yet all expressed willingness to sell if given fair prices and transport support.",
  "60% expect at least ₹2,000 per quintal, while others would sell at slightly lower rates if logistics were provided.",
  "The main barriers include lack of buyers (70%), lack of information (20%), and high transportation costs (10%).",
  "70% are open to digital tools, but 90% prefer simple phone-based helplines over complex mobile apps.",
  "Every farmer surveyed emphasized the need for transportation assistance and timely payments."
];

const outline = [
  {
    title: "Abstract",
    description:
      "Summarizes the pollution crisis, the platform's purpose, and the key finding that farmers are willing to sell residue when price, logistics, and payment reliability are addressed."
  },
  {
    title: "Introduction",
    description:
      "Frames stubble burning as a systemic market failure and outlines objectives focused on farmer behavior, pricing, and viable policy or technological interventions."
  },
  {
    title: "Literature Review",
    description:
      "Surveys global and Indian studies on residue management, highlighting why subsidies and penalties have fallen short while circular-economy models abroad have succeeded."
  },
  {
    title: "Methodology",
    description:
      "Details field surveys with 15 Punjab farmers, covering sampling choices, thematic focus areas, and the descriptive plus relational analysis techniques used."
  },
  {
    title: "Results & Key Findings",
    description:
      "Reports the quantitative outcomes: willingness to sell, price benchmarks, barriers, preferred communication channels, and operating requirements such as transport and instant payments."
  },
  {
    title: "Discussion",
    description:
      "Connects evidence to theories of coordination failure, showing stubble burning persists because marketplaces are missing—not because farmers resist change."
  },
  {
    title: "Conclusion & Future Research",
    description:
      "Recommends price assurance, logistics infrastructure, and transparent payments while encouraging cost–benefit studies and scalable public–private partnerships."
  }
];

const analyticsRows = [
  {
    theme: "Disposal Practices",
    insight: "90% burn residue; small fraction compost or sell",
    implication: "Burning remains the default due to lack of viable alternatives"
  },
  {
    theme: "Willingness to Sell",
    insight: "100% willing if conditions are met",
    implication: "Clear signal that market participation can be immediate"
  },
  {
    theme: "Price Expectation",
    insight: "60% expect ₹2,000 per quintal; others ₹1,500–₹1,800",
    implication: "Establishes pricing benchmarks for procurement models"
  },
  {
    theme: "Barriers",
    insight: "70% lack buyers, 20% lack information, 10% face transport issues",
    implication: "Highlights immediate need for linkage platforms and logistics"
  },
  {
    theme: "Digital Solutions",
    insight: "90% prefer phone helplines, 30% apps, 20% SMS",
    implication: "Design systems around simplicity and trust"
  },
  {
    theme: "Logistics & Payments",
    insight: "100% require transport support and instant payment",
    implication: "Operational readiness depends on infrastructure and transparency"
  }
];

const projectGoals = [
  "Less stubble burning by offering the farmers direct market linkages",
  "Increase farm earnings through commercializing farm residue",
  "Champion a circular economy that anchors environmental sustainability",
  "Make trading easy, reliable, and accessible with digital technology"
];

const policyRecommendations = [
  "Price assurance programs: provide minimum or benchmark pricing on stubble to build confidence",
  "Public–private partnerships: engage paper mills, biomass plants, and biofuel producers to guarantee demand",
  "Logistics support: establish government-backed collection points or transport services so selling becomes practical",
  "Simple digital access: match buyers and sellers through helplines and lightweight tools rather than complicated apps",
  "Transparent payments: offer instant, secure payout systems that build trust between farmers and buyers"
];

const Research = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-sm tracking-[0.4em] text-secondary uppercase">Research & Results</span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Evidence that Farmers Are Ready for Change</h1>
          <p className="text-lg text-muted-foreground">
            Our research investigates the economic, behavioral, and logistical barriers that keep farmers dependent on stubble burning
            and maps the exact interventions required to unlock a new circular economy across Punjab.
          </p>
        </section>

        {/* Objectives */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-primary">Objectives and Aims</h2>
            <p>
              Our field surveys across Punjab explored how farmers think about selling crop residue, the prices they expect,
              and the kind of support systems they would actually use. The study dissects the economic, behavioral, and logistical
              barriers that keep them dependent on burning despite government incentives and penalties.
            </p>
            <p>
              We focused on understanding their willingness to engage with buyers, how transportation and payment reliability influence decisions,
              and the role of digital tools in simplifying participation.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-large">
            <img src={summaryVisualAlt} alt="Research field work" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Summary of Findings */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-large">
            <img src={summaryVisual} alt="Summary of findings" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Summary of Findings</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              {findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <p>{finding}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Insight */}
        <section className="bg-secondary/10 border border-secondary/30 rounded-2xl p-8 md:p-12 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-secondary mx-auto" />
          <h3 className="text-2xl font-bold text-secondary">Key Insight</h3>
          <p className="text-lg max-w-3xl mx-auto">
            <strong>Farmers are not unwilling — they are unequipped.</strong> Stubble burning persists not because of resistance
            but because a structured market to connect supply with demand still does not exist.
          </p>
        </section>

        {/* Access paper */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-primary">Access the Full Research Paper</h2>
          <p className="text-muted-foreground">
            Dive into the complete survey instrument, statistical analysis, and extended recommendations for policymakers.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="gradient-green text-primary-foreground">
                <Download className="w-4 h-4 mr-2" /> Download Research Paper PDF
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Download unavailable</AlertDialogTitle>
                <AlertDialogDescription>
                  The research paper PDF is not ready yet. Check back soon for the full publication.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Okay</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>

        {/* Outline */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary text-center">Research Paper Outline</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {outline.map((item) => (
              <Card key={item.title} className="p-6 hover:shadow-large transition-smooth">
                <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Analytics table */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary text-center">Research Analytics Summary</h2>
          <div className="overflow-x-auto shadow-medium rounded-2xl">
            <table className="w-full text-left">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="p-4 text-sm font-semibold">Theme</th>
                  <th className="p-4 text-sm font-semibold">Key Insights</th>
                  <th className="p-4 text-sm font-semibold">Implications</th>
                </tr>
              </thead>
              <tbody className="bg-card text-sm">
                {analyticsRows.map((row, index) => (
                  <tr key={row.theme} className={index % 2 === 1 ? "bg-muted/40" : undefined}>
                    <td className="p-4 font-semibold text-foreground">{row.theme}</td>
                    <td className="p-4 text-muted-foreground">{row.insight}</td>
                    <td className="p-4 text-muted-foreground">{row.implication}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Summary Insight */}
        <section className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Summary Insight</h2>
          <p className="text-lg opacity-90">
            Farmers are willing participants in a cleaner, circular agricultural economy — but systemic inefficiencies prevent them from acting.
            Price assurance, logistics infrastructure, and trust-building mechanisms form the core pillars of any sustainable stubble management strategy.
          </p>
        </section>

        {/* Goals & Recommendations */}
        <section className="grid lg:grid-cols-[3fr_2fr] gap-10 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Project Goals</h2>
              <div className="space-y-3 text-lg text-muted-foreground">
                {projectGoals.map((goal, index) => (
                  <div key={goal} className="flex items-start gap-3">
                    <span className="text-secondary font-semibold">{index + 1}.</span>
                    <p>{goal}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Policy Recommendations</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {policyRecommendations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-large">
            <img src={goalsVisual} alt="Goals and recommendations" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Long-term vision */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-large">
            <img src={visionVisual} alt="Long-term vision" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-4 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-primary">Long-Term Vision</h2>
            <p>
              The goal is to transform Punjab from a region grappling with seasonal pollution into a flagship example of circular agriculture
              where every straw of residue becomes a source of value, not smog. Coordinated action between farmers, industries, and policymakers
              can build a transparent supply chain in which trading stubble is as routine as selling any farm commodity.
            </p>
            <p>
              With the right incentives, logistics, and technology, we can permanently replace burning with profitable, climate-positive alternatives.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link to="/contact">
                <Target className="w-4 h-4 mr-2" /> Join the Mission
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Research;
