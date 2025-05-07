"use client";
import { ArrowRight, ChevronRight, Github } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { globeConfig, sampleArcs } from "@/lib/constant";
import { cn } from "@/lib/utils";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full lg:h-[500px] lg:w-[550px] max-lg:mx-auto animate-pulse bg-gray-200 rounded-md" />
  ),


});

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-10 items-center lg:justify-between max-lg:pt-10 pb-10 relative px-8 md:px-[50px]">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="flex-1 flex flex-col gap-3 lg:gap-5 min-w-fit z-20">
        <div className="flex gap-3 max-lg:mx-auto">
          <div className="rounded-full px-[14px] py-[2px] bg-gray-100 tracking-wide font-semibold text-[12px]">
            What's new
          </div>
          <div className="flex gap-[2px] text-[12px] text-gray-500 items-center">
            Just shipped v1.0 <ChevronRight size={14} />
          </div>
        </div>
        <h1 className="font-extrabold text-[40px] lg:text-[50px] leading-tight tracking-wider text-center lg:text-left md:max-w-[500px]">
          Chat Without Language Barriers
        </h1>
        <p className="font-light text-gray-400 text-center lg:text-left lg:max-w-[500px]">
          AI powered translation for seamless cross-language conversations. No
          more copy-pasting into translators; just chat naturally.
        </p>
        <div className="flex gap-4 mt-5 max-lg:mx-auto">
          <Button
            className="font-medium py-3"
            asChild
          >
            <Link
              href="/dashboard/chats"
              className="flex items-center gap-2"
            >
              Get Started <ArrowRight />
            </Link>
          </Button>
          <Button
            className="py-3 bg-gray-200 shadow-none text-black font-semibold tracking-wider hover:bg-gray-300 transition-all duration-200 ease-in-out"
            asChild
          >
            <Link
              href="https://github.com/KAYZI2HIGH/linq"
              className="flex items-center gap-2"
            >
              Github <Github />
            </Link>
          </Button>
        </div>
      </div>
      <div className="h-96 w-full  lg:h-[500px] lg:w-[550px] max-lg:mx-auto">
        <World
          globeConfig={globeConfig}
          data={sampleArcs}
        />
      </div>
    </section>
  );
};

export default Hero;
