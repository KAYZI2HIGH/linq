interface User {
  id: string,
  name: string,
  email: string,
  emailVerified?: string | null,
  image: string
}

interface FriendRequest {
  id: string,
  created_at: string,
  status: string,
  sender_email: string,
  receiver_email: string
}