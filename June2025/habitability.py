# what's all this then????
# this script calculates a habitability percentage score (0–100%) for each exoplanet.
# it uses Earth-like benchmarks for temperature, stellar energy, mass, radius, etc.
# each feature is scored with a custom function that rewards "just right" values.
# weighted averages then combine those into a final score.
# the output Excel file then adds a new column: 'habitability_percent'.

import pandas as pd

df = pd.read_excel("planetary systems cleansed.xlsx", sheet_name="Sheet1")

# scoring - how close each feature is to ideal (Earth-like) values

def score_eqt(teq):
    # ideal equilibrium temperature is ~288K (Earth-like)
    if pd.isna(teq): return 0
    return max(0, 1 - abs(teq - 288) / 100)

def score_insol(insol):
    # ideal insolation is ~1 Earth unit; beyond ±0.5 gets penalised
    if pd.isna(insol): return 0
    return max(0, 1 - abs(insol - 1) / 0.5)

def score_orbeccen(ecc):
    # lower orbital eccentricity means more stable climate
    if pd.isna(ecc): return 0
    return max(0, 1 - ecc / 0.3)

def score_rade(rade):
    # ideal radius close to Earth's (1 R_earth)
    if pd.isna(rade): return 0
    return max(0, 1 - abs(rade - 1) / 1.5)

def score_masse(masse):
    # ideal mass is around 1 Earth mass; 0.5–5 is the tolerable range
    if pd.isna(masse): return 0
    return max(0, 1 - abs(masse - 1) / 4)

def score_teff(teff):
    # ideal stellar temperature close to Sun's ~5778K
    if pd.isna(teff): return 0
    return max(0, 1 - abs(teff - 5778) / 2000)

def score_lum(lum):
    # ideal stellar luminosity is around 1 (like the Sun)
    if pd.isna(lum): return 0
    return max(0, 1 - abs(lum - 1) / 1.5)

# feature weights
weights = {
    'eqt': 0.3,
    'insol': 0.2,
    'ecc': 0.15,
    'rade': 0.1,
    'masse': 0.1,
    'teff': 0.1,
    'lum': 0.05
}

# Main function to compute habitability score using weighted feature scores
def compute_habitability(row):
    scores = {
        'eqt': score_eqt(row['pl_eqt']),
        'insol': score_insol(row['pl_insol']),
        'ecc': score_orbeccen(row['pl_orbeccen']),
        'rade': score_rade(row['pl_rade']),
        'masse': score_masse(row['pl_masse']),
        'teff': score_teff(row['st_teff']),
        'lum': score_lum(row['st_lum']),
    }
    # Weighted average
    habitability = sum(scores[feat] * weights[feat] for feat in weights)
    return round(habitability * 100, 2)  # Scale to percentage

# filter out rows with too many missing values >2
df['null_count'] = df[['pl_eqt', 'pl_insol', 'pl_orbeccen', 'pl_rade', 'pl_masse', 'st_teff', 'st_lum']].isnull().sum(axis=1)
df['habitability_percent'] = df.apply(lambda row: compute_habitability(row) if row['null_count'] <= 2 else None, axis=1)
df.drop(columns=['null_count'], inplace=True)

# Fill planets that didn't get a score with a clear label
df['habitability_percent'] = df['habitability_percent'].fillna("Not enough data")

# Save to new Excel file
df.to_excel("planetary systems with habitability.xlsx", index=False)
