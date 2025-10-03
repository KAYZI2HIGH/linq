"use server";

import { auth } from "@/auth";
import supabase from "./supabaseClient";
import { notFound } from "next/navigation";
import { translateText } from "./translate";

export const UpdateSettings = async ({
  userId,
  setting,
  UpdateSettings,
}: {
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

export const GetUserSettings = async (
  userId: string | null
): Promise<UserSettings> => {
  const { data } = await supabase
    .from("user_settings")
    .select()
    .eq("id", userId)
    .single();

  return data;
};

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

  return { friends, chats };
};

export async function getChat(chatId: string) {
  try {
    const { data: chat, error } = await supabase
      .from("chats")
      .select()
      .eq("id", chatId)
      .single();

    if (error) {
      console.error("Error fetching chat:", error);
      throw new Error("Error fetching chat");
    }

    if (!chat) {
      notFound();
    }

    return chat;
  } catch (error) {
    console.error("Error in getChat:", error);
    throw error;
  }
}

export async function getFriendInfo(email: string) {
  try {
    const { data: friendInfo, error } = await supabase
      .from("user_settings")
      .select()
      .eq("email", email)
      .single();

    if (error) {
      console.error("Error fetching friend information:", error);
      throw new Error("Error fetching friend information");
    }

    if (!friendInfo) {
      notFound();
    }

    return friendInfo;
  } catch (error) {
    console.error("Error in getFriendInfo:", error);
    throw error;
  }
}


export async function getMessages(chatId: string) {
  try {
    const messagesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/get/${chatId}`,
      { cache: "no-store" }
    );

    if (!messagesRes.ok) {
      throw new Error("Failed to fetch messages");
    }

    const { messages } = await messagesRes.json();
    return messages || [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Error fetching messages");
  }
}

export async function getProcessedMessages(chatId: string) {
  try {
    const session = await auth();
    const messages = await getMessages(chatId);
    const settings = await GetUserSettings(session?.user?.id || null);

    if (!messages || messages.length === 0) {
      return [];
    }

    let processedMessages = [...messages];

    // Handle translation if auto-translate is enabled
    if (settings?.auto_translate && settings.default_language) {
      const foreignMessages = messages.filter(
        (msg: Message) => msg.isTranslated !== true
      );
      const messagesToTranslate = foreignMessages.slice(-10);

      const translatedMessages = await Promise.all(
        messagesToTranslate.map(async (msg: Message) => {
          try {
            return {
              ...msg,
              content: await translateText(
                msg.content,
                settings.default_language
              ),
              isTranslated: true,
            };
          } catch (error) {
            console.error(`Translation failed for message ${msg.id}`);
            return msg;
          }
        })
      );

      processedMessages = messages.map((msg: Message) => {
        const translatedMsg = translatedMessages.find((m) => m.id === msg.id);
        return translatedMsg || msg;
      });
    }

    return processedMessages;
  } catch (error) {
    console.error("Error processing messages:", error);
    throw error;
  }
}