import { getElectricalRecordEntry,
    getElectricalRecordEntries,
    getNaturalGasRecordEntries,
    getOutsideTempRecordEntries,
    getWaterRecordEntries,
    getElectricalRecordEntriesByDate
    } from '../services/supabaseQueries.js';

async function getRecordsByDate() {
    //let testDate = new Date('2017-04-21 13:20:00.0000000')
    let recordsData = [];
    let testDate1 = new Date('2017-04-21')
    let testDate2 = new Date('2017-04-22')
    //testDate1.setDate(testDate1.getDate() - 7) get last week
    //testDate1.setMonth(testDate1.getMonth() - 1) get last month
    testDate1 = testDate1.toISOString()
    testDate2 = testDate2.toISOString()
    console.log(testDate1, testDate2)
    const { data, error } = await getElectricalRecordEntriesByDate(testDate1, testDate2)
    if (data){
        if (data.length > 0){
            for (let i = 0; i < data.length; i++){
                console.log("\nreturned data:\n", data)
            const { id, created_at, recorded_at, building_record_id, amount, change } = data[i]
            let utcDate = new Date(recorded_at)
            let localDate = utcDate
            localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset())
            let entryObject = {
                recorded_at: localDate,
                amount: amount,
                change: change
            }
            recordsData.push(entryObject)
            }
        } else{
            console.log("No entries")
        }
    } else{
        console.log("Error:", error)
    }
    console.log(recordsData)
}

async function makesureEachEntryIsSinglular(){
    const tableNames = [
        'Electrical Records', 
        'Natural Gas Records', 
        'Outside Temp Records', 
        'Water Records',
        'Settings'
    ]    
    let entries = []
    let duplicateList = []

    let { data1, error1 } = await getElectricalRecordEntries()
    let { data2, error2 } = await getNaturalGasRecordEntries()
    let { data3, error3 } = await getOutsideTempRecordEntries()
    let { data4, error4 } = await getWaterRecordEntries()

    entries.push(data1)
    entries.push(data2)
    entries.push(data3)
    entries.push(data4)

    if (data1 && data2 && data3 && data4){
        for (let j = 0; j < entries.length; j++){
            let data = entries[j]
            let dataSet = new Set()
            let duplicates =[]
            for (let i=0; i < data.length; i++) {
                const { recorded_at, amount } = data[i]
                if (!dataSet.has(recorded_at)){
                    dataSet.add(recorded_at)
                } else{
                    duplicates.push(recorded_at)
                }
            }     
            duplicateList.push(duplicates)
        }
    }
    console.log(duplicateList)

}

getRecordsByDate()
// makesureEachEntryIsSinglular()