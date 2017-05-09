import csv
import pandas as pd
import numpy as np 

# N = int(input("Input binning interval"))

read_data = []

with open('voice-gender.csv', 'r') as read_file:
	reader = csv.reader(read_file)
	for row in reader:
		read_data.append(row)
	dataHeader = read_data.pop(0)

# Raw data frame
raw_df = pd.DataFrame(read_data, columns=dataHeader, dtype=float)
no_label_df = raw_df.drop('label', axis=1)

fields = dataHeader
fields.remove('label')

correlations = raw_df.corr()


# Write processed data to CSV
correlations.to_csv('voice-gender-correlations.csv')