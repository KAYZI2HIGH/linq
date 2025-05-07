import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white px-6 py-4 flex items-center justify-between rounded-b-xl border-t">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Linq Logo"
          width={40}
          height={40}
        />
        <span className="text-black font-medium text-lg">Linq</span>
      </div>

      <p className="text-sm text-gray-500">
        Built by{" "}
        <Link
          href="https://kayzi.vercel.app/"
          className="underline hover:text-gray-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kayzi
        </Link>{" "}
        • Hosted on{" "}
        <Link
          href="https://vercel.com"
          className="underline hover:text-gray-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel
        </Link>
        .
      </p>
    </footer>
  );
};

export default Footer;
