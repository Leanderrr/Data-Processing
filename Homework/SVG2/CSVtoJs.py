"""
converts the CSV file into a JavaScript Object Notation file that is to be inbedded into the HTML.

loads CSV file and reads it line by line, if number data is found, the formatted line is written to JSON file.

Leander de Kraker
2016-11-18
"""
CSV = []

filename = "Forest_Data_World.csv"

saveName = "JSON_Forest_Data.json"
saveFile = open(saveName, 'w')
saveFile.write('"points" : [\n')

with open(filename) as file:
    for line in file:
        CSV.append(line.split(','))
        forestData = CSV[-1][-1][:-2]
        name = CSV[-1][2].strip('"')
        try:
            float(forestData)
            saveFile.write('{"country": "%s" , "data": "%s"},\n' % (name, forestData))
        except:
            print("didn't write line: '{}'".format(CSV[-1]))

saveFile.write("]")
saveFile.close()