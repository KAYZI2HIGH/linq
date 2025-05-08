"use server";

import { auth } from "@/auth";
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


export const GetUserSettings = async (userId: string | null): Promise<UserSettings> => {
  const {data} = await supabase
    .from("user_settings")
    .select()
    .eq("id", userId)
    .single()
  
  return data
}

export const GetFriendList = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const { data: chats, error } = await supabase
    .from("chats")
    .select()
    .or(`user1.eq.${session?.user?.email},user2.eq.${session?.user?.email}`);

  if (error) {
    throw new Error(error.message);
  }

  const friends: UserSettings[] = await Promise.all(
    chats.map(async (chat) => {
      const friendEmail =
        chat.user1 === session?.user?.email ? chat.user2 : chat.user1;
      const { data: friend, error: friendError } = await supabase
        .from("user_settings")
        .select()
        .eq("email", friendEmail)
        .single();

      if (friendError) {
        throw new Error("Error fetching chats", friendError);
      }
      return friend;
    })
  );

  return {friends, chats};
 }