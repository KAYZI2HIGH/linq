"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SUPPORTEDLANGUAGE } from "@/lib/constant";
import { Checkbox } from "./ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUserSettings, UpdateSettings } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import HashLoader from "react-spinners/HashLoader";

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language",
  }),
});

const LanguagePreference = ({ session, data }: {
  session: Session | null, data: UserSettings | null }) => {
  const queryClient = useQueryClient();

  
  const { mutate } = useMutation({
    mutationFn: UpdateSettings,
  });
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: "en",
    },
  });

  function onSubmit(data: string) {
    const { id: userId } = session?.user || {};
    if (!userId) return toast.error("User not found");
    const language = data;

    mutate(
      { userId, setting: "default_language", UpdateSettings: language },
      {
        onSuccess: () => {
          toast.success("Language preference updated successfully");
          queryClient.invalidateQueries({ queryKey: ["user_settings"] });
         
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  }


  return (
    <section className="p-6 bg-white rounded-[8px] shadow-sm">
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <div className="flex gap-2 items-center ">
            <Globe className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Language Preference</h2>
          </div>
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Languauge</FormLabel>
                <Select
                  onValueChange={(value) => {
                    onSubmit(value);
                    field.onChange(value);
                  }}
                  defaultValue={data?.default_language}
                >
                  <FormControl>
                    <SelectTrigger className="w-full max-w-[400px]">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SUPPORTEDLANGUAGE.map((language) => (
                      <SelectItem
                        key={language.code}
                        value={language.code}
                      >
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="terms"
          defaultChecked={data?.auto_translate}
          onCheckedChange={(checked) => {
            const { id: userId } = session?.user || {};
            if (!userId) return toast.error("User not found");

            mutate(
              {
                userId,
                setting: "auto_translate",
                UpdateSettings: checked,
              },
              {
                onSuccess: () => {
                  toast.success(
                    "Auto-translate preference updated successfully"
                  );
                },
                onError: (error) => {
                  toast.error(error.message);
                },
              }
            );
          }}
        />
        <label
          htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal"
        >
          Automatically translate incoming messages
        </label>
      </div>
    </section>
  );
};

export default LanguagePreference;
