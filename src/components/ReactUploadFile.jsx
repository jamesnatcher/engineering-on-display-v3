import React, { useEffect, useState } from 'react';
import { uploadFile, getAllIMagesByCarousel } from '../services/supabaseBucketQueries';
import { useStore } from "@nanostores/react";
import { gridImages } from "../services/nanostoreAtoms";
import toast, { Toaster } from 'react-hot-toast';
import { updateCarouselOrder, getCarouselOrder } from '@/services/supabaseCarouselQueries';
import Image from 'next/image'

const ReactUploadFile = ({ setFieldState, selectedCarousel }) => {
    const $gridImages = useStore(gridImages)
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false)

    if (!selectedCarousel) {
        setFieldState("grid")
    }
    async function HandleUploadFile(e) {
        e.preventDefault();

        setIsUploading(true)

        console.log(selectedCarousel)

        // let error = await uploadFile(selectedCarousel.carousel_name, selectedImage, selectedCarousel.id);

        // if (error) {
        //     if (error.message == 'The resource already exists') {
        //         console.log("Error: ", error)
        //         toast.custom((t) => (
        //             <div class="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">

        //                 <strong class="font-bold mr-2">Error: </strong>
        //                 <span class="block sm:inline">Sorry but we do not support duplicate images at this time</span>
        //                 <span class="right-0 px-4 py-3" onClick={() => toast.dismiss(t.id)}>
        //                     <svg class="fill-current h-4 w-4 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        //                 </span>
        //             </div>
        //         ))
        //     }
        // }

        let carouselImages = await getAllIMagesByCarousel(selectedCarousel.id)

        gridImages.set(carouselImages)
        console.log("new images: ", $gridImages)
        setFieldState("grid")
        setIsUploading(false)
    }


    if (selectedCarousel) {
        return (
            <div className="grid gap-4 space-y-2 font-medium text-gray-900">
                <h1>Upload and add image to the carousel preset: {selectedCarousel.carousel_name} {selectedCarousel.id}</h1>

                {selectedImage && (
                    <div>
                        <Image
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        <br />
                        <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                )}
                <input
                    type="file"
                    name="myImage"
                    className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        console.log(typeof (event.target.files[0].name), event.target.files[0].name);
                        setSelectedImage(event.target.files[0]);
                    }}
                />
                <div className='flex justify-start items-center'>
                    <button type="button"
                        className="px-4 py-2 text-sm font-medium text-[#fac324] bg-[#046c54] border rounded-lg border-gray-200 hover:bg-green-500 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-500"
                        onClick={async (e) => {

                            console.log("ADDING GRAPHSSSS")
                            let tempObject = {
                                publicUrl: "eib-graph",
                                name: "eib-graph",
                            }
                            $gridImages.push(tempObject)

                            if ($gridImages && selectedCarousel) {
                                if ($gridImages.length > 0) {

                                    console.log("updating ", selectedCarousel.id, " grid with", $gridImages)
                                    await updateCarouselOrder(selectedCarousel.id, $gridImages)
                                    const carouselImages = await getAllIMagesByCarousel(selectedCarousel.id)
                                    console.log("Got images", carouselImages)

                                    const carouselOrder = await getCarouselOrder(selectedCarousel.id);
                                    console.log("Order of carousel id ", selectedCarousel.id, carouselOrder);

                                    let orderedImages = [];
                                    if (carouselOrder.length > 0) {
                                        console.log("Going into for loop")
                                        orderedImages = [];
                                        for (let index = 0; index < carouselOrder.length; index++) {
                                            console.log("Index of order: ", index)
                                            console.log("Target: ", carouselImages[index])
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
                                                    orderedImages.push(carouselImages[indexOfTarget]);
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
                            }
                            console.log("new images: ", $gridImages)
                            setFieldState("grid")
                        }}>
                        Add EIB Sensor Graphs
                    </button>
                </div>
                <div className='flex justify-start items-center'>
                    {!isUploading ?
                        <>
                            {selectedImage ?
                                <button type="button"
                                    className="px-4 py-2 text-sm font-medium text-[#fac324] bg-[#046c54] border rounded-lg border-gray-200 hover:bg-green-500 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-500"
                                    onClick={(e) => HandleUploadFile(e)}>
                                    Upload and add Image
                                </button>
                                :
                                <button type="button"
                                    className="cursor-not-allowed px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border rounded-lg border-gray-200 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    Upload and add Image
                                </button>
                            }
                        </>
                        :
                        <button type="button"
                            className="flex justify-center items-center cursor-not-allowed px-4 py-2 text-sm font-medium text-gray-900 bg-gray-300 border rounded-lg border-gray-200 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <div className='ml-3 font-medium'>
                                Processing...
                            </div>
                        </button>
                    }

                    <button type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-red-500 border rounded-lg border-gray-200 hover:bg-red-300 focus:z-10  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-500"
                        onClick={(e) => setFieldState("grid")}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    } else {
        return <div>Loading</div>
    }

};

export default ReactUploadFile;