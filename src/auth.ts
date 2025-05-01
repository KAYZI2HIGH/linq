import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { AdapterUser } from "next-auth/adapters";
import supabase from "./lib/supabaseClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async signIn({ user }) {
      const userId = (user as AdapterUser).id;
      const name = user.name ?? null;
      const email = user.email ?? null;

      const { data: settings, error } = await supabase
        .from("user_settings")
        .select()
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching settings:", error.message);
        return false; // deny sign in if DB is down or unexpected error
      }

      if (!settings) {
         const avatars = [
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Felix",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Leo",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Destiny",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jude",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Christopher",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Ryan",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jade",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Aiden",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Eliza",
           "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jack",
         ];

         const randomIndex = Math.floor(Math.random() * avatars.length);
        const randomAvatar = avatars[randomIndex];
        
        const { error: insertError } = await supabase
          .from("user_settings")
          .insert([
            {
              id: userId,
              display_name: name,
              email: email,
              image: randomAvatar,
            },
          ]);

        if (insertError) {
          console.error("Error inserting new settings:", insertError.message);
          return false;
        }
      }

      return true;
    },

    async session({ session, token }) {
      const userId = token.sub;

      const { data: settings } = await supabase
        .from("user_settings")
        .select("display_name, email, image")
        .eq("id", userId)
        .single();

      session.user.id = userId!;
      session.user.name = settings?.display_name || session.user.name;
      session.user.email = settings?.email || session.user.email;
      session.user.image = settings?.image || null

      return session;
    },
  },
  trustHost: true,
});
