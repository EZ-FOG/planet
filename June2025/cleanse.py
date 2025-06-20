import pandas as pd # imports pandas library to handle excel files and dataframes

df = pd.read_excel("planetary systems.xlsx", sheet_name="12-06-2025") # reads specific sheet and stores in pandas dataframe called df

# chose median because it is more robust to outliers
agg_df = df.groupby("pl_name", as_index=False).median(numeric_only=True) # groups the rows by planet name, calculates the median of all numeric columns for each group
# median(numeric_only=True) ensures only number columns are aggregated (avoiding errors on strings or NaNs)

# Keep relevant metadata from first entry per planet
metadata_cols = df.groupby("pl_name", as_index=False).first()[["pl_name", "discoverymethod", "disc_year", "disc_facility"]]
# Merge the metadata back into the median-aggregated numeric data
agg_df = agg_df.merge(metadata_cols, on="pl_name", how="left")

# Save the cleansed data to a new Excel file
agg_df.to_excel("planetary systems cleansed.xlsx", index=False)
