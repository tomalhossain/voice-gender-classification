import csv
import pandas as pd
import numpy as np 

# N = int(input("Input binning interval"))

read_data = []
intervals = []
matrix = []

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

max_row_df = no_label_df.max() 
max_row_array = max_row_df.as_matrix()

for col in max_row_array:
	arr = (np.linspace(0, col, 10)).tolist()
	intervals.append(arr)


bin_names = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9' ]

i = 0	
while i < len(intervals):
	bins = intervals[i]
	raw_df[str(fields[i]) + 'categories'] = pd.cut(raw_df[fields[i]], bins, labels=bin_names)
	pd.value_counts(raw_df[str(fields[i]) + 'categories'])
	i = i + 1 

print (raw_df)

# Write processed data to CSV
raw_df.to_csv('voice-gender-categorized.csv')