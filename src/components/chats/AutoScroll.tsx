"use client";
import { useEffect, useRef } from "react";

const AutoScroll = () => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return <div ref={chatEndRef} />;
};

export default AutoScroll;
