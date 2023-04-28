import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
  process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY
);

export async function createCarousel(name) {
  const { data, error } = await supabase
    .from("carousels")
    .insert({ carousel_name: name });

  console.log(data, error);
  if (error) return error;
  return data;
}

export async function deleteCarouselById(id) {
  console.log(id);
  const { data, error } = await supabase
    .from("carousels")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
  }
}

export async function getAllCarousels() {
  let { data: carousels, error } = await supabase
    .from("carousels")
    .select("*")
    .order("created_at", { ascending: true });

  console.log(carousels, error);
  if (error) return error;
  return carousels;
}

export async function updateCarouselOrder(id, gridImages) {
  let orderArray = [];
  for (let index = 0; index < gridImages.length; index++) {
    orderArray.push(gridImages[index].name);
  }

  const { data, error } = await supabase
    .from("carousels")
    .update({ carousel_order: orderArray })
    .eq("id", id);

  if (error) return error;
}

export async function getCarouselOrder(id) {
  let { data: carousel_order, error } = await supabase
    .from("carousels")
    .select("carousel_order")
    .eq("id", id);

  if (error) {
    console.log(error);
  }

  let deconstructedOrder = carousel_order[0].carousel_order;

  return deconstructedOrder;
}
