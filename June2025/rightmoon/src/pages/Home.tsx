
import { useState, useEffect } from "react";
import Header from "../components/Header";
import PlanetCarousel from "../components/PlanetCarousel";
import { Link } from "react-router-dom";
import { Rocket, Globe, Star, Zap } from "lucide-react";

const Home = () => {
  const [featuredPlanets, setFeaturedPlanets] = useState([]);

const [planets, setPlanets] = useState([]);

useEffect(() => {
  fetch("/planet_data.json")
    .then((res) => res.json())
    .then((data) => setPlanets(data))
    .catch((err) => console.error("Failed to load planet data", err));
}, []);

  useEffect(() => {
    // Simulate loading featured planets
    setFeaturedPlanets(planets);
  }, []);

  const categories = [
    {
      name: "Warm Gas Giants",
      path: "/category/warm-gas-giants",
      icon: <Zap className="w-8 h-8" />,
      description: "Massive worlds with thick atmospheres",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Low-Luminosity Small Planets",
      path: "/category/low-luminosity-small-planets",
      icon: <Star className="w-8 h-8" />,
      description: "Dim, rocky worlds waiting to be explored",
      color: "from-blue-500 to-purple-500"
    },
    {
      name: "Temperate Small Planets",
      path: "/category/temperate-small-planets",
      icon: <Globe className="w-8 h-8" />,
      description: "Earth-like conditions for your perfect home",
      color: "from-green-500 to-blue-500"
    },
    {
      name: "Orbital Wildcards",
      path: "/category/orbital-wildcards",
      icon: <Rocket className="w-8 h-8" />,
      description: "Unique orbits for the adventurous",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Find Your Perfect Planet
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover extraordinary worlds across the galaxy. From temperate havens to orbital wildcards, 
            your dream planet awaits among the stars.
          </p>
          <Link 
            to="/category/temperate-small-planets"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <Rocket className="mr-2" size={20} />
            Start Exploring
          </Link>
        </section>

        {/* Featured Planets Carousel */}
        {featuredPlanets.length > 0 && (
          <section className="py-12">
            <PlanetCarousel 
              planets={featuredPlanets} 
              title="✨ Featured Planets" 
            />
          </section>
        )}

        {/* Category Grid */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Explore by Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group relative overflow-hidden rounded-xl bg-slate-800/50 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 p-6 hover:transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                <div className="relative z-10 text-center space-y-4">
                  <div className="text-purple-400 group-hover:text-white transition-colors mx-auto w-fit">
                    {category.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-12 text-center">
          <div className="bg-slate-800/30 border border-purple-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon!</h2>
            <p className="text-gray-300 mb-6">
              More planet categories are being discovered and classified. 
              Check back soon for new worlds to explore!
            </p>
            <Link 
              to="/category/coming-soon"
              className="inline-flex items-center px-6 py-3 bg-slate-700/50 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-slate-600/50 transition-colors"
            >
              View Coming Soon
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-400">5,000+</div>
              <div className="text-gray-300">Confirmed Exoplanets</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-400">4</div>
              <div className="text-gray-300">Planet Categories</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">50+</div>
              <div className="text-gray-300">Potentially Habitable</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">∞</div>
              <div className="text-gray-300">Possibilities</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
