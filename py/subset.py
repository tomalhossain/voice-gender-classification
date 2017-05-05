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

#print (read_data)

# Raw data frame
raw_df = pd.DataFrame(read_data, columns=dataHeader)

every_fifth_row_df = raw_df.iloc[::N, :]

# Write processed data to CSV
every_fifth_row_df.to_csv('voice-gender-subset.csv')