import React from "react";
import { useStore } from '@nanostores/react'
import { selectedTabAtom, tabNames, } from "../services/nanostoreAtoms";

import Link from 'next/link'
import Image from 'next/image'

export default function ReactNavbar() {
    const $selectedTabAtom = useStore(selectedTabAtom);
    const $tabNames = useStore(tabNames);

    function clickTab(tabName, e) {
        e.preventDefault();

        selectedTabAtom.set(tabName)

    }


    return (
        <nav className="bg-[#046c54] border-gray-200 dark:bg-gray-900 sticky">
            <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <Image src="/ComptrScincEnginr-Dept_GG-Rvrs.png" className="h-8 mr-3" alt="UAA logo" />
                    <span className="self-center text-2xl font-medium whitespace-nowrap text-white dark:text-white">Energy on Display v3</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0 md:border-0 cursor-pointer">
                        {$selectedTabAtom != "Settings" ?
                            <>
                                <li>
                                    <Link href="/slideshow" className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-[#fac324] dark:hover:text-white ">Slideshow</Link>
                                </li>
                                <li>
                                    <Link href="/" onClick={(e) => clickTab("Electrical Records", e)} className="block py-2 pl-3 pr-4 text-[#fac324] rounded md:bg-transparent md:text-[#fac324] md:p-0 dark:text-white md:dark:text-[#fac324]" aria-current="page">Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={(e) => clickTab("Settings", e)} className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-[#fac324] dark:hover:text-white ">Settings</button>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link href="/slideshow" className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-[#fac324] dark:hover:text-white ">Slideshow</Link>
                                </li>
                                <li>
                                    <Link href="/" onClick={(e) => clickTab("Electrical Records", e)} className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-[#fac324] dark:hover:text-white " aria-current="page">Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={(e) => clickTab("Settings", e)} className="block py-2 pl-3 pr-4 text-[#fac324] rounded md:bg-transparent md:text-[#fac324] md:p-0 dark:text-white md:dark:text-[#fac324]">Settings</button>
                                </li>
                            </>

                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
} 