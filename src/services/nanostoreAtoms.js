import { atom, map } from "nanostores";
import { persistentAtom } from '@nanostores/persistent'
export const showModal = atom(false);

export const selectedTabAtom = atom("Electrical Records");

export const tabNames = atom([
  "Electrical Records",
  "Natural Gas Records",
  "Outside Temperature Records",
  "Water Records",
  "Settings",
]);

export const selectedTabYlabel = atom(
"Kilowatt hours (kWh)"
);

export const yAxisLabels = atom([
    "Kilowatt hours (kWh)",
    "Cubic Feet (ft³)",
    "Temperature (℉)",
    "Water Usage (ft³)",
]);

export const selectedTabYunits = atom(
  "kWh"
  );

export const yAxisUnits = atom([
    "kWh",
    "ft³",
    "℉",
    "ft³",
]);

export const dateRangeOptions = atom([
  {
    rangeTitle: "Last Year",
    xTimeLabel: "Time (Months)",
    xDataKey: "fullYear",
    xInterval: 1,
  },
  {
    rangeTitle: "Last Month",
    xTimeLabel: "Time (Days)",
    xDataKey: "month",
    xInterval: 1,
  },
  {
    rangeTitle: "Last Week",
    xTimeLabel: "Time (Hours)",
    xDataKey: "week",
    xInterval: 25,
  },
  {
    rangeTitle: "Today",
    xTimeLabel: "Time (15 Minutes)",
    xDataKey: "day",
    xInterval: 10,
  },
]);

export const selectedDateOption = atom({
  rangeTitle: "Today",
  xTimeLabel: "Time (15 Minutes)",
  xDataKey: "day",
  xInterval: 10,
});

export const modifyCarousel = atom(false);

export const selectedCarousel = atom(null);

export const isSlideshowOn = atom(false);

export const recordsData = atom([]);

export const electricalRecordsData = atom([]);
export const electricalRecordsDataMinMax = atom([]);

export const gridImages = atom([]);
export const selectedCarouselPersistent = persistentAtom(null);
