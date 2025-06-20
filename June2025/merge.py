import pandas as pd

df_full = pd.read_excel("planetary systems with habitability.xlsx")      # The complete spreadsheet
df_cut = pd.read_excel("planetary_clusters_labeled.xlsx")   # The one with habitability + cluster info

# merge cluster info from df_cut into df_full using 'pl_name' as the key
df_merged = df_full.merge(
    df_cut[['pl_name', 'cluster', 'cluster_label']],
    on='pl_name',
    how='left'
)

df_merged.to_excel("full_with_clusters.xlsx", index=False)
