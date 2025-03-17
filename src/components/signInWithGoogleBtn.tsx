'use client'

export const dynamic = "force-dynamic"; // Disables Next.js caching

import { Button } from './ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

const SignInWithGoogleBtn = () => {
  return (
    <Button
      variant={"outline"}
      className="w-full max-w-[4`50px] py-5 cursor-pointer"
      onClick={() => signIn("google", {
        redirectTo: '/dashboard/chats'
      })}
    >
      <FcGoogle className="size-[20px]" />
      Continue with Google
    </Button>
  );
}

export default SignInWithGoogleBtn