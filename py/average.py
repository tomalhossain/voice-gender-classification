import csv
import pandas as pd
import numpy as np 

N = int(input("Input averaging interval"))

read_data = []

with open('voice-gender.csv', 'r') as read_file:
	reader = csv.reader(read_file)
	for row in reader:
		read_data.append(row)
	dataHeader = read_data.pop(0)

# Raw data frame

raw_df = pd.DataFrame(read_data, columns=dataHeader, dtype=float)

print(raw_df)

average_rows = raw_df.groupby(np.arange(len(raw_df))//N).mean()
average_rows.round(2)

average_rows.to_csv('voice-gender-average.csv')