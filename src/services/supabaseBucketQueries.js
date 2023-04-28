import { createClient } from "@supabase/supabase-js";
import {
  getAllCarousels,
  getCarouselOrder,
} from "./supabaseCarouselQueries.js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY
);

export async function uploadFile(carouselFileName, file, id) {
  console.log(carouselFileName, file, id);
  let uploadPath = id + "/" + file.name;
  console.log("Upload path", uploadPath);
  const { data, error } = await supabase.storage
    .from("slideshow-images")
    .upload(uploadPath, file, {
      upsert: false,
    });

  console.log(data, error);

  if (error) {
    console.log(error);
    return error;
  } else {
    console.log("Upload succesful!");
  }
}

export async function getPublicUrls(data, carouselPath) {
  let urlArray = [];
  if (data) {
    for (let index = 0; index < data.length; index++) {
      const { name } = data[index];
      let urlPath = carouselPath + "/" + name;
      let { data: imageUrl, error } = supabase.storage
        .from("slideshow-images")
        .getPublicUrl(urlPath);

      if (error) {
        console.log("Error retrieving: ", imageUrl, " ", error);
        return;
      }
      let { publicUrl } = imageUrl;

      let imageSet = {
        publicUrl: publicUrl,
        name: name,
      };

      urlArray.push(imageSet);
    }
  } else {
    console.log("Error getting publicUrls, data does not exist");
    return urlArray;
  }
  return urlArray;
}

export async function getAllIMagesByCarousel(carouselID) {
  const { data: carouselImages, error } = await supabase.storage
    .from("slideshow-images")
    .list(carouselID, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (error) {
    console.log("error ran thru", error);
    return null;
  }

  console.log(carouselImages, error, carouselID);

  let imageUrls = await getPublicUrls(carouselImages, carouselID);
  console.log("Urls ", imageUrls);

  return imageUrls;
}

export async function getAllIMages() {
  let carousels = await getAllCarousels();
  let allCarouselImages = [];
  for (let index = 0; index < carousels.length; index++) {
    const { carousel_name } = carousels[index];
    let carouselImages = await getAllIMagesByCarousel(carousel_name);
    allCarouselImages = allCarouselImages.concat(carouselImages);
  }
  return allCarouselImages;
}

export async function deleteImageByCarousel(carouselID, name) {
  let uploadPath = carouselID + "/" + name;

  console.log(uploadPath);

  const { data, error } = await supabase.storage
    .from("slideshow-images")
    .remove([uploadPath]);

  console.log("Data: ", data);

  if (error) {
    console.log("Error: ", error);
  } else {
    console.log("Successfully deleted!");
  }
}

// getAllIMages();
