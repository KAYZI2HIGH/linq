import { auth } from "@/auth";
import React from "react";
import ProfileAvatar from "../Avatar";
import { EllipsisVertical, Phone, Video } from "lucide-react";
import { Button } from "../ui/button";
import supabase from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import BackButton from "../BackButton";

const ChatsHeader = async ({ chatId }: { chatId: string }) => {
  const session = await auth();

  const { data: chat, error } = await supabase
    .from("chats")
    .select()
    .eq("id", chatId)
    .single();

  if (error) throw new Error("Error fetching chat", error);

  if (!chat) notFound();

  const friendEmail =
    chat.user1 === session?.user?.email ? chat.user2 : chat.user1;

  const { data: friendInfo, error: friendInfoError } = await supabase
    .from("user_settings")
    .select()
    .eq("email", friendEmail)
    .single();

  if (friendInfoError) throw new Error("Error fetching friend Information", friendInfoError);

  if (!friendInfo) notFound();

  return (
    <section className="p-4 flex justify-between items-center border-b">
      <div className="flex gap-3 justify-center items-center">
        <BackButton/>
        <ProfileAvatar
          image={friendInfo?.image || ""}
          name={friendInfo?.display_name || ""}
        />
        <div className="space-y-[2px]">
          <h1 className="text-[#111827] font-medium tracking-wide text-xs capitalize">
            {friendInfo?.display_name}
          </h1>
          <p className="text-[#6B7280] text-[10px] capitalize ">online</p>
        </div>
      </div>
      <div className="flex">
        <Button
          variant={"ghost"}
          className="group"
        >
          <Phone
            size={20}
            className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
          />
        </Button>
        <Button
          variant={"ghost"}
          className="group"
        >
          <Video
            size={20}
            className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
          />
        </Button>
        <Button
          variant={"ghost"}
          className="group"
        >
          <EllipsisVertical
            size={20}
            className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
          />
        </Button>
      </div>
    </section>
  );
};

export default ChatsHeader;
