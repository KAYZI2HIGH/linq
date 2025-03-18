"use client";
import { PlusIcon, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/lib/supabaseClient";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

const ChatInput = ({ chatId }: { chatId: string }) => {
  const {data: session} = useSession()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    const {message} = data
    const { data: chat, error } = await supabase.from('chats').select().eq('id', chatId).single()
    if (error) {
      toast.error('Error retrieving chat data!')
      throw new Error('Error retrieving chat data', error)
    }
    const friendEmail = chat.user1 === session?.user?.email ? chat.user2 : chat.user1
    const { error: insertError } = await supabase.from('messages').insert([{
      chat_id: chatId,
      sender_email: session?.user?.email,
      receiver_email: friendEmail,
      content: message
    }])
    if (insertError) {
      toast.error("Error sending a message!");
      throw new Error('Error sending a message!', insertError)
    }
    form.reset();
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
                  <Textarea
                    placeholder="Type a message"
                    className="flex-1 border-[#E5E7EB] bg-[#F9FAFB] max-h-[40px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
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
