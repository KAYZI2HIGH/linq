"use server";

import supabase from "./supabaseClient";

export const UpdateSettings = async ({ userId, setting, UpdateSettings }: {
  userId: string | null;
  setting: string;
  UpdateSettings: string | boolean;

}) => {
  const { data: settings, error } = await supabase
    .from("user_settings")
    .select()
    .eq("id", userId)
    .single();
  if (error) {
    throw new Error(error.message);

  }
  if (!settings) {
    throw new Error("User settings not found");

  }

  const { error: updateError } = await supabase
    .from("user_settings")
    .update({
      [setting]: UpdateSettings,
    })
    .eq("id", userId);
  if (updateError) { 
    throw new Error(updateError.message);
  }


  return {
    message: "Settings updated successfully",
  };
};


export const GetUserSettings = (userId: string | null) => {
  return supabase
    .from("user_settings")
    .select()
    .eq("id", userId)
    .single()
    .then(({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return data;
    });
}