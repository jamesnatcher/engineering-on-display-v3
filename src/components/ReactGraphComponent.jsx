import React, { useState, useEffect } from "react";
import { useStore } from '@nanostores/react'
import { tabNames, selectedTabAtom, selectedTabYlabel, yAxisLabels, selectedTabYunits, yAxisUnits, selectedDateOption, dateRangeOptions, electricalRecordsData, electricalRecordsDataMinMax } from "../services/nanostoreAtoms";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label
} from 'recharts';
import { getRecordsByDate } from "../services/getData";
import ReactDashboardTabs from "../components/ReactDashboardTabs"

const dateRange = [
    'Last Year',
    'Last Month',
    'Last Week',
    'Today',
]
const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

export default function ReactGraphComponent() {
    const $tabNames = useStore(tabNames);
    const $selectedTabAtom = useStore(selectedTabAtom);
    const $selectedDateOption = useStore(selectedDateOption);
    const $dateRangeOptions = useStore(dateRangeOptions);
    const $selectedTabYlabel = useStore(selectedTabYlabel);
    const $yAxisLabels = useStore(yAxisLabels);
    const $selectedTabYunits = useStore(selectedTabYunits);
    const $yAxisUnits = useStore(yAxisUnits);
    const $electricalRecordsData = useStore(electricalRecordsData);
    const $electricalRecordsDataMinMax = useStore(electricalRecordsData);
    const [selectedDateRange, setSelectedDateRange] = useState(dateRange[3])
    const [graphTitleDateRange, setGraphTitleDateRange] = useState(null)


    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            if ($selectedTabAtom != "Settings") {
                const { recordsData, min, max } = await getRecordsByDate($selectedTabAtom, selectedDateRange);

                console.log(recordsData, min, max)
                setTitleDateRange(recordsData[0], recordsData[recordsData.length - 1], selectedDateRange)
                // set state when the data received
                electricalRecordsData.set(recordsData)
                electricalRecordsDataMinMax.set([min, max])


                let indexOfSelectedTab = $tabNames.findIndex((element) => element == $selectedTabAtom)
                selectedTabYlabel.set($yAxisLabels[indexOfSelectedTab])
                selectedTabYunits.set($yAxisUnits[indexOfSelectedTab])

            }
        };

        dataFetch();
    }, [$selectedTabAtom, selectedDateRange, $tabNames, $yAxisLabels, $yAxisUnits]);

    function setTitleDateRange(startDate, endDate, dateRange) {
        console.log(startDate, endDate, dateRange)

        let start;
        let end;
        switch (dateRange) {
            case 'Last Year':
                start = startDate.recorded_at.getFullYear();
                end = endDate.recorded_at.getFullYear();
                console.log(start)
                console.log(end)
                break;
            case 'Last Month':
                start = startDate.recorded_at.toLocaleString('en-US', { month: 'long' });
                end = endDate.recorded_at.toLocaleString('en-US', { month: 'long' });
                start += ' ' + startDate.recorded_at.toLocaleString('en-US', { month: 'numeric' });
                end += ' ' + endDate.recorded_at.toLocaleString('en-US', { month: 'numeric' });
                console.log(start)
                console.log(end)
                break;
            case 'Last Week':
                start = startDate.recorded_at.toLocaleString('en-US', { month: 'long' });
                end = endDate.recorded_at.toLocaleString('en-US', { month: 'long' });
                start += ' ' + startDate.recorded_at.toLocaleString('en-US', { month: 'numeric' });
                end += ' ' + endDate.recorded_at.toLocaleString('en-US', { month: 'numeric' });
                console.log(start)
                console.log(end)
                break;
            case 'Today':
                start = weekday[startDate.recorded_at.getDay()];
                end = weekday[endDate.recorded_at.getDay()];
                start += ', ' + startDate.recorded_at.toLocaleString('en-US', { month: 'long' });
                end += ', ' + endDate.recorded_at.toLocaleString('en-US', { month: 'long' });
                start += ' ' + startDate.recorded_at.toLocaleString('en-US', { month: 'numeric' });
                end += ' ' + endDate.recorded_at.toLocaleString('en-US', { month: 'numeric' });
                console.log(start)
                console.log(end)
                break;
            default:
            // code block
        }
        if (start == end) {
            setGraphTitleDateRange(end)
        } else {
            let dateString = start + ' - ' + end
            setGraphTitleDateRange(dateString)
        }
    }

    function clickTab(dateRange, e) {
        e.preventDefault();

        switch (dateRange) {
            case 'Last Year':
                selectedDateOption.set($dateRangeOptions[0])
                break;
            case 'Last Month':
                selectedDateOption.set($dateRangeOptions[1])

                break;
            case 'Last Week':
                selectedDateOption.set($dateRangeOptions[2])
                break;
            case 'Today':
                selectedDateOption.set($dateRangeOptions[3])
                break;
            default:
            // code block
        }

        setSelectedDateRange(dateRange)

        console.log("data: ", $electricalRecordsData)
    }
    return (
        <div className="max-h-fit">
            <ReactDashboardTabs />
            {$selectedTabAtom != 'Settings' &&
                <div className="flex flex-col h-screen items-center ">
                    <div className="text-center text-xl font-bold text-gray-900 pb-5">{$selectedTabAtom} ({graphTitleDateRange})</div>
                    {$selectedTabAtom != 'Settings' &&
                        <ResponsiveContainer width="80%" height="70%">
                            <AreaChart
                                data={$electricalRecordsData}
                                margin={{
                                    top: 0,
                                    right: 50,
                                    left: 0,
                                    bottom: 0,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey={$selectedDateOption.xDataKey}
                                    angle={-45}
                                    height={100}
                                    width={100}
                                    textAnchor="end" 
                                    padding={{ left: 0, right: 0 }}
                                    interval={$selectedDateOption.xInterval}>
                                    <Label
                                        position="top"
                                        
                                        value={$selectedDateOption.xTimeLabel}>
                                    </Label>
                                </XAxis>
                                <YAxis
                                    dataKey={"amount"}
                                    label={{
                                        value: $selectedTabYlabel,
                                        style: { textAnchor: 'middle' },
                                        angle: -90,
                                        position: 'left',
                                        offset: -50,
                                    }}
                                    width={150}
                                    allowDecimals={true}
                                    domain={[0, $electricalRecordsDataMinMax[1]]} />
                                <Tooltip />
                                <Area type="monotone" dataKey="amount" stroke="#fac324" fill="#04543c" />
                            </AreaChart>
                        </ResponsiveContainer>
                    }
                    <div className="flex items-center justify-center p-5">
                        <div className="inline-flex rounded-md shadow-sm overflow-hidden" role="group">
                            {dateRange.map((dateRange, index) =>
                                <div key={index} className="flex flex-col">
                                    {dateRange == $selectedDateOption.rangeTitle ?

                                        <button type="button"
                                            onClick={(e) => clickTab(dateRange, e)}
                                            className="flex-1 px-4 py-2 text-sm font-medium text-[#fac324] bg-[#046c54] border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-[#fac324] dark:bg-gray-700 dark:border-gray-600 dark:text-white  dark:focus:ring-[#fac324] dark:focus:text-white">
                                            {dateRange}
                                        </button>
                                        :

                                        <button type="button"
                                            onClick={(e) => clickTab(dateRange, e)}
                                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-[#fac324]  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-[#fac324]  dark:focus:text-white">
                                            {dateRange}
                                        </button>
                                    }
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
} 
