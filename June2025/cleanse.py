import pandas as pd 

df = pd.read_excel("planetary systems.xlsx", sheet_name="12-06-2025") 

# chose median because it is more robust to outliers
# this groups the rows by planet name and calculates the median of all numeric columns for each group
# side note // median(numeric_only=True) ensures only number columns are aggregated (avoiding errors on strings or NaNs
agg_df = df.groupby("pl_name", as_index=False).median(numeric_only=True)

# keep relevant metadata from first entry per planet
metadata_cols = df.groupby("pl_name", as_index=False).first()[["pl_name", "discoverymethod", "disc_year", "disc_facility"]]
# merge the metadata back into the median-aggregated numeric data
agg_df = agg_df.merge(metadata_cols, on="pl_name", how="left")

agg_df.to_excel("planetary systems cleansed.xlsx", index=False)
