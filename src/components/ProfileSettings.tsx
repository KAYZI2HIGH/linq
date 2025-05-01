"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Loader2, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./ui/input";
import { Session } from "next-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateSettings } from "@/lib/actions";

const FormSchema = z.object({
  name: z.string({
    required_error: "Please enter a name",
  }),
  email: z.string({
    required_error: "Please enter a valid email",
  }),
});

const ProfileSettings = ({
  session,
  data,
}: {
  session: Session | null;
  data: UserSettings | null;
}) => {
  const { mutate } = useMutation({
    mutationFn: UpdateSettings,
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.display_name || "",
      email: data?.email || "",
    },
  });

  const queryClient = useQueryClient();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { id: userId } = session?.user || {};
    if (!userId) {
      toast.error("User not found");
      return;
    }
    const { name, email } = data;
    if (name === "") {
      toast.error("Please enter a name");
      return;
    }
    if (email === "") {
      toast.error("Please enter a valid email");
      return;
    }

    mutate(
      {
        userId,
        setting: "display_name",
        UpdateSettings: name,
      },
    );
    mutate(
      {
        userId,
        setting: "email",
        UpdateSettings: email,
      },
    );
    queryClient.invalidateQueries({ queryKey: ["user_settings"] });
    toast.success("Profile updated successfully!");
  }

  return (
    <Form {...form}>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }
        }}
        className="p-6 flex flex-col gap-4 bg-white rounded-[8px] shadow-sm"
      >
        <div className="flex gap-2 items-center ">
          <User className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Profile</h2>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your name "
                  className="w-full max-w-[500px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Click enter to submit</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="example@gmail.com"
                  className="w-full max-w-[500px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Click enter to submit</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProfileSettings;
