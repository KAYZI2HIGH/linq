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

interface Chat {
  id: string;
  created_at: string,
  user1: string,
  user2: string
}