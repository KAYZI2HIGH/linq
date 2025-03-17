
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignInWithGoogleBtn from "@/components/signInWithGoogleBtn";
import { auth } from "@/auth";

const LoginPage = async() => {
  const session = await auth()
  console.log(session)
  return (
    <section className="flex w-full h-full max-h-screen overflow-hidden">
      <div className="flex-1 h-screen relative hidden md:block">
        <Image
          className="object-cover"
          src={"/siginBg.jpg"}
          alt="signin-background"
          fill
        />
      </div>
      <div className="flex-1 h-screen overflow-y-scroll hide_scrollbar flex items-center md:items-start">
        <div className="space-y-[64px] w-full px-[64px] md:py-[64px] ">
          <div className="space-y-8 md:space-y-12 ">
            {" "}
            <Image
              src={"/logo.png"}
              alt="Linq Logo"
              height={80}
              width={80}
              className="size-[64px] md:size-[80px] mx-auto md:mx-0"
            />
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-2xl md:text-3xl font-bold text-center sm:text-left text-[#111827]">
                  Welcome back
                </h1>
                <p className="text-center sm:text-left text-[#4B5563] text-sm font-medium">
                  Sign in to start chatting without barriers
                </p>
              </div>
              
              <SignInWithGoogleBtn/>
              <div className="flex justify-center md:justify-start gap-4">
                <p className="text-[#6B7280] text-xs">Don't have an account?</p>
                <Link
                  href={"/contact"}
                  className="text-black text-xs font-medium hover:underline"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-fit mx-auto md:mx-0">
            <p className="text-[#6B7280]  text-xs text-center">©2025</p>
            <p className="text-[#6B7280]  text-xs text-center">
              Linq. All rights
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
