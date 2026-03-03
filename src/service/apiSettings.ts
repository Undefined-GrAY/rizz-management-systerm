import supabase from "./supabase";
import type { Settings, SettingsType } from "../types/types";



export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data as Settings;
}

export async function updateSettngs(obj: SettingsType) {
  const { error } = await supabase
    .from("settings")
    .update(obj)
    .eq("id", 1)
    .select();

  if (error) {
    console.error(error);
    throw new Error("settings could not be updated");
  }

}
