import React from "react";
import { useStore } from '@nanostores/react'
import { selectedTabAtom, tabNames } from "../services/nanostoreAtoms";


export default function ReactDashboardTabs() {
    const $selectedTabAtom = useStore(selectedTabAtom);
    const $tabNames = useStore(tabNames);

    function clickTab(tabName, e) {
        e.preventDefault();

        selectedTabAtom.set(tabName)
    }


    return (
        <> {
            $selectedTabAtom != "Settings" &&
            <div className="flex items-center flex-nowrap justify-center p-5">
                <div className="md:inline-flex rounded-md shadow-sm overflow-hidden" role="group">
                    {$tabNames.map((tabName, index) =>
                        <div key={index} className="flex flex-col flex-nowrap">
                            {tabName != "Settings" &&
                                <>
                                    {tabName == $selectedTabAtom ?
                                        <button type="button"
                                            className="flex-1 px-4 py-2 text-sm font-medium text-[#fac324] bg-[#046c54] border-t border-b border-gray-200 focus:z-10 focus:ring-2 focus:ring-[#fac324] dark:bg-gray-700 dark:border-gray-600 dark:text-white  dark:focus:ring-[#fac324] dark:focus:text-white"
                                            onClick={(e) => clickTab(tabName, e)}>{tabName}</button>
                                        :
                                        <button type="button"
                                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-[#fac324]  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-[#fac324]  dark:focus:text-white"
                                            onClick={(e) => clickTab(tabName, e)}>{tabName}</button>}
                                </>}
                        </div>
                    )}
                </div>
            </div>
        }

        </>

    );
} 