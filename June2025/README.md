# Habitability 

Please note that I didn’t try to predict habitability for planets with missing or incomplete data - I focused only on entries with high-quality, complete information. That probably introduced some bias toward “safe,” moderate habitability scores, and may have excluded some of the most extreme or interesting cases (which sadly just didn’t have enough data to go on).

This definitely isn’t a scientifically validated model, but I did my best to make it as accurate and thoughtful as possible using the information available. If you’re curious about more of the visualisations or want deeper dives into the stats, I’d be happy to share those too!

I assigned all planets (with sufficient data) a 0-100% habitability score based on how Earth-like it is across key features. In the habitability.py, you'll see this checks how close each planet's conditions are to known life-friendly ranges across seven traits:

- Equilibrium Temp (~288 K) to support liquid water
- Insolation, Flux, (~1 Earth unit) so there's an energy balance similar to Earth
- Orbital Eccentricity near 0 for stable seasons/climate
- Radius ~1 Earth radius for surface gravity and atmosphere retention
- Mass ~Earth mass for gravity/atmosphere/geologic activity
- Star Temperature ~5778 K so it's on the Earth-like radiation spectrum
- Star Luminosity ~1 solar unit since this affects the habitable zone range

Each feature is given a score between 0 and 1 based on how close it is to Earth's features and planets missing data >2 features are excluded.

I adjusted the weightings a couple of times but ultimately settled on: 
- Temperature (30%)
- Stellar energy received (20%)
- Orbital eccentricity (15%)
- Radius, mass, and star properties (the other 35%)
To weigh the most important factors more heavily, which resulted in a percentage score where higher = more likely to support life as we know it.

As mentioned, I have no qualifications in anything to do with space and don't claim this is scientifically accurate. 

I did notice researchers tended to score planets slightly differently to how I've attempted to here (likely more accurate!!) so thought I'd also include some small notes: 
- TRAPPIST-1d is ranked the highest in the dataset (75.2%) due to its Earth-like temperature, flux, and size (assuming it has a temperate atmosphere)
- TRAPPIST-1e and f score lower despite being quoted as likely more habitable due to colder climate/being further from their star's optimal zone/
- Kepler-452b is frequently quoted in the media but is scored (55.6%) here due to uncertain mass and being further from Earth-like conditions. Again I've prioritised known/confirmed properties over missing/speculative estimates.

Thanks!! and feel free to reach out if you have any corrections/suggestions/anything else :)
