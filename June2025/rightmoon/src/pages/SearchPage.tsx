import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import PlanetCard from "../components/PlanetCard";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/planet_data.json")
      .then((res) => res.json())
      .then((data) => {
        if (query) {
          // Filter planets by name, case-insensitive
          const filteredResults = data.filter((planet: any) =>
            planet.pl_name?.toLowerCase().includes(query.toLowerCase())
          );
          setResults(filteredResults);
        } else {
          setResults([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load planet data", err);
        setResults([]);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center py-8 space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Search className="text-purple-400" size={32} />
            <h1 className="text-4xl font-bold text-white">Search Results</h1>
          </div>
          {query && (
            <p className="text-xl text-gray-300">
              Results for: <span className="text-purple-400 font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
            <p className="text-gray-300 mt-4">Searching through the galaxy...</p>
          </div>
        )}

        {/* Results */}
        {!loading && query && (
          <>
            <div className="mb-6">
              <p className="text-gray-400">
                Found {results.length} planet{results.length !== 1 ? 's' : ''} matching your search
              </p>
            </div>

            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((planet, index) => (
                  <PlanetCard key={index} planet={planet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="text-gray-400 text-lg">
                  No planets found matching "{query}"
                </div>
                <p className="text-gray-500">
                  Try searching for a different planet name or browse our categories instead.
                </p>
              </div>
            )}
          </>
        )}

        {/* No Query State */}
        {!loading && !query && (
          <div className="text-center py-12 space-y-4">
            <div className="text-gray-400 text-lg">
              Enter a planet name in the search bar to find specific worlds.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
