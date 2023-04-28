import React, { useState } from "react";
import { useStore } from '@nanostores/react'
import { selectedTabAtom } from "../services/nanostoreAtoms";
import ReactCarouselSettings from "./ReactCarouselSettings";
import ReactSettingsSVG from "./ReactSettingsSVG";
import toast, { Toaster } from 'react-hot-toast';

const settingTabNames = [
    'General',
    'Carousel Settings',
    'About Us',
    'Sign In',
]

export default function ReactSettingsPage() {
    const $selectedTabAtom = useStore(selectedTabAtom);
    const [selectedSettingsTab, setSelectedSettingsTab] = useState('General')

    function clickTab(tabName, e) {
        e.preventDefault();

        setSelectedSettingsTab(tabName)

        console.log(selectedSettingsTab);
    }

    if ($selectedTabAtom == 'Settings') {
        return (
            <>
                <Toaster />
                <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                <div className="flex">
                    <aside id="default-sidebar" className="w-64 min-h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div className="w-full h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                {settingTabNames.map((tabName, index) =>
                                    <li className="cursor-pointer" key={index}>
                                        {
                                            tabName == selectedSettingsTab ?
                                                <a onClick={(e) => clickTab(tabName, e)} className="flex items-center p-2 text-white rounded-lg bg-[#046c54] dark:bg-yellow-300 dark:text-gray-900">
                                                    <ReactSettingsSVG tabName={tabName} />
                                                    <span className="ml-3">{tabName}</span>
                                                </a>
                                                :
                                                <a onClick={(e) => clickTab(tabName, e)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <ReactSettingsSVG tabName={tabName} />
                                                    <span className="ml-3">{tabName}</span>
                                                </a>
                                        }
                                    </li>
                                )}
                            </ul>
                        </div>
                    </aside>
                    <div className="">
                        {selectedSettingsTab == 'General' &&
                            <div className="text-center text-xl font-bold text-gray-900 p-5">{selectedSettingsTab}</div>
                        }
                        {selectedSettingsTab == 'Carousel Settings' &&
                            <ReactCarouselSettings />
                        }
                        {selectedSettingsTab == 'About Us' &&
                            <div className="text-center text-xl font-bold text-gray-900 p-5">{selectedSettingsTab}</div>
                        }
                        {selectedSettingsTab == 'Sign In' &&
                            <div className="text-center text-xl font-bold text-gray-900 p-5">{selectedSettingsTab}</div>

                        }
                    </div>
                </div>
            </>
        );
    }
} 