import React from 'react'
import ChatMessageBox from './ChatMessageBox';

const ChatMessageBoxContainer = async ({ chatId }: { chatId: string }) => {
  const res = await fetch(`http://localhost:3000/api/messages/get/${chatId}`);
  console.log(res)
  const data = await res.json();
  console.log(data.messages, "Fetched from:", data.source);
  
  const { messages } = data
  return (
    <ChatMessageBox initialMessages={messages} chatId={chatId} />
  )
}

export default ChatMessageBoxContainer