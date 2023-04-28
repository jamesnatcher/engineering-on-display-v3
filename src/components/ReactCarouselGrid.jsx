import React, { useState, useEffect } from "react";
import { getAllIMagesByCarousel, deleteImageByCarousel } from "../services/supabaseBucketQueries";
import ReactStickySort from "./ReactStickySort";
import { useStore } from "@nanostores/react";
import { gridImages } from "../services/nanostoreAtoms";
import { getCarouselOrder } from "../services/supabaseCarouselQueries";
import Image from "next/image"


export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default function ReactCarouselGrid({ selectedCarousel, fieldState, deleteCarousel, setFieldState }) {
    const $gridImages = useStore(gridImages)
    const [isPosition, setIsPosition] = useState(true)
    const [isEditingName, setIsEditingName] = useState(false)
    const [placeholder, setPlaceholder] = useState("Input new name for carousel (Do not use #!)")


    
    useEffect(() => {
        const dataFetch = async () => {
            if (selectedCarousel) {
                console.log("Get images")
                const carouselImages = await getAllIMagesByCarousel(selectedCarousel.id)
                console.log("Got images", carouselImages)

                const carouselOrder = await getCarouselOrder(selectedCarousel.id);
                console.log("Order of carousel id ", selectedCarousel.id, carouselOrder);

                let orderedImages = [];
                if (carouselOrder.length > 0) {
                    console.log("Going into for loop")
                    orderedImages = [];
                    for (let index = 0; index < carouselOrder.length; index++) {
                        if (carouselOrder[index] == "eib-graph") {
                            console.log("Not yet!")
                            let tempObject = {
                                publicUrl: "eib-graph",
                                name: "eib-graph",
                            }
                            orderedImages.push(tempObject);
                        } else {
                            let indexOfTarget = carouselImages.findIndex(
                                (el) => el.name == carouselOrder[index]
                            )
                            if (indexOfTarget >= 0) {
                                console.log(indexOfTarget, carouselImages[indexOfTarget])
                                orderedImages.push(carouselImages[indexOfTarget]);
                                console.log(orderedImages)
                            }
                        }
                    }
                } else {
                    console.log("triggerd else")
                    orderedImages = carouselImages
                }

                console.log("Ordered ", orderedImages);
                gridImages.set(orderedImages)
            }
        };
        dataFetch()
    }, [selectedCarousel]);

    function deleteImage(imageName) {
        deleteImageByCarousel(selectedCarousel.id, imageName)
        const data = $gridImages.filter(i => i.name !== imageName)
        gridImages.set(data)
    }

    return (
        <>
            <div className="flex-1">
                <div>
                    <div className="mb-10 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {selectedCarousel &&
                                <>
                                    {!isEditingName ?
                                        <span className="self-center text-2xl font-medium whitespace-nowrap text-gray-900 dark:text-white">{selectedCarousel.carousel_name}</span>
                                        :
                                        <div className="w-72">
                                            <input type="text" id="small-input" placeholder={placeholder}
                                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " />
                                        </div>
                                    }
                                    <div className="cursor-pointer" onClick={() => {
                                        setIsEditingName(!isEditingName)
                                        setPlaceholder(document.getElementById('small-input').value)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </div>
                                </>
                            }
                        </div>

                        <div className="inline-flex rounded-md shadow-sm overflow-hidden" role="group">
                            {isPosition ?
                                <>
                                    <button type="button"
                                        className="flex-1 px-4 py-2 text-sm font-medium text-[#fac324] bg-[#046c54] border-t border-b border-gray-200 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:text-white"
                                        onClick={(e) => setIsPosition(true)}>Position</button>
                                    <button type="button"
                                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600  dark:focus:text-white"
                                        onClick={(e) => setIsPosition(false)}> Duration</button>
                                </>
                                :
                                <>
                                    <button type="button"
                                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:text-white"
                                        onClick={(e) => setIsPosition(true)}>Position</button>
                                    <button type="button"
                                        className="flex-1 px-4 py-2 text-sm font-medium text-[#fac324] bg-[#046c54] border-t border-b border-gray-200 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white  dark:focus:text-white"
                                        onClick={(e) => setIsPosition(false)}> Duration</button>
                                </>
                            }

                        </div>

                        <div>
                            <button type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-900 border rounded-lg border-gray-200 hover:bg-red-500 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-500"
                                onClick={(e) => deleteCarousel(e)}>
                                Delete Carousel
                            </button>
                        </div>
                    </div>

                    {isPosition ?
                        <ReactStickySort deleteImage={deleteImage} setFieldState={setFieldState} selectedCarousel={selectedCarousel} />
                        :
                        <>{$gridImages &&
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 p-5 mb-5 overflow-auto">

                                {$gridImages.length > 0 &&
                                    <>
                                        {$gridImages.map((image, index) =>
                                            <div key={image.name}>
                                                {(image.name == "eib-graph" && image.publicUrl == "eib-graph") ?
                                                    <div className="max-w-sm w-72 h-96 flex flex-col items-center justify-center border-2 rounded overflow-hidden shadow-lg">
                                                        <div className="flex-1 flex flex-col items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-10 h-10">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                                            </svg>
                                                            <div className="text-md font-medium truncate px-5">
                                                                EIB Sensor Graphs
                                                            </div>
                                                        </div>
                                                        <div className="pb-5 px-5 flex justify-between items-center">
                                                            <button type="button"
                                                                className="px-4 mr-10 py-2 text-sm font-medium text-gray-900 bg-gray-300 border rounded-lg border-gray-200 hover:bg-red-500 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-500"
                                                                onClick={(e) => deleteImage(image.name)}>
                                                                Delete
                                                            </button>
                                                            <div className="flex justify-between ml-4 items-center text-gray-500">
                                                                <span className="mr-3 font-medium">Move me!</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div >
                                                        {image &&
                                                            <div key={image.name} className="max-w-sm w-72 h-96 flex flex-col border-2 rounded overflow-hidden shadow-lg">
                                                                <div className="flex-1 p-5">
                                                                    <img className="w-full" 
                                                                    src={image.publicUrl} 
                                                                    alt={image.name} />
                                                                </div>
                                                                <div className="text-md font-medium truncate px-5">
                                                                    {image.name}
                                                                </div>
                                                                <div className="pb-5 px-5 flex justify-between items-center">
                                                                    <button type="button"
                                                                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border rounded-lg border-gray-200 hover:bg-red-500 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-500"
                                                                        onClick={(e) => deleteImage(image.name)}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        )}
                                    </>
                                }
                                <button type="button"
                                    className="shadow-lg px-4 py-2 text-2xl text-gray-400 font-medium bg-gray-50 w-72 h-96 border-2 border-gray-200 hover:border-[#fac324] border-dashed rounded  hover:bg-green-100 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-500"
                                    onClick={(e) => setFieldState("upload")}>
                                    +
                                </button>
                            </div>
                        }
                        </>

                    }
                </div>

            </div >
        </>

    );
} 