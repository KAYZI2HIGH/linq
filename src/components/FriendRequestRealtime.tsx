"use client";

import { useEffect, useState } from "react";
import ProfileAvatar from "./Avatar";
import { Button } from "./ui/button";
import { Check, Loader2, X } from "lucide-react";
import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useNotify } from "@/contexts/FriendRequestContext";

export default function FriendRequestRealtime() {
  const {
    friendRequests,
    friendRequestsInfo,
    setFriendRequests
  } = useNotify();
  useEffect(() => {
    console.log('component rerenders', friendRequests)
  }, [friendRequests])
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const { data: session } = useSession();

  const addFriend = async (email: string) => {
    setAcceptLoading(true);
    const { data: pendingFriendship, error: pendingFriendshipError } =
      await supabase
        .from("friendships")
        .select()
        .or(
          `and(sender_email.eq.${session?.user?.email},receiver_email.eq.${email}),and(sender_email.eq.${email},receiver_email.eq.${session?.user?.email})`
        )
        .eq("status", "pending")
        .single();

    if (pendingFriendshipError) {
      setAcceptLoading(false);
      toast.error("Something went wrong!");
      throw new Error(pendingFriendshipError?.message);
    }
    if (pendingFriendship) {
      const { data, error } = await supabase
        .from("friendships")
        .update({ status: "accepted" })
        .eq("sender_email", email)
        .eq("receiver_email", session?.user?.email);

      if (error) {
        setAcceptLoading(false);
        toast.error("Error accepting request");
        console.log(error);
      } else {
        setAcceptLoading(false);
        toast.success("Friend request accepted");
      }
      setAcceptLoading(false);
    }
  };

  const removeFriend = async (email: string) => {
    setRejectLoading(true);
    const { data: pendingFriendship, error: pendingFriendshipError } =
      await supabase
        .from("friendships")
        .select()
        .or(
          `and(sender_email.eq.${session?.user?.email},receiver_email.eq.${email}),and(sender_email.eq.${email},receiver_email.eq.${session?.user?.email})`
        )
        .eq("status", "pending")
        .single();

    if (pendingFriendshipError) {
      setRejectLoading(false);
      toast.error("Something went wrong!");
      throw new Error(pendingFriendshipError?.message);
    }
    if (pendingFriendship) {
      setRejectLoading(false);
      const { error } = await supabase
        .from("friendships")
        .delete()
        .eq("sender_email", email)
        .eq("receiver_email", session?.user?.email);

      if (error) {
        setRejectLoading(false);
        toast.error("Error denying the request");
        console.log(error);
      } else {
        setRejectLoading(false);
        toast.success("Friend request denied!");
      }
      setRejectLoading(false);
    }
  };

    console.log(friendRequests);
    console.log(friendRequestsInfo);

  return (
    <>
      <h1 className="text-[#1F2937] text-sm font-medium">
        Friend Request({friendRequests.length})
      </h1>
      <div className="flex flex-col gap-2">
        {friendRequests.length === 0 && (
          <h1>You have no friend request at the moment.</h1>
        )}
        {friendRequests.length > 0 &&
          friendRequests.map((fr) => {
            return (
              <div
                key={fr?.id}
                className="p-4 bg-[#F9FAFB] hover:bg-[#eff5fb] cursor-pointer flex justify-between items-center rounded transition-all duration-200"
              >
                <div className="flex gap-4">
                  <ProfileAvatar
                    image={fr?.image}
                    name={fr?.name}
                  />
                  <div>
                    <h1 className="text-[#1F2937] text-sm font-medium capitalize max-w-[120px] truncate">
                      {fr?.name}
                    </h1>
                    <p className="text-[#6B7280] text-xs max-w-[160px] truncate">
                      {fr?.email}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    variant={"ghost"}
                    disabled={acceptLoading}
                    onClick={() => addFriend(fr.email)}
                  >
                    {acceptLoading ? (
                      <Loader2
                        size={25}
                        className="animate-spin"
                      />
                    ) : (
                      <Check
                        size={25}
                        className="text-green-500"
                      />
                    )}
                  </Button>
                  <Button
                    disabled={rejectLoading}
                    variant={"ghost"}
                    onClick={() => removeFriend(fr?.email)}
                  >
                    {rejectLoading ? (
                      <Loader2
                        size={25}
                        className="animate-spin"
                      />
                    ) : (
                      <X
                        size={25}
                        className="text-red-500"
                      />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
