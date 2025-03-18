import { auth } from "@/auth";
import ListFriends from "./ListFriends";
import supabase, { supabaseAdmin } from "@/lib/supabaseClient";
import { SidebarMenu } from "./ui/sidebar";

const FriendListContainer = async ({className}: {className?: string}) => {
  const session = await auth();

  const { data: chats, error } = await supabase
    .from("chats")
    .select()
    .or(`user1.eq.${session?.user?.email},user2.eq.${session?.user?.email}`);

  if (error) {
    throw new Error(error.message);
  }


  const friends: User[] = await Promise.all(
    chats.map(async (chat) => {
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
  console.log(friends);
  return (
    <ListFriends
      initialFriends={friends}
      initialChats={chats}
      className={className}
    />
  );
};

export default FriendListContainer;
