'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Globe, Loader2 } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';


const FormSchema = z.object({
  messages: z.boolean().default(false).optional(),
  friendRequest: z.boolean(),
  update: z.boolean(),
});

const NotificationSettings = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      messages: true,
      friendRequest: true,
      update: false,
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 flex flex-col gap-4 bg-white rounded-[8px] shadow-sm"
      >
        <div className="flex gap-2 items-center ">
          <Bell className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
        <FormField
          control={form.control}
          name="messages"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between px-1">
              <div className="space-y-0.5">
                <FormLabel className='font-normal'>Messages</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="friendRequest"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between px-1">
              <div className="space-y-0.5">
                <FormLabel className='font-normal'>Friend Requests</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="update"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between px-1">
              <div className="space-y-0.5">
                <FormLabel className='font-normal'>Updates</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default NotificationSettings;