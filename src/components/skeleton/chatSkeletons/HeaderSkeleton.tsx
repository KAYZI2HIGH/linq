import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { EllipsisVertical, Phone, Video } from 'lucide-react'
import React from 'react'

const HeaderSkeleton = () => {
  return (
     <section className="p-4 flex justify-between items-center border-b">
          <div className="flex gap-3 justify-center items-center">
            <SidebarTrigger/>
        <Skeleton
          className='size-[40px] rounded-full'
            />
            <div className="space-y-[2px]">
             <Skeleton className='w-[100px] h-[16px] rounded-lg'/>
             <Skeleton className='w-[37px] h-[14px] rounded-lg'/>

            </div>
          </div>
          <div className="flex">
            <Button variant={"ghost"} className="group">
              <Phone
                size={20}
                className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
              />
            </Button>
            <Button variant={"ghost"} className="group">
              <Video
                size={20}
                className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
              />
            </Button>
            <Button variant={"ghost"} className="group">
              <EllipsisVertical
                size={20}
                className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
              />
            </Button>
          </div>
        </section>
  )
}

export default HeaderSkeleton