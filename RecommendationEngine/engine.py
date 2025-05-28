import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def get_pf_index(sample, data):
  return int(sample["propertyFor"] == data["propertyFor"])

def get_price_index(sample, data):
  pct_range = 20
  pct_val = (sample["Price"] * pct_range) / 100
  range_list = [sample["Price"] - pct_val, sample["Price"] + pct_val]

  if range_list[0] >= data["Price"] or range_list[1] <= data["Price"]:
    return 0
  else:
    return 1

def get_area_index(sample, data):
  pct_range = 50
  pct_val = (sample["Area"] * pct_range) / 100
  range_list = [sample["Area"] - pct_val, sample["Area"] + pct_val]

  if range_list[0] >= data["Area"] or range_list[1] <= data["Area"]:
    return 0
  else:
    return 1

def get_recommendations(json_data, n_recommend, threshold=0.7):
  sample = json_data[0]
  X = []

  for prop in json_data:
    features = []
    pf_index = get_pf_index(sample, prop)
    price_index = get_price_index(sample, prop)
    area_index = get_area_index(sample, prop)
    features.append(pf_index)
    features.append(price_index)
    features.append(area_index)

    X.append(features)

  similarity_index = cosine_similarity(X)
  similar_to_first = similarity_index[0]

  property_mapping = {}

  for index, prop in enumerate(json_data):
    property_mapping[prop["id"]] = float(similar_to_first[index])
  
  recommendation = []

  for key in property_mapping.keys():
    if property_mapping[key] >= threshold:
      recommendation.append(key)
  
  return recommendation[1:n_recommend]