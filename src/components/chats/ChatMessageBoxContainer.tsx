import React from 'react'
import ChatMessageBox from './ChatMessageBox';

const ChatMessageBoxContainer = async ({ chatId }: { chatId: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/get/${chatId}`, {
    cache: 'no-store',
    next: { revalidate: 0 },
  });
  console.log(res)
  
  const data = await res.json();
  console.log(data.messages, "Fetched from:", data.source);
  
  const { messages } = data
  return (
    <ChatMessageBox initialMessages={messages} chatId={chatId} />
  )
}

export default ChatMessageBoxContainer