import React, { useState, useEffect } from "react";
import { useStore } from '@nanostores/react'
import { selectedTabAtom, selectedCarousel, gridImages, selectedCarouselPersistent } from "../services/nanostoreAtoms";
import ReactUploadFile from "./ReactUploadFile";
import ReactCarouselGrid from "./ReactCarouselGrid";
import ReactOutsideAlerter from "./ReactOutsideAlerter";
import { getAllCarousels, deleteCarouselById, createCarousel } from "../services/supabaseCarouselQueries";

export default function ReactCarouselSettings() {
    const $gridImages = useStore(gridImages);
    const [allCarousels, setAllCarousels] = useState([])
    const [selectedCarousel, setSelectedCarousel] = useState(null)
    const [isCreatingCarousel, setIsCreatingCarousel] = useState(false)

    //The fieldStates are grid, upload, and addCarousel
    const [fieldState, setFieldState] = useState("grid")

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const carousels = await getAllCarousels()
            console.log("Carousel time", carousels[0])
            setAllCarousels(carousels)
            console.log("Selected carousel: ", carousels[0])
            setSelectedCarousel(carousels[0])
        };
        dataFetch()
    }, []);

    async function createNewCarousel(e) {
        e.preventDefault();

        setIsCreatingCarousel(true)

        let newCarouselTitle = "Carousel " + (allCarousels.length + 1)
        await createCarousel(newCarouselTitle)
        const carousels = await getAllCarousels()
        setAllCarousels(carousels)
        console.log("New carousel!");

        setIsCreatingCarousel(false)
    }

    async function deleteCarousel(e) {
        e.preventDefault();

        deleteCarouselById(selectedCarousel.id)
        const data = allCarousels.filter(i => i.id !== selectedCarousel.id)
        setAllCarousels(data)
        setSelectedCarousel(allCarousels[0])
    }

    return (
        <>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <div className="flex">
                <aside id="default-sidebar" className="w-64 min-h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
                        <div className="border border-xl rounded-lg border-gray-100 overflow-hidden">
                            <ul className="space-y-2 font-medium bg-gray-200 dark:bg-gray-700 p-2 ">
                                <li className="border-b-2 border-gray-400">
                                    <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-3">Carousels</span>
                                    </a>
                                </li>
                                {allCarousels.map((carousel, index) =>
                                    <div key={index}>
                                        {carousel == selectedCarousel ?
                                            <li className="ml-5">
                                                <a className="cursor-default flex items-center p-2 text-black rounded-lg bg-yellow-300 dark:text-white">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">{carousel.carousel_name}</span>
                                                </a>
                                            </li>
                                            :

                                            <li className="ml-5">
                                                <a
                                                    onClick={(e) => {
                                                        setSelectedCarousel(carousel);
                                                        selectedCarouselPersistent.set(carousel.id)
                                                        console.log(selectedCarousel)
                                                        gridImages.set(null)
                                                    }}
                                                    className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">{carousel.carousel_name}</span>
                                                </a>
                                            </li>
                                        }
                                    </div>

                                )}
                                <li>
                                    {!isCreatingCarousel ?
                                        <a onClick={(e) => createNewCarousel(e)} className=" cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Create New Carousel</span>
                                        </a>
                                        :
                                        <a className="cursor-not-allowed flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Create New Carousel</span>
                                        </a>
                                    }

                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>

                <div className="p-4 min-h-full">
                    <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                        {(() => {
                            switch (fieldState) {
                                case "upload":
                                    return <><ReactOutsideAlerter setFieldState={setFieldState}>
                                        <ReactUploadFile setFieldState={setFieldState} selectedCarousel={selectedCarousel} />
                                    </ReactOutsideAlerter>
                                    </>
                                case "grid":
                                    return <>
                                        <ReactCarouselGrid setFieldState={setFieldState} fieldState={fieldState} selectedCarousel={selectedCarousel} deleteCarousel={deleteCarousel} />
                                    </>
                                case "addCarousel":
                                    return <>
                                        <ReactOutsideAlerter setFieldState={setFieldState}>
                                            <div className="flex-1">
                                                <div>
                                                    <div className="flex-1">Create a new carousel</div>
                                                    <button type="button"
                                                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border rounded-lg border-gray-200 hover:bg-red-500 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-500"
                                                        onClick={(e) => setFieldState("grid")}>
                                                        Go back to grid
                                                    </button>
                                                </div>
                                            </div>
                                        </ReactOutsideAlerter>
                                    </>
                                default:
                                    return null
                            }
                        })()}
                    </div>
                </div>
            </div>

        </>
    );
} 