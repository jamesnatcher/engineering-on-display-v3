import React, { useRef, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Zoom, Navigation, Pagination } from "swiper";

import { useStore } from '@nanostores/react'
import { gridImages, selectedCarouselPersistent } from "../services/nanostoreAtoms";
import { getAllIMagesByCarousel } from "../services/supabaseBucketQueries";
import { getCarouselOrder } from "../services/supabaseCarouselQueries";

import ReactGraphComponent from "./ReactGraphComponent";
import Image from 'next/image'
import Link from 'next/link'

export default function App() {
  const $gridImages = useStore(gridImages);
  const $selectedCarouselPersistent = useStore(selectedCarouselPersistent);
  useEffect(() => {
    const dataFetch = async () => {
      if ($selectedCarouselPersistent) {
        let id = parseInt($selectedCarouselPersistent)
        console.log(typeof (id), id);
        console.log("Get images")
        const carouselImages = await getAllIMagesByCarousel(id)
        console.log("Got images", carouselImages)

        const carouselOrder = await getCarouselOrder(id);
        console.log("Order of carousel id ", id, carouselOrder);

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
  }, [$selectedCarouselPersistent]);

  const loaderProp = ({ src }) => {
    return src;
  }

  return (
    <div>
      <Link href="/" className="absolute top-10 left-10 z-10 flex flex-col items-center h-20 w-20 rounded-full overflow-hidden opacity-75">
        <button className="w-20 h-20 flex-1 bg-green-200 hover:bg-[#046c54] text-[#fac324] flex flex-col justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" class="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </Link>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fac324",
          "--swiper-pagination-color": "#fac324",
        }}
        loop={true}
        zoom={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Navigation, Pagination]}
        className="mySwiper"
      >
        {$gridImages &&
          <>
            {$gridImages.map((image, index) =>
              <>
                {(image.name == "eib-graph" && image.publicUrl == "eib-graph") ?
                  <SwiperSlide>
                    <div className="bg-white max-h-screen">
                      <ReactGraphComponent />
                    </div>
                  </SwiperSlide>
                  :
                  <SwiperSlide>
                    <div className="swiper-zoom-container bg-white max-h-screen">
                      <img
                        src={image.publicUrl}
                        alt={image.name} />
                    </div>
                  </SwiperSlide>
                }
              </>

            )}
          </>
        }

      </Swiper>
    </div >
  );
}
