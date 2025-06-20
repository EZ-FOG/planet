
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PlanetCard from "../components/PlanetCard";
import { ChevronDown } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  const [planets, setPlanets] = useState([]);
  const [sortBy, setSortBy] = useState("habitability_percent");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetch("/planet_data.json")
    .then((res) => res.json())
    .then((data) => {
      // Filter based on the URL category and matching `cluster_label`
      const filtered = data.filter(
        (planet) =>
          (category === "coming-soon" && !planet.cluster_label) ||
          planet.cluster_label?.toLowerCase().replace(/\s+/g, "-") === category
      );

      setPlanets(filtered);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load planet data", err);
      setLoading(false);
    });
}, [category]);

const getCategoryInfo = (category: string) => {
  switch (category) {
    case "warm-gas-giants":
      return {
        title: "Warm Gas Giants",
        description: "Massive planets with thick atmospheres and high temperatures"
      };
    case "low-luminosity-small-planets":
      return {
        title: "Low-Luminosity Small Planets",
        description: "Small rocky planets orbiting dim stars"
      };
    case "temperate-small-planets":
      return {
        title: "Temperate Small Planets",
        description: "Earth-like planets in the habitable zone"
      };
    case "orbital-wildcards":
      return {
        title: "Orbital Wildcards",
        description: "Planets with unusual or extreme orbital characteristics"
      };
    case "coming-soon":
      return {
        title: "Coming Soon!",
        description: "New planet classifications are being analysed"
      };
    default:
      return null;
  }
};

const categoryInfo = getCategoryInfo(category || "");

  const sortOptions = [
    { value: "habitability_percent", label: "Habitability %" },
    { value: "pl_eqt", label: "Temperature" },
    { value: "sy_dist", label: "Distance" },
    { value: "disc_year_y", label: "Discovery Year" },
    { value: "pl_masse", label: "Mass" },
    { value: "pl_name", label: "Name" }
  ];
  
  const sortedPlanets = [...planets].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    // Handle null/undefined
    if (aVal === null || aVal === undefined) aVal = sortOrder === "desc" ? -Infinity : Infinity;
    if (bVal === null || bVal === undefined) bVal = sortOrder === "desc" ? -Infinity : Infinity;

    if (sortBy === "habitability_percent") {
      // Convert strings to floats
      const aNum = typeof aVal === "string" ? parseFloat(aVal) : aVal;
      const bNum = typeof bVal === "string" ? parseFloat(bVal) : bVal;

      // Handle NaN safely by pushing them to bottom or top based on sort order
      if (isNaN(aNum)) return sortOrder === "desc" ? 1 : -1;
      if (isNaN(bNum)) return sortOrder === "desc" ? -1 : 1;

      return sortOrder === "desc" ? bNum - aNum : aNum - bNum;
    }

    // String sorting
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortOrder === "desc" ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    }

    // Number sorting
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    }

    return 0;
});

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold">Category Not Found</h1>
            <p className="mt-4">The requested planet category does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="text-center py-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {categoryInfo.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {categoryInfo.description}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-lg border border-purple-500/20">
          <span className="text-gray-300 font-medium">Sort by:</span>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-700 border border-purple-500/30 rounded-lg px-4 py-2 text-white pr-8 focus:outline-none focus:border-purple-400"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          <div className="flex bg-slate-700 rounded-lg border border-purple-500/30 overflow-hidden">
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                sortOrder === "desc" 
                  ? "bg-purple-600 text-white" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              High to Low
            </button>
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                sortOrder === "asc" 
                  ? "bg-purple-600 text-white" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Low to High
            </button>
          </div>

          <span className="text-gray-400 text-sm ml-auto">
            {planets.length} planet{planets.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <p className="text-gray-300 mt-4">Loading planets...</p>
          </div>
        )}

        {/* Planets Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPlanets.map((planet, index) => (
              <PlanetCard key={index} planet={planet} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && planets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No planets found in this category yet.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
