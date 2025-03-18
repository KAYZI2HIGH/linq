import { auth } from "@/auth";
import messages from "@/lib/constant";
import { formatTimestamp } from "@/utils/FormatTimeStamps";
import AutoScroll from "./AutoScroll";
import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";

const ChatMessageBox = async ({chatId}: {chatId: string}) => {
  const session = await auth();
  const { data: messages, error: messagesError } = await supabase.from('messages').select().eq("chat_id", chatId)

  if (messagesError) {
    toast.error('Error fetching messages!')
    throw new Error('Error fetching messages!', messagesError)
  }
  
  return (
    <section className="flex-1 flex flex-col overflow-y-scroll p-4 gap-4 w-full hide_scrollbar">
      {messages && messages.map((msg) => {
        return (
          <div
            className={`flex flex-col gap-1 px-4 py-2 rounded-xl w-fit max-w-[70%] min-w-[150px] ${
              session?.user?.email === msg.sender_email
                ? "bg-[#111827] ml-auto text-white"
                : "bg-[#F3F4F6] text-black"
            }`}
          >
            <h1 className="text-xs">{msg.content}</h1>
            <p
              className={`ml-auto text-[10px] tracking-wide ${
                session?.user?.email === msg.sender_email
                  ? "text-[#D1D5DB]"
                  : "text-[#6B7280]"
              }`}
            >
              {formatTimestamp(msg.created_at)}
            </p>
          </div>
        );
      })}
      <AutoScroll/>
    </section>
  );
};

export default ChatMessageBox;
