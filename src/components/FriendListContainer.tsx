import ListFriends from "./ListFriends";
import { GetFriendList } from "@/lib/actions";

const FriendListContainer = async ({className}: {className?: string}) => {
  const {friends, chats} = await GetFriendList()

  return (
    <ListFriends
      initialFriends={friends}
      initialChats={chats}
      className={className}
    />
  );
};

export default FriendListContainer;
