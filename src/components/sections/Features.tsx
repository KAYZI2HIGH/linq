import React from "react";
import { HoverEffect } from "../ui/card-hover-effect";

const Features = () => {
  return (
    <div id='features' className="w-full mx-auto py-10 px-8 md:px-[50px] bg-[#FAFAFA] space-y-5">
      <div className="max-w-[1040px] mx-auto space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-wide">
          Features
        </h2>
        <p className="text-[14px] md:text-lg max-w-[700px] w-full mx-auto md:font-medium font-light text-gray-600 text-center">
          Linq tests Next.js 14&apos;s full potential—blending AI translation,
          real-time chats, and secure auth in one seamless experience.
        </p>
       
        <HoverEffect />
      </div>
    </div>
  );
};

export default Features;
