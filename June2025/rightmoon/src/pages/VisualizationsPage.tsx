import Header from "../components/Header";
import { BarChart3, TrendingUp, Globe, Zap } from "lucide-react";

const VisualizationsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center py-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Data Insights & Visualisations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            An exploratory dive into exoplanet habitability, using clustering and visualisations to uncover patterns in planetary 
            and stellar features</p>
        </div>

        {/* Preface */}
        <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Before you explore...</h2>
          <div className="space-y-4 text-gray-300">
            <p>
                Please note that I didn’t try to predict habitability for planets with missing or incomplete data - I focused only 
                on entries with high-quality, complete information. That probably introduced some bias toward “safe,” moderate 
                habitability scores, and may have excluded some of the most extreme or interesting cases (which sadly just didn’t 
                have enough data to go on).            
            </p>
            <p>
                This definitely isn’t a scientifically validated model, but I did my best to make it as 
                accurate and thoughtful as possible using the information available. If you’re curious about more of the 
                visualisations or want deeper dives into the stats, I’d be happy to share those too!
            </p>
          </div>
        </div>

        {/* Visualisation Sections */}
        <div className="space-y-12">

          {/* Shared Section Component */}
          {[
            {
              title: "Distribution of Habitability Percentages",
              icon: <TrendingUp className="text-purple-400" size={24} />,
              imgSrc: "/distribution.png",
              text: (
                <>
                  <p className="text-gray-300 mb-4">
                    This graph shows how the habitability percentages are distributed across the dataset.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Most planets fall into the 20%–30% habitability range - 
                      nothing too exciting, but not zero either.</li>
                    <li>The distribution is right-skewed, meaning that 
                      high-habitability planets exist but they’re rare.</li>
                    <li>Very few planets score above 60%, which lines 
                      up with expectations that Earth-like conditions are 
                      uncommon.</li>
                  </ul>
                </>
              ),
              reverse: false,
            },
            {
              title: "Seaborn Pairplot (Feature Relationships)",
              icon: <Globe className="text-blue-400" size={24} />,
              imgSrc: "/pairplot.png",
              text: (
                <>
                  <p className="text-gray-300 mb-4">
                    This matrix shows how the key features relate to habitability 
                    (and to each other). A few things stood out:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Equilibrium temperature (pl_eqt): Planets around 250–400K 
                      show higher habitability, which makes sense, since Earth is ~255K.</li>
                    <li>Insolation flux (pl_insol): There’s a kind of sweet spot - 
                      habitability increases with flux up to a point, then drops 
                      (too much energy = too hot).</li>
                    <li>Orbital eccentricity (pl_orbeccen): Planets with low eccentricity
                      (0–0.2) tend to be more habitable. High-eccentricity orbits probably
                      lead to extreme seasons, which aren’t ideal for stable life.</li>
                    <li>Radius and mass: Smaller planets, closer in size to Earth, 
                      tend to score higher. Larger planets (likely gas giants) are mostly 
                      low habitability.</li>
                    <li>Stellar properties: Stars between 4000–6000K and with moderate 
                      luminosity seem to be in the habitability zone which is great, and 
                      similar to our Sun.</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    Also, as expected, there’s a clear correlation between radius and mass, 
                    and between stellar temp and luminosity which helped me weight them better 
                    in the habitability score.                  
                  </p>
                </>
              ),
              reverse: true,
            },
            {
              title: "Correlation Heatmap",
              icon: <Zap className="text-yellow-400" size={24} />,
              imgSrc: "/heatmap.png",
              text: (
                <>
                  <p className="text-gray-300 mb-4">
                    This shows how strongly each variable in linearly related to the others.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Eccentricity had the strongest (negative) relationship with habitability 
                      (r = –0.51). So: more “wobbly” orbits = lower chance of life.</li>
                    <li>Stellar temp and luminosity had weaker, positive correlations (r ~ 0.2), 
                      but still supported the idea that sun-like stars are good candidates.</li>
                    <li>Other variables (radius, mass, temp, insolation) had weak or 
                      near-zero linear correlations, but that doesn’t mean they’re irrelevant
                      - they likely just have nonlinear effects or are overshadowed by the 
                      dominance of non-habitable planets in the dataset.</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    The heatmap also helped confirm that pl_masse and pl_rade, and st_teff 
                    and st_lum, are fairly collinear - so I adjusted their weights in the 
                    scoring function accordingly.
                  </p>
                </>
              ),
              reverse: false,
            },
            {
              title: "Unsupervised Machine Learning - Planet Clusters (K-Means + PCA)",
              icon: <BarChart3 className="text-green-400" size={24} />,
              imgSrc: "/cluster.png",
              text: (
                <>
                  <p className="text-gray-300 mb-2">
                    Since we don’t have ground-truth “habitable” labels, I used K-means clustering 
                    to group planets based on their features. I filtered out any rows with missing 
                    data to keep the clustering clean and reliable.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Here’s what the PCA plot shows (each dot = a planet, each colour = a cluster). 
                    The axes are compressed combinations of all the input features.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li><strong>Low-Luminosity Small Planets (far left):</strong> These orbit dim stars, have low mass 
                      and temperature, and are mostly frozen and uninhabitable.</li>
                    <li><strong>Temperate Small Planets (centre):</strong> These are my Earth-like candidates - mid-sized, 
                      orbiting sun-like stars with moderate surface conditions. They tended to have the 
                      highest habitability scores.</li>
                    <li><strong>Warm Gas Giants (bottom right):</strong> Large planets with high mass/radius, often close 
                      to their stars. Pretty inhospitable, kind of like "hot Jupiters."</li>
                    <li><strong>Orbital Wildcards (top):</strong> This group had unusually high orbital eccentricity. 
                      They're a bit all over the place and may need extra filtering - could include 
                      some exotic or unstable systems.</li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    I’ve got more insights and visualisations (like boxplots for each cluster’s 
                    habitability), so feel free to ask if you’d like to see those.
                  </p>
                </>
              ),
              reverse: true,
            }
          ].map(({ title, icon, imgSrc, text, reverse }, i) => (
            <div
              key={i}
              className={`bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 flex flex-col md:flex-row${reverse ? '-reverse' : ''} gap-6 md:gap-8`}
            >
              <div className="md:w-1/2 aspect-[4/3] bg-slate-700/30 rounded-lg border border-purple-500/10 overflow-hidden">
                <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-4">
                  {icon}
                  <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
                {text}
              </div>
            </div>
          ))}

          {/* Future Work Section */}
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Future Research Directions</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <p>If I circle back to this project in future I'm planning on exploring:</p>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Increased Accuracy</h3>
                <p>How further feature engineering could improve predictions - e.g., incorporating
                  stellar age, metallicity, or atmospheric assumptions.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Habitability Distributions</h3>
                <p>Exploring habitability distributions more deeply through the boxplots per
                  cluster which are available.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-300 mb-2">Outlier Detection</h3>
                <p>Working on outlier detection which could refine/isolate the most extreme
                  Earth-like candidates for exploration.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default VisualizationsPage;
