'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from '@hookform/resolvers/zod';
import { Globe, Loader2 } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { SUPPORTEDLANGUAGE } from '@/lib/constant';
import { Checkbox } from './ui/checkbox';

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language",
  }),
});

const LanguagePreference = () => {
  
 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: "en",
    },
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 flex flex-col gap-4 bg-white rounded-[8px] shadow-sm"
      >
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
                onValueChange={field.onChange}
                defaultValue={field.value}
                
              >
                <FormControl>
                  <SelectTrigger className="w-full max-w-[400px]">
                    <SelectValue placeholder="Select a verified email to display" />
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
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal"
          >
            Automatically translate incoming messages
          </label>
        </div>
      </form>
    </Form>
  );
}

export default LanguagePreference;