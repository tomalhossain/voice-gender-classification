import csv
import pandas as pd
import numpy as np 

N = int(input("Input subsetting interval"))

read_data = []

with open('voice-gender.csv', 'r') as read_file:
	reader = csv.reader(read_file)
	for row in reader:
		read_data.append(row)
	dataHeader = read_data.pop(0)

# Raw data frame
raw_df = pd.DataFrame(read_data, columns=dataHeader, dtype=float)
no_label_df = raw_df.drop('label', axis=1)

every_nth_row_df = raw_df.iloc[::N, :]

# Write processed data to CSV
every_nth_row_df.to_csv('voice-gender-subset.csv')