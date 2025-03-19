"use client";
import supabase, { supabaseAdmin } from "@/lib/supabaseClient";
import { useSession } from "next-auth/react";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";

interface RequestContextType {
  notifyUser: string;
  friendRequests: User[];
  friendRequestsInfo: FriendRequest[];
  setNotifyUser: Dispatch<SetStateAction<string>>;
  setFriendRequestsInfo: Dispatch<SetStateAction<FriendRequest[]>>;
  setFriendRequests: Dispatch<SetStateAction<User[]>>;
  friendList: User[];
  setFriendList: Dispatch<SetStateAction<User[]>>;
  friendChat: Chat[];
  setFriendChat:  Dispatch<SetStateAction<Chat[]>>
}

const notifyContext = createContext<RequestContextType | undefined>(undefined);

export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifyUser, setNotifyUser] = useState("");
  const [friendRequestsInfo, setFriendRequestsInfo] = useState<FriendRequest[]>(
    []
  );
  const [friendRequests, setFriendRequests] = useState<User[]>([]);
  const [acceptedFriendRequests, setAcceptedFriendRequests] = useState<
    FriendRequest[]
  >([]);
   const [friendChat, setFriendChat] = useState<Chat[]>([]);
   const [friendList, setFriendList] = useState<User[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    setTimeout(() => {
      setNotifyUser('')
    }, 2000);
  }, [notifyUser])

  useEffect(() => {
    const fetch = async () => {
      const { data: request, error: requestError } = await supabase
        .from("friendships")
        .select()
        .eq("receiver_email", session?.user?.email)
        .eq("status", "pending");

      if (requestError) {
        throw new Error(requestError.message);
      }

      const friendDetails: User[] = await Promise.all(
        request.map(async (friend) => {
          const { data, error } = await supabaseAdmin
            .schema("next_auth")
            .from("users")
            .select()
            .eq("email", friend.sender_email)
            .single();

          if (error) {
            throw new Error(error.message);
          }

          return data;
        })
      );
      console.log(friendDetails);
      console.log(request);
      if (friendRequests.length === 0) {
        setFriendRequests(friendDetails);
      }
      if (friendRequestsInfo.length === 0) {
        setFriendRequestsInfo(request);
      }
    };
    const fetchFriendList = async () => {
      const { data: request, error: requestError } = await supabase
        .from("friendships")
        .select()
        .or(
          `receiver_email.eq.${session?.user?.email},sender_email.eq.${session?.user?.email}`
        )
        .eq("status", "accepted");

      if (requestError) {
        throw new Error(requestError.message);
      }
      if (acceptedFriendRequests.length === 0) {
        setAcceptedFriendRequests(request);
      }
    };
    fetch();
    fetchFriendList();
  }, [session]);

  useEffect(() => {
    const updateFriend = async () => {
      const friendDetails: User[] = await Promise.all(
        acceptedFriendRequests
          .filter(
            (friend) =>
              friend.receiver_email === session?.user?.email ||
              friend.sender_email === session?.user?.email
          )
          .map(async (friend) => {
            const email =
              friend.receiver_email === session?.user?.email
                ? friend.sender_email
                : friend.receiver_email;

            const { data, error } = await supabaseAdmin
              .schema("next_auth")
              .from("users")
              .select()
              .eq("email", email)
              .single();

            if (error) {
              throw new Error(error.message);
            }

            return data;
          })
      );

      setFriendList(friendDetails);
    };
    updateFriend();
  }, [acceptedFriendRequests]);

  useEffect(() => {
    if (notifyUser === "newRequest") {
      toast.success("New friend request received!");
    } else if (notifyUser === "requestAccepted") {
      toast.info("Your request has been accepted!");
    } else if (notifyUser === "requestDenied") {
      toast.warning("Your request was declined.");
    }
  }, [notifyUser]);

  useEffect(() => {
    if (!session?.user?.email) return;

    const channel = supabase
      .channel("friend_requests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "friendships" },
        (payload) => {
          console.log(payload.new);

          setFriendRequestsInfo((prev) => {
            let updatedRequests = [...prev];

            if (
              payload.eventType === "INSERT" &&
              payload.new.receiver_email === session?.user?.email
            ) {
              setNotifyUser("newRequest");
              updatedRequests.push(payload.new as FriendRequest);
            }

            if (payload.eventType === "UPDATE") {
            setAcceptedFriendRequests((prev) => [...prev, payload.new as FriendRequest]
            );
              updatedRequests = updatedRequests.map((req) =>
                req.id === payload.new.id ? { ...req, ...payload.new } : req
              );
              if (payload.new.sender_email === session?.user?.email) {
                setNotifyUser("requestAccepted");
              }
            }

            if (payload.eventType === "DELETE") {
              updatedRequests = updatedRequests.filter(
                (req) => req.id !== payload.old.id
              );
              if (payload.old.sender_email === session?.user?.email) {
                setNotifyUser("requestDenied");
              }
            }

            console.log(friendRequestsInfo); // Log after state update attempt
            return updatedRequests;
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [session?.user?.email]);

  useEffect(() => {
    const fetchUser = async () => {
      if (friendRequestsInfo.length > 0) {
        try {
          const friendDetails = await Promise.all(
            friendRequestsInfo
              .filter((friend) => friend.status !== "accepted")
              .map(async (friend) => {
                const { data, error } = await supabaseAdmin
                  .schema("next_auth")
                  .from("users")
                  .select("*")
                  .eq("email", friend.sender_email)
                  .single();

                if (error) throw new Error(error.message);
                return data;
              })
          );

          setFriendRequests(friendDetails);
          console.log(friendDetails);
        } catch (error) {
          console.error("Error fetching friend details:", error);
        }
      } else {
        setFriendRequests([]);
      }
    };

    fetchUser();
  }, [friendRequestsInfo]);

 

  useEffect(() => {
    if (!session?.user?.email) return;

    const channel = supabase
      .channel("chats")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chats" },
        (payload) => {
          console.log(payload.new);

          setFriendChat((prev) => {
            const updatedRequests = [...prev];

            if (payload.eventType === "INSERT") {
              updatedRequests.push(payload.new as Chat);
              console.log("new user added");
            }

            return updatedRequests;
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [session?.user?.email]);

  useEffect(() => {
    const fetch = async () => {
      const friends: User[] = await Promise.all(
        friendChat.map(async (chat) => {
          const friendEmail =
            chat.user1 === session?.user?.email ? chat.user2 : chat.user1;
          const { data: friend, error: friendError } = await supabaseAdmin
            .schema("next_auth")
            .from("users")
            .select()
            .eq("email", friendEmail)
            .single();

          if (friendError) {
            throw new Error("Error fetching chats", friendError);
          }
          return friend;
        })
      );
      setFriendList(friends);
    };
    fetch();
  }, [friendChat]);

  useEffect(() => {
    console.log(friendRequests);
  }, [friendRequests]);

  return (
    <notifyContext.Provider
      value={{
        notifyUser,
        setNotifyUser,
        friendRequests,
        friendRequestsInfo,
        setFriendRequests,
        setFriendRequestsInfo,
        friendList,
        friendChat,
        setFriendChat,
        setFriendList
      }}
    >
      {children}
    </notifyContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(notifyContext);
  if (!context) {
    throw new Error("useRequest must be used within a FriendRequest Provider");
  }
  return context;
};
