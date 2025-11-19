import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const problemImage = "/images/problem-image.png";
const researchField = "/images/research-field.png";
const mustardField = "/images/mustard-field.jpg";
const farmerPortrait = "/images/farmer-portrait.jpg";

const Blog = () => {
  const blogPosts = [
    {
      title: "Why Punjab Still Burns Stubble – The Missing Market",
      excerpt: "Despite government subsidies and penalties, stubble burning continues. The real issue isn't farmer resistance—it's the absence of a structured, profitable market.",
      author: "Samaira Sapra",
      date: "November 10, 2025",
      image: problemImage,
      readTime: "5 min read"
    },
    {
      title: "How a Circular Economy Can Transform North India",
      excerpt: "Exploring how converting agricultural waste into valuable resources can create jobs, reduce pollution, and establish sustainable economic cycles.",
      author: "Samaira Sapra",
      date: "November 8, 2025",
      image: mustardField,
      readTime: "7 min read"
    },
    {
      title: "Survey Insights: What Farmers Really Want",
      excerpt: "Deep dive into our field research revealing that 90% of farmers burn stubble yet 100% are willing to sell if given fair prices and logistics support.",
      author: "Samaira Sapra",
      date: "November 5, 2025",
      image: researchField,
      readTime: "6 min read"
    },
    {
      title: "Can Digital Tools Solve Agricultural Waste Issues?",
      excerpt: "How technology bridges the gap between farmers and buyers, creating transparent marketplaces that benefit all stakeholders in the supply chain.",
      author: "Samaira Sapra",
      date: "November 1, 2025",
      image: farmerPortrait,
      readTime: "4 min read"
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-primary">Blog & News</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, research findings, and updates on sustainable stubble management
          </p>
        </div>

        {/* Featured Post */}
        <section className="mb-16">
          <Card className="overflow-hidden hover:shadow-large transition-smooth">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-[400px]">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-primary">
                  {blogPosts[0].title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <Button className="gradient-green text-primary-foreground w-fit">
                  Read Full Article
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Blog Grid */}
        <section className="mb-16">
          <h2 className="mb-8 text-primary">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-large transition-smooth">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="bg-muted rounded-2xl p-8 md:p-12">
          <h2 className="text-center mb-8 text-primary">Browse by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button variant="outline" className="h-auto py-4 text-center hover:bg-primary hover:text-primary-foreground">
              Research & Insights
            </Button>
            <Button variant="outline" className="h-auto py-4 text-center hover:bg-primary hover:text-primary-foreground">
              Farmer Stories
            </Button>
            <Button variant="outline" className="h-auto py-4 text-center hover:bg-primary hover:text-primary-foreground">
              Sustainability
            </Button>
            <Button variant="outline" className="h-auto py-4 text-center hover:bg-primary hover:text-primary-foreground">
              Technology
            </Button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-16 bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h2 className="mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest research, market updates, and sustainability insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button className="gradient-warm text-secondary-foreground hover:opacity-90">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
