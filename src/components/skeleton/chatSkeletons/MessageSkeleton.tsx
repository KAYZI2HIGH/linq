import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const MessageSkeleton = () => {
  return (
    <section className="flex-1 flex flex-col overflow-y-scroll p-4 gap-4 w-full hide_scrollbar">
      <Skeleton className='w-[50%] h-[30px] rounded-lg ml-auto'/>
      <Skeleton className='w-[60%] h-[60px] rounded-lg ml-auto'/>
      <Skeleton className='w-[60%] h-[80px] rounded-lg'/>
      <Skeleton className='w-[55%] h-[50px] rounded-lg ml-auto'/>
      </section>
  )
}

export default MessageSkeleton