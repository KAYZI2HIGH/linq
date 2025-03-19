"use client";
import { PlusIcon, Send } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/lib/supabaseClient";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {nanoid} from 'nanoid'
import { Input } from "../ui/input";
import { useMessageContext } from "@/contexts/MessagesContext";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

const ChatInput = ({ chatId }: { chatId: string }) => {

  const { data: session } = useSession()
  
  const {setMessages} = useMessageContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const { formState: { isSubmitting } } = form

  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { message } = data;

      const { data: chat, error } = await supabase
        .from("chats")
        .select()
        .eq("id", chatId)
        .single();

      if (error) {
        toast.error("Error retrieving chat data!");
        throw new Error("Error retrieving chat data", error);
      }

      const friendEmail =
        chat.user1 === session?.user?.email ? chat.user2 : chat.user1 as string;
      
      const messageContent = {
        id: nanoid(),
        sender_email: session?.user?.email || '',
        receiver_email: friendEmail,
        content: message,
        created_at: new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "+00"),
      };

      setMessages(prev => [...prev, messageContent])

      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, messageContent }),
      });

      console.log(res)


      form.reset();

      supabase
        .from("messages")
        .insert([
          {
            chat_id: chatId,
            sender_email: session?.user?.email,
            receiver_email: friendEmail,
            content: message,
          },
        ])
        .then(({ error: insertError }) => {
          if (insertError) {
            toast.error("Error sending a message!");
            console.error("Error sending a message:", insertError);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <section className="p-4 flex items-center border-t">
      <Button
        type="button"
        variant="ghost"
        className="p-2 mr-1"
      >
        <PlusIcon size={25} />
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex w-full items-center"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    autoComplete="off"
                    disabled={isSubmitting}
                    placeholder="Type a message"
                    className="flex-1 border-[#E5E7EB] bg-[#F9FAFB] max-h-[40px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className="size-[30px] rounded-full ml-2"
          >
            <Send size={25} />
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ChatInput;
