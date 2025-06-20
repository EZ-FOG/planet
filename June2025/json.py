import pandas as pd

df = pd.read_csv("full_with_clusters_copy.csv")

df.to_json("planet_data.json", orient="records", indent=2)
