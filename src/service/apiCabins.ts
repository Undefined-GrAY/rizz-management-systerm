// import type { CabinProps, CabinApiType } from "../types";
import type {
  Cabin,
  CabinFormData,
  CabinsResponse,
  NumericValue,
} from "../types/types";
import { PAGE_SIZE } from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";

interface GetCabinProp {
  page: number;
}

export async function getCabins({
  page,
}: GetCabinProp): Promise<CabinsResponse> {
  //const { data: cabins, error }
  let query = supabase
    .from("cabins")
    .select(
      "id, name, maxCapacity, regularPrice, discount, description, image",
      { count: "exact" },
    );

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return { data, count } as CabinsResponse;
}

export async function addCabin(newCabin: CabinFormData) {

  //https://lqkufapunkyvvoafwlbk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //the at.() method only work on actual array
  //const cabinData = { ...newCabin, image: newCabin.image.name.at(0) };
  const imageFile = newCabin.image[0];

  const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageFile);

  //if cabin image is not uploaded
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin could image not be uploaded and cabin was not created",
    );
  }

  return data as Cabin;
}

export async function deleteCabin(id: NumericValue): Promise<Cabin> {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id).select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }

  return data as Cabin;
}
