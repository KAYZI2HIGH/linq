'use client'
import React from 'react'
import { Button } from './ui/button'
import {  ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()
  return (
    <Button onClick={() => router.back()} variant={'ghost'} className='px-1 py-1 rounded-full hover:bg-[#F3F4F6] transition-all duration-200'>
      <ChevronLeft size={'28px'}/>
    </Button>
  )
}

export default BackButton