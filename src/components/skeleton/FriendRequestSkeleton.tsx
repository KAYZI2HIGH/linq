import React from 'react'
import { Skeleton } from '../ui/skeleton'

const FriendRequestSkeleton = () => {
  return (
    <section className="p-6 flex flex-col gap-4 bg-white rounded-[8px] shadow-sm">
      <Skeleton className="h-5 rounded-lg w-full max-w-[120px]" />
      <Skeleton className="h-[80px] rounded-sm w-full" />
    </section>
  );
}

export default FriendRequestSkeleton