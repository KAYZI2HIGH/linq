import AddFriendForm from "@/components/AddFriendForm";
import FriendRequestList from "@/components/FriendRequestList";
import FriendRequestSkeleton from "@/components/skeleton/FriendRequestSkeleton";
import { Suspense } from "react";

const FriendPage = () => {
  return (
    <>
        <AddFriendForm />
        <Suspense fallback={<FriendRequestSkeleton />}>
          <FriendRequestList />
        </Suspense>
    </>
  );
};

export default FriendPage;
