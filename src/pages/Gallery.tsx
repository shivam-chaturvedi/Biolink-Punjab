import { useMemo, useState } from "react";

const heroBackground = "/images/hero-background.jpg";
const problemImage = "/images/problem-image.png";
const researchField = "/images/research-field.png";
const farmerPortrait = "/images/Farmer-buyer handshake.jpg";
const mustardField = "/images/mustard-field.jpg";
const goalsImage = "/images/goals-image.png";

const galleryItemsData = [
  {
    title: "Aerial Field Views",
    description: "Vast farmlands of Punjab during harvest season",
    image: heroBackground,
    category: "Landscapes",
  },
  {
    title: "Stubble Burning Impact",
    description: "Understanding the environmental challenge",
    image: problemImage,
    category: "Environmental",
  },
  {
    title: "Field Research",
    description: "Conducting surveys with Punjab farmers",
    image: researchField,
    category: "Research",
  },
  {
    title: "Community Collaboration",
    description: "Farmers and buyers aligning on sustainable goals",
    image: farmerPortrait,
    category: "People",
  },
  {
    title: "Mustard Fields",
    description: "Vibrant agricultural diversity in Punjab",
    image: mustardField,
    category: "Landscapes",
  },
  {
    title: "Project Goals",
    description: "Vision for a sustainable future",
    image: goalsImage,
    category: "Infographics",
  },
];

const Gallery = () => {

  const categories = ["All", "Landscapes", "People", "Research", "Environmental", "Infographics"];
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return galleryItemsData;
    }
    return galleryItemsData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-primary">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visual journey through Punjab's fields, farmers, and our mission for sustainable agriculture
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border transition-smooth ${
                activeCategory === category
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-medium hover:shadow-large transition-smooth cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                <div className="text-primary-foreground">
                  <div className="text-sm font-semibold mb-1 text-secondary">{item.category}</div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <section className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12">Impact in Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">7M+</div>
                <p className="opacity-90">Tonnes of stubble annually</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">90%</div>
                <p className="opacity-90">Farmers willing to sell</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">60%</div>
                <p className="opacity-90">Air pollution reduction potential</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">100%</div>
                <p className="opacity-90">Commitment to sustainability</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="mt-16 max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-primary-light italic leading-relaxed">
            "Every field has a story. Every farmer has a dream. Together, we're writing a cleaner, greener chapter for Punjab."
          </blockquote>
          <p className="mt-6 text-lg text-muted-foreground">— Samaira Sapra, Founder</p>
        </section>
      </div>
    </div>
  );
};

export default Gallery;
