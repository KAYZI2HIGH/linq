import React from "react";
import { MessageCircleIcon, Clock4Icon, Workflow } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4 py-10 md:py-4">
      <div className="max-w-2xl w-full text-center space-y-10">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Logo"
          height={70}
          width={70}
          className="h-12 mx-auto mb-6"
        />
        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide">
            Chat Features Coming Soon
          </h1>
          <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
            We&apos;re working hard to bring you a revolutionary chat experience
            without language barriers.
          </p>
        </div>
        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex flex-col items-center space-y-2">
            <MessageCircleIcon className="h-6 w-6 text-gray-900" />
            <h3 className="text-sm font-medium text-gray-900">
              Real-time Chat
            </h3>
            <p className="text-xs text-gray-500">
              Connect instantly with anyone
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="h-6 w-6 text-gray-900" />
            <Workflow className="h-6 w-6 text-gray-900" />
            <h3 className="text-sm font-medium text-gray-900">
              Auto Translation
            </h3>
            <p className="text-xs text-gray-500">Break language barriers</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Clock4Icon className="h-6 w-6 text-gray-900" />
            <h3 className="text-sm font-medium text-gray-900">Coming Soon</h3>
            <p className="text-xs text-gray-500">Stay tuned for updates</p>
          </div>

        </div>
        <div>
          <Button asChild>
            <Link href={'/dashboard/friends'}>Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
