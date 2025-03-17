'use client'
import { useNotify } from '@/contexts/FriendRequestContext'

const FriendRequestNumber = () => {
  const { friendRequests } = useNotify()
  return friendRequests.length
}

export default FriendRequestNumber