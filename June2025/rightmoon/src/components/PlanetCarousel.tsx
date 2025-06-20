
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlanetCard from "./PlanetCard";

interface Planet {
  pl_name: string;
  sy_snum?: number;
  sy_pnum?: number;
  pl_orbper?: number;
  pl_rade?: number;
  pl_masse?: number;
  pl_eqt?: number;
  discoverymethod?: string;
  disc_year_y?: number;
  habitability_percent?: number | string;
  cluster_label?: string;
  sy_dist?: number;
  st_teff?: number;
}

interface PlanetCarouselProps {
  planets: Planet[];
  title: string;
}

const PlanetCarousel = ({ planets, title }: PlanetCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, planets.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  if (planets.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-slate-800/50 border border-purple-500/30 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full bg-slate-800/50 border border-purple-500/30 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700/50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(planets.length / itemsPerView) * 100}%`
          }}
        >
          {planets.map((planet, index) => (
            <div 
              key={index} 
              className="flex-shrink-0"
              style={{ width: `${100 / planets.length}%` }}
            >
              <PlanetCard planet={planet} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanetCarousel;
