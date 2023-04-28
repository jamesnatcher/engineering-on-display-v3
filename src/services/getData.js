import {
  getElectricalRecordEntriesByDate,
  getNaturalGasRecordEntriesByDate,
  getOutsideTempRecordEntriesByDate,
  getWaterRecordEntriesByDate,
} from "./supabaseRecordQueries.js";

function cleanUpEntry(date, amount) {
  let utcDate = new Date(date);
  let hourMinute = utcDate.toLocaleTimeString();
  hourMinute =
    hourMinute.slice(0, hourMinute.length - 6) +
    " " +
    hourMinute.slice(hourMinute.length - 2, hourMinute.length);
  let month =
    utcDate.getMonth() + 1 + "-" + utcDate.getDate() + " " + hourMinute;
  let fullYear = utcDate.getFullYear() + "-" + month;
  let entryObject = {
    recorded_at: utcDate,
    amount: amount,
    fullYear: fullYear,
    month: month,
    day: hourMinute,
  };

  return entryObject;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function aggregateDataBasedOnTime(dateRange, data) {
  let newDataArray = [];
  switch (dateRange) {
    case "Last Year":
      for (let i = 0; i < data.length; i++) {
        let entryDate = data[i].recorded_at;
        let fullYear =
          entryDate.getFullYear() + " " + monthNames[entryDate.getMonth()];
        let amount = data[i].amount;
        let entryObject = {
          fullYear: fullYear,
          amount: amount,
          count: 1,
          recorded_at: entryDate,
        };
        const isFound = newDataArray.findIndex(
          (entry) => entry.fullYear == fullYear
        );
        if (isFound > -1) {
          newDataArray[isFound].amount += entryObject.amount;
          newDataArray[isFound].count += 1;
        } else {
          newDataArray.push(entryObject);
        }
      }
      for (let i = 0; i < newDataArray.length; i++) {
        // Calculate the averages of the entries
        newDataArray[i].amount = newDataArray[i].amount / newDataArray[i].count;
        // Fix the significant figures of the entries
        newDataArray[i].amount = newDataArray[i].amount.toFixed(2);
        // Convert it back to float format
        newDataArray[i].amount = parseFloat(newDataArray[i].amount);
      }
      break;
    case "Last Month":
      for (let i = 0; i < data.length; i++) {
        let entryDate = data[i].recorded_at;
        let month = entryDate.getMonth() + "-" + entryDate.getDate();
        let amount = data[i].amount;
        let entryObject = {
          month: month,
          amount: amount,
          count: 1,
          recorded_at: entryDate,
        };
        const isFound = newDataArray.findIndex((entry) => entry.month == month);
        if (isFound > -1) {
          newDataArray[isFound].amount += entryObject.amount;
          newDataArray[isFound].count += 1;
        } else {
          newDataArray.push(entryObject);
        }
      }
      for (let i = 0; i < newDataArray.length; i++) {
        // Calculate the averages of the entries
        newDataArray[i].amount = newDataArray[i].amount / newDataArray[i].count;
        // Fix the significant figures of the entries
        newDataArray[i].amount = newDataArray[i].amount.toFixed(2);
        // Convert it back to float format
        newDataArray[i].amount = parseFloat(newDataArray[i].amount);
      }
      break;
    case "Last Week":
      for (let i = 0; i < data.length; i++) {
        let entryDate = data[i].recorded_at;
        let hourMinute = entryDate.toLocaleTimeString();
        hourMinute =
          hourMinute.slice(0, hourMinute.length - 9) +
          " " +
          hourMinute.slice(hourMinute.length - 2, hourMinute.length);
        let entryToDateString = entryDate.toDateString().slice(0, 10);
        let weekIdentifier = entryDate.getDate() + "-" + entryDate.getHours();
        let week = entryToDateString + " " + hourMinute;
        let amount = data[i].amount;
        let entryObject = {
          week: week,
          amount: amount,
          weekIdentifier: weekIdentifier,
          count: 1,
          recorded_at: entryDate,
        };
        const isFound = newDataArray.findIndex(
          (entry) => entry.weekIdentifier == weekIdentifier
        );
        if (isFound > -1) {
          newDataArray[isFound].amount += entryObject.amount;
          newDataArray[isFound].count += 1;
        } else {
          newDataArray.push(entryObject);
        }
      }
      for (let i = 0; i < newDataArray.length; i++) {
        // Calculate the averages of the entries
        newDataArray[i].amount = newDataArray[i].amount / newDataArray[i].count;
        // Fix the significant figures of the entries
        newDataArray[i].amount = newDataArray[i].amount.toFixed(2);
        // Convert it back to float format
        newDataArray[i].amount = parseFloat(newDataArray[i].amount);
      }
      break;
    case "Today":
      newDataArray = data;
      for (let i = 0; i < newDataArray.length; i++) {
        if (newDataArray[i].amount > 0) {
          // Fix the significant figures of the entries
          newDataArray[i].amount = newDataArray[i].amount.toFixed(2);
          // Convert it back to float format
          newDataArray[i].amount = parseFloat(newDataArray[i].amount);
        }
      }
      break;

    default:
      break;
  }
  return newDataArray;
}
function aggregateDataBasedOnTimeSum(dateRange, data) {
  let newDataArray = [];
  switch (dateRange) {
    case "Last Year":
      for (let i = 0; i < data.length; i++) {
        let entryDate = data[i].recorded_at;
        let fullYear =
          entryDate.getFullYear() + " " + monthNames[entryDate.getMonth()];
        let amount = data[i].amount;
        let entryObject = {
          fullYear: fullYear,
          amount: amount,
          count: 1,
          recorded_at: entryDate,
        };
        const isFound = newDataArray.findIndex(
          (entry) => entry.fullYear == fullYear
        );
        if (isFound > -1) {
          newDataArray[isFound].amount += entryObject.amount;
          newDataArray[isFound].count += 1;
        } else {
          newDataArray.push(entryObject);
        }
      }
      for (let i = 0; i < newDataArray.length; i++) {
        // Calculate the averages of the entries
        newDataArray[i].amount = newDataArray[i].amount;
        // Fix the significant figures of the entries
        newDataArray[i].amount = newDataArray[i].amount.toFixed(2);
        // Convert it back to float format
        newDataArray[i].amount = parseFloat(newDataArray[i].amount);
      }
      break;
    case "Last Month":
      for (let i = 0; i < data.length; i++) {
        let entryDate = data[i].recorded_at;
        let month = entryDate.getMonth() + "-" + entryDate.getDate();
        let amount = data[i].amount;
        let entryObject = {
          month: month,
          amount: amount,
          count: 1,
          recorded_at: entryDate,
        };
        const isFound = newDataArray.findIndex((entry) => entry.month == month);
        if (isFound > -1) {
          newDataArray[isFound].amount += entryObject.amount;
          newDataArray[isFound].count += 1;
        } else {
          newDataArray.push(entryObject);
        }
      }
      for (let i = 0; i < newDataArray.length; i++) {
        // Calculate the averages of the entries
        newDataArray[i].amount = newDataArray[i].amount;
        // Fix the significant figures of the entries
        newDataArray[i].amount = newDataArray[i].amount.toFixed(2);
        // Convert it back to float format
        newDataArray[i].amount = parseFloat(newDataArray[i].amount);
      }
      break;
    case "Last Week":
      for (let i = 0; i < data.length; i++) {
        let entryDate = data[i].recorded_at;
        let hourMinute = entryDate.toLocaleTimeString();
        hourMinute =
          hourMinute.slice(0, hourMinute.length - 9) +
          " " +
          hourMinute.slice(hourMinute.length - 2, hourMinute.length);
        let entryToDateString = entryDate.toDateString().slice(0, 10);
        let weekIdentifier = entryDate.getDate() + "-" + entryDate.getHours();
        let week = entryToDateString + " " + hourMinute;
        let amount = data[i].amount;
        let entryObject = {
          week: week,
          amount: amount,
          weekIdentifier: weekIdentifier,
          count: 1,
          recorded_at: entryDate,
        };
        const isFound = newDataArray.findIndex(
          (entry) => entry.weekIdentifier == weekIdentifier
        );
        if (isFound > -1) {
          newDataArray[isFound].amount += entryObject.amount;
          newDataArray[isFound].count += 1;
        } else {
          newDataArray.push(entryObject);
        }
      }
      for (let i = 0; i < newDataArray.length; i++) {
        // Calculate the averages of the entries
        newDataArray[i].amount = newDataArray[i].amount;
        // Fix the significant figures of the entries
        newDataArray[i].amount = newDataArray[i].amount.toFixed(2);
        // Convert it back to float format
        newDataArray[i].amount = parseFloat(newDataArray[i].amount);
      }
      break;
    case "Today":
      newDataArray = data;
      for (let i = 0; i < newDataArray.length; i++) {
        if (newDataArray[i].amount > 0) {
          // Fix the significant figures of the entries
          newDataArray[i].amount = newDataArray[i].amount.toFixed(2);
          // Convert it back to float format
          newDataArray[i].amount = parseFloat(newDataArray[i].amount);
        }
      }
      break;

    default:
      break;
  }
  return newDataArray;
}

function cleanUpEntriesAndGetMinMax(data, error) {
  let min, max;
  let recordsData = [];
  if (data) {
    if (data.length > 0) {
      const { amount, change } = data[0];
      min = amount;
      max = amount;
      for (let i = 0; i < data.length; i++) {
        const {
          id,
          created_at,
          recorded_at,
          building_record_id,
          amount,
          change,
        } = data[i];

        if (min > amount) {
          min = amount;
        }
        if (max < amount) {
          max = amount;
        }

        let entryObject = cleanUpEntry(recorded_at, amount);
        recordsData.push(entryObject);
      }
    } else {
      console.log("No entries");
    }
  } else {
    console.log("Error:", error);
    recordsData = [];
    return { recordsData, min, max };
  }
  min = Math.ceil(min - (max - min) * 10);
  max = Math.ceil(max + (max - min) * 10);
  return { recordsData, min, max };
}

function getDateOffset(dateRange) {
  let testDate1 = new Date("2018-04-11 00:00:00");

  let nowDate = new Date();
  nowDate = testDate1;
  let temp = nowDate.toDateString();
  nowDate = new Date(temp);

  let endDate = new Date(temp);
  endDate.setDate(endDate.getDate() + 1);

  let calculatedDate;

  switch (dateRange) {
    case "Last Year":
      calculatedDate = nowDate;
      calculatedDate.setFullYear(nowDate.getFullYear() - 1);
      break;
    case "Last Month":
      calculatedDate = nowDate;
      calculatedDate.setMonth(nowDate.getMonth() - 1);
      break;
    case "Last Week":
      calculatedDate = nowDate;
      calculatedDate.setDate(nowDate.getDate() - 7);
      break;
    case "Today":
      calculatedDate = nowDate;
      break;

    default:
      break;
  }

  calculatedDate = calculatedDate.toISOString();
  endDate = endDate.toISOString();

  return { calculatedDate, endDate };
}

export async function getRecordsByDate(selectedTabAtom, dateRange) {

  let { calculatedDate, endDate } = getDateOffset(dateRange);

  console.log(calculatedDate, endDate)

  let awaitData, awaitError;

  switch (selectedTabAtom) {
    case "Electrical Records":
      let { electricalRecords, electricalRecordsError } =
        await getElectricalRecordEntriesByDate(calculatedDate, endDate);
      awaitData = electricalRecords;
      awaitError = electricalRecordsError;
      break;
    case "Natural Gas Records":
      let { naturalGasRecords, naturalGasRecordsError } =
        await getNaturalGasRecordEntriesByDate(calculatedDate, endDate);
      awaitData = naturalGasRecords;
      awaitError = naturalGasRecordsError;
      break;
    case "Outside Temperature Records":
      const { outsideTempRecords, outsideTempRecordsError } =
        await getOutsideTempRecordEntriesByDate(calculatedDate, endDate);
      awaitData = outsideTempRecords;
      awaitError = outsideTempRecordsError;
      break;
    case "Water Records":
      const { waterRecords, waterRecordsError } =
        await getWaterRecordEntriesByDate(calculatedDate, endDate);
      awaitData = waterRecords;
      awaitError = waterRecordsError;
      break;
    default:
      break;
  }

  if (awaitError){
    return { awaitData, awaitError}
  }

  let { recordsData, min, max } = cleanUpEntriesAndGetMinMax(
    awaitData,
    awaitError
  );

  switch (selectedTabAtom) {
    case "Outside Temperature Records":
      recordsData = aggregateDataBasedOnTime(dateRange, recordsData);
      break;
    default:
      recordsData = aggregateDataBasedOnTimeSum(dateRange, recordsData);
      break;
  }
  
  return { recordsData, min, max };
}

// getRecordsByDate("Electrical Records", "Last Week");
