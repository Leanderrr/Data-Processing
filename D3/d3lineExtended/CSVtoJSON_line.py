import csv
import json
from sys import exc_info

csvfile = open('KNMI2015wind.csv', 'r')

jsonfile = open('wind.json', 'w')
jsonfile.write("{")

ignore = ["STN"]
reader = csv.DictReader(csvfile)
skipped = 0
count = 0
currentPlace = "bla"
placeCode = {"270":"Leeuwarden","319":"Westdorpe"} # codes from the KNMI website
place = 1


for row in reader:
    count += 1
    try:
        # New library for new place
        if row["STN"] != currentPlace:
            if place != 1:
                jsonfile.write("],") # close previous place library
            jsonfile.write('\n"{}" : ['.format(placeCode[row["STN"]]))
            currentPlace = row["STN"]
            place += 1
        else: # Close previous line
            jsonfile.write(",\n")

        # New line
        print(row)
        jsonfile.write('{{"date" : "{0}", "lGem" : "{1}", "hGem" : "{2}", "hStoot" : "{3}"}}'
                       .format(row["YYYYMMDD"], row["FHN"], row["FHX"], row["FXX"]))
        # json.dump(row, jsonfile) # dump everything of this line into file

    except AttributeError as err:
        print(err)
        skipped += 1
    except ValueError as err:
        print(err)
        skipped += 1
    except:
        print("{}".format(exc_info()))
        skipped += 1


jsonfile.write("]}")
print("skipped {} of {} lines".format(skipped, count))
print("done")

if skipped > 0:
    "file may not work because of too many comma's and linebreaks"