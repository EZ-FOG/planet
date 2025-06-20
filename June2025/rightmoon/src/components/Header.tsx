
import { Search, Home, BarChart3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: "Warm Gas Giants", path: "/category/warm-gas-giants" },
    { name: "Low-Luminosity Small", path: "/category/low-luminosity-small-planets" },
    { name: "Temperate Small", path: "/category/temperate-small-planets" },
    { name: "Orbital Wildcards", path: "/category/orbital-wildcards" },
    { name: "Coming Soon!", path: "/category/coming-soon" }
  ];

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">RM</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              RightMoon
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/visualizations" 
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
            >
              <BarChart3 size={18} />
              <span>Insights</span>
            </Link>
          </nav>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search planets by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
            />
          </div>
        </form>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-gray-300 hover:text-white hover:border-purple-400 transition-all duration-200 text-sm"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
