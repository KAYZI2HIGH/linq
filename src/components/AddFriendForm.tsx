"use client";
import supabase from "@/lib/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  email: z.string().email(),
});

const AddFriendForm = () => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session) {
      redirect("/login");
    }
    const { user } = session;
    const { email: friendEmail } = values;

    if (user?.email === friendEmail) {
      form.setError("email", {
        message: "You cannot add yourselve as a friend.",
      });
      return;
    }
    const { data: friendship, error: friendshipError } = await supabase
      .from("friendships")
      .select()
      .or(
        `and(sender_email.eq.${user?.email},receiver_email.eq.${friendEmail}),and(sender_email.eq.${friendEmail},receiver_email.eq.${user?.email})`
      )
      .eq("status", "accepted");

    if (friendshipError) {
      throw new Error("Error checking friendship:", friendshipError);
    }

    if (friendship.length > 0) {
      form.setError("email", { message: "You are friends with this user" });
      return;
    }

    const { data: pendingFriendship, error: pendingFriendshipError } =
      await supabase
        .from("friendships")
        .select()
        .or(
          `and(sender_email.eq.${user?.email},receiver_email.eq.${friendEmail}),and(sender_email.eq.${friendEmail},receiver_email.eq.${user?.email})`
        )
        .eq("status", "pending");

    if (pendingFriendshipError) {
      throw new Error(pendingFriendshipError.message);
    }

    if (pendingFriendship && pendingFriendship.length > 0) {
      form.setError("email", {
        message: "Your request has been sent earlier, wait to be accepted.",
      });
      return;
    }

    const { error } = await supabase.from("friendships").insert([
      {
        sender_email: user?.email,
        receiver_email: friendEmail,
        status: "pending",
      },
    ]);

    if (error) {
      throw new Error("Error sending request:", error);
    } else {
      toast.success("Friend request sent!", {
        description: "Your request has been successfully delivered.",
        duration: 3000, // Auto-closes after 3s
        position: "top-right",
        style: {
          background: "#1e293b", // Dark background (Tailwind slate-800)
          color: "#f8fafc", // Light text (Tailwind slate-50)
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        },
      });
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-md">Add Friend by Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="friend@gmail.com"
                    className="pr-12"
                    {...field}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || !field.value}
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddFriendForm;
