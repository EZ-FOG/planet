
import { MapPin, Thermometer, Calendar, Telescope } from "lucide-react";

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

interface PlanetCardProps {
  planet: Planet;
  onClick?: () => void;
}

const PlanetCard = ({ planet, onClick }: PlanetCardProps) => {
  const getHabitabilityColor = (habitability: number | string) => {
    const value = typeof habitability === 'string' ? parseFloat(habitability) : habitability;
    if (isNaN(value)) return 'text-gray-400';
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    if (value >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const formatHabitability = (habitability: number | string) => {
    const value = typeof habitability === 'string' ? parseFloat(habitability) : habitability;
    if (isNaN(value)) return habitability; // fallback if not a number
    return `${value.toFixed(1)}%`;
  };


  return (
    <div 
      className="bg-slate-800/50 border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Planet Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-purple-600/30 to-blue-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors">
            {planet.pl_name}
          </h3>
          {planet.cluster_label && (
            <span className="text-purple-300 text-sm">{planet.cluster_label}</span>
          )}
        </div>
      </div>

      {/* Planet Details */}
      <div className="p-4 space-y-3">
        {/* Habitability Score */}
        {planet.habitability_percent && (
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Habitability Score</span>
            <span className={`font-bold ${getHabitabilityColor(planet.habitability_percent)}`}>
              {formatHabitability(planet.habitability_percent)}
            </span>
          </div>
        )}

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {planet.sy_dist && (
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-purple-400" />
              <span className="text-gray-300">{planet.sy_dist.toFixed(1)} ly</span>
            </div>
          )}

          {planet.pl_eqt && (
            <div className="flex items-center space-x-2">
              <Thermometer size={16} className="text-blue-400" />
              <span className="text-gray-300">{planet.pl_eqt.toFixed(0)}K</span>
            </div>
          )}

          {planet.disc_year_y && (
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-green-400" />
              <span className="text-gray-300">{planet.disc_year_y}</span>
            </div>
          )}

          {planet.sy_pnum && (
            <div className="flex items-center space-x-2">
              <Telescope size={16} className="text-yellow-400" />
              <span className="text-gray-300">{planet.sy_pnum} planets</span>
            </div>
          )}
        </div>

        {/* Discovery Method */}
        {planet.discoverymethod && (
          <div className="pt-2 border-t border-purple-500/20">
            <span className="text-xs text-gray-400">Discovered via {planet.discoverymethod}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetCard;
