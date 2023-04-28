import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY
);

//
//
//

export async function getBuildingData() {
  const { data, error } = await supabase.from("buildingRecords").select();

  if (error) return error;
  return data;
}

//
// Queries to create and get entries from the electrical record entry. Skips if entry for
// recorded_at value is the same.
//

export async function createElectricalRecordEntry(
  recordedDateTime,
  buildingId,
  amount,
  change
) {
  const { data, errorFromEntryCheck } = await getElectricalRecordEntry(
    recordedDateTime
  );

  if (data) {
    if (data.length == 0) {
      const { errorFromEntryInsert } = await supabase
        .from("electricalRecords")
        .insert({
          recorded_at: recordedDateTime,
          building_record_id: buildingId,
          amount: amount,
          change: change,
        });
      return errorFromEntryInsert;
    }
  } else {
    return errorFromEntryCheck;
  }
}

export async function getElectricalRecordEntry(recordedDateTime) {
  let { data, error } = await supabase
    .from("electricalRecords")
    .select("*")
    .eq("recorded_at", recordedDateTime)
    .order("recorded_at", { ascending: true });

  return { data, error };
}

export async function getElectricalRecordEntries() {
  let { data, error } = await supabase
    .from("electricalRecords")
    .select("*")
    .order("recorded_at", { ascending: true });

  return { data, error };
}

export async function getElectricalRecordEntriesByDate(startDate, endDate) {
  let { data: electricalRecords, error: electricalRecordsError } =
    await supabase
      .from("electricalRecords")
      .select("*")
      .gte("recorded_at", startDate)
      .lte("recorded_at", endDate)
      .order("recorded_at", { ascending: true });
  return { electricalRecords, electricalRecordsError };
}

//
// Queries to create and get entries from the natrual gas record entry. Skips if entry for
// recorded_at value is the same.
//

export async function createNaturalGasRecordEntry(
  recordedDateTime,
  buildingId,
  amount
) {
  const { data, errorFromEntryCheck } = await getNaturalGasRecordEntry(
    recordedDateTime
  );

  if (data) {
    if (data.length == 0) {
      const { errorFromEntryInsert } = await supabase
        .from("naturalGasRecordsModded")
        .insert({
          recorded_at: recordedDateTime,
          building_record_id: buildingId,
          amount: amount,
        });
      return errorFromEntryInsert;
    }
  } else {
    return errorFromEntryCheck;
  }
}

export async function getNaturalGasRecordEntry(recordedDateTime) {
  let { data, error } = await supabase
    .from("naturalGasRecordsModded")
    .select("*")
    .eq("recorded_at", recordedDateTime)
    .order("recorded_at", { ascending: true });

  return { data, error };
}

export async function getNaturalGasRecordEntries() {
  let { data, error } = await supabase
    .from("naturalGasRecordsModded")
    .select("*")
    .order("recorded_at", { ascending: true });

  return { data, error };
}

export async function getNaturalGasRecordEntriesByDate(startDate, endDate) {
  let { data: naturalGasRecords, error: naturalGasRecordsError } =
    await supabase
      .from("naturalGasRecordsModded")
      .select("*")
      .gte("recorded_at", startDate)
      .lte("recorded_at", endDate)
      .order("recorded_at", { ascending: true });

  return { naturalGasRecords, naturalGasRecordsError };
}

//
// Queries to create and get entries from the outside temperature record entry. Skips if entry for
// recorded_at value is the same.
//

export async function createOutsideTempRecordEntry(
  recordedDateTime,
  buildingId,
  amount
) {
  const { data, errorFromEntryCheck } = await getOutsideTempRecordEntry(
    recordedDateTime
  );

  if (data) {
    if (data.length == 0) {
      const { errorFromEntryInsert } = await supabase
        .from("outsideTempRecords")
        .insert({
          recorded_at: recordedDateTime,
          building_record_id: buildingId,
          amount: amount,
        });
      return errorFromEntryInsert;
    }
  } else {
    return errorFromEntryCheck;
  }
}

export async function getOutsideTempRecordEntry(recordedDateTime) {
  let { data, error } = await supabase
    .from("outsideTempRecords")
    .select("*")
    .eq("recorded_at", recordedDateTime)
    .order("recorded_at", { ascending: true });

  return { data, error };
}

export async function getOutsideTempRecordEntries() {
  let { data, error } = await supabase
    .from("outsideTempRecords")
    .select("*")
    .order("recorded_at", { ascending: true });

  return { data, error };
}

export async function getOutsideTempRecordEntriesByDate(startDate, endDate) {
  let { data: outsideTempRecords, error: outsideTempRecordsError } =
    await supabase
      .from("outsideTempRecords")
      .select("*")
      .gte("recorded_at", startDate)
      .lte("recorded_at", endDate)
      .order("recorded_at", { ascending: true });

  return { outsideTempRecords, outsideTempRecordsError };
}

//
// Queries to create and get entries from the water record record entry. Skips if entry for
// recorded_at value is the same.
//

export async function createWaterRecordEntry(
  recordedDateTime,
  buildingId,
  amount
) {
  const { data, errorFromEntryCheck } = await getWaterRecordEntry(
    recordedDateTime
  );

  if (data) {
    if (data.length == 0) {
      const { errorFromEntryInsert } = await supabase
        .from("waterRecords")
        .insert({
          recorded_at: recordedDateTime,
          building_record_id: buildingId,
          amount: amount,
        });
      return errorFromEntryInsert;
    }
  } else {
    return errorFromEntryCheck;
  }
}

export async function getWaterRecordEntry(recordedDateTime) {
  let { data, error } = await supabase
    .from("waterRecords")
    .select("*")
    .eq("recorded_at", recordedDateTime)
    .order("recorded_at", { ascending: true });

  return { data, error };
}

export async function getWaterRecordEntries() {
  let { data, error } = await supabase
    .from("waterRecords")
    .select("*")
    .order("recorded_at", { ascending: true });

  return { data, error };
}

export async function getWaterRecordEntriesByDate(startDate, endDate) {
  let { data: waterRecords, error: waterRecordsError } = await supabase
    .from("waterRecords")
    .select("*")
    .gte("recorded_at", startDate)
    .lte("recorded_at", endDate)
    .order("recorded_at", { ascending: true });

  return { waterRecords, waterRecordsError };
}
