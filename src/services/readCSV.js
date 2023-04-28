import * as fs from 'fs';
import { parse } from 'csv-parse'
import { createElectricalRecordEntry, 
    createNaturalGasRecordEntry, 
    createOutsideTempRecordEntry, 
    createWaterRecordEntry} from '../services/supabaseQueries.js';

// Subject to change, hardcoded right now due to the server not being up
const electricalRecordsPath = "../../public/csvFiles/ElectricalRecords.csv"
const naturalGasRecordsPath = "../../public/csvFiles/NaturalGasRecords.csv"
const outsideTempRecordsPath = "../../public/csvFiles/OutsideTempRecords.csv"
const waterRecordsPath = "../../public/csvFiles/WaterRecords.csv"

// sendElectricalRecord is seperate from the other function due to its data being different
async function readCSV(csvPath){
    const data = [];

    fs.createReadStream(csvPath)
      .pipe(
        parse({
          delimiter: ",",
          columns: true,
          ltrim: true,
        })
      )
      .on("data", function (row) {
        // This will push the object row into the array
        data.push(row);
      })
      .on("error", function (error) {
        // Console log error problem encountered
        console.log(error.message);
      })
      .on("end", async function () {
        // Here log the result array
        console.log("parsed csv data from:", csvPath);

        for (let i = 0; i < data.length; i++){
          if (csvPath == electricalRecordsPath){
              const {RecordedDateTime, BuildingRecordId, Amount, Change } = data[i]
              let recordedDateTime = new Date(RecordedDateTime) // UTC time
              recordedDateTime = recordedDateTime.toISOString()
              let buildingId = parseInt(BuildingRecordId)
              let amount = parseFloat(Amount)
              let change = parseFloat(Change)

              let error = null
              error = await createElectricalRecordEntry(recordedDateTime, buildingId, amount, change)
              if (error) { console.log(error) }
          } else {
              const {RecordedDateTime, BuildingRecordId, Amount} = data[i]
          
              let recordedDateTime = new Date(RecordedDateTime) // UTCtime
              recordedDateTime = recordedDateTime.toISOString()
              let buildingId = parseInt(BuildingRecordId)
              let amount = parseFloat(Amount)
                    
              let error = null
              switch(csvPath){
                  case naturalGasRecordsPath:
                      error = await createNaturalGasRecordEntry(recordedDateTime, buildingId, amount)
                      break;
                  case outsideTempRecordsPath:
                      error = await createOutsideTempRecordEntry(recordedDateTime, buildingId, amount)
                      break;
                  case waterRecordsPath:
                      error = await createWaterRecordEntry(recordedDateTime, buildingId, amount)
                      break;
              }
              if (error) { console.log(error) }
          }
        }
    });
}


// Not sure how and where this will be hosted yet, for now it is set up as a function
readCSV(electricalRecordsPath)
readCSV(naturalGasRecordsPath)
readCSV(outsideTempRecordsPath)
readCSV(waterRecordsPath)

