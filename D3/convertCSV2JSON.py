"""
converts the CSV file into a JavaScript Object Notation file that is to be inbedded into the HTML.

loads CSV file and reads it line by line, if number data is found, the formatted line is written to JSON file.

Leander de Kraker
2016-11-23
"""
CSV = []

filename = "KNMI_20151231.txt"

saveName = "KNMI_maxvis.json"
saveFile = open(saveName, 'w')
saveFile.write('{\n"points" : [\n')
counter = 0

with open(filename) as file:
    for line in file:
        counter += 1
        CSV.append(line.split(','))
        try:
            Data = CSV[-1][2][:-1]
            Date = CSV[-1][1]
            print("line {}: {}. {}".format(counter,Date,Data))
            try:
                Data = int(Data)
                saveFile.write('{"date": "%s" , "data": "%s"},\n' % (Date, Data))
            except:
                print("didn't write line: '{}'".format(CSV[-1]))
        except:
            print("didn't split line {}: {}".format(counter, CSV[-1]))

saveFile.write("]}")
saveFile.close()