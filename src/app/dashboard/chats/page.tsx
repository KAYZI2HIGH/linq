import React from "react";
import Image from "next/image";
import DashboardFloatingDock from "@/components/DashboardFloatingDock";
import { GetFriendList } from "@/lib/actions";
import ProfileAvatar from "@/components/Avatar";
import Link from "next/link";
import { auth } from "@/auth";

const ChatPage = async () => {
  const session = await auth();
  if (!session) {
    return (
      <section className="flex flex-col h-dvh">
        <div className="w-full bg-white flex flex-col items-center justify-center p-5 py-10 lg:py-4 flex-1 grow overflow-y-scroll">
          <div className="max-w-2xl w-full text-center space-y-10 h-full">
            <Image
              src="/logo.png"
              alt="Logo"
              height={70}
              width={70}
              className="h-12 mx-auto mb-6"
            />
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide">
                Please Sign In
              </h1>
              <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                You need to sign in to access your chats.
              </p>
            </div>
          </div>
        </div>
        <DashboardFloatingDock />
      </section>
    );
  }
  const { friends, chats: friendChat } = await GetFriendList();
  if (friends.length === 0) {
    return (
      <section className="flex flex-col h-dvh">
        <div className="w-full bg-white flex flex-col items-center justify-center p-5 py-10 lg:py-4 flex-1 grow overflow-y-scroll">
          <div className="max-w-2xl w-full text-center space-y-10">
            <Image
              src="/logo.png"
              alt="Logo"
              height={70}
              width={70}
              className="h-12 mx-auto mb-6"
            />
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide">
                No Friends Found
              </h1>
              <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                You can add friends to start chatting.
              </p>
            </div>
          </div>
        </div>
        <DashboardFloatingDock />
      </section>
    );
  }
  // If friends exist, render the chat page with features preview
  return (
    <section className="flex flex-col h-dvh">
      <div className="w-full bg-white flex flex-col items-center justify-center p-5 py-10 pb-3 lg:py-4">
        <div className="max-w-2xl w-full text-center space-y-10 h-full">
          <Image
            src="/logo.png"
            alt="Logo"
            height={70}
            width={70}
            className="h-12 mx-auto mb-6"
          />
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide">
              Chat with Friends
            </h1>
            <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
              Start chatting with your friends and enjoy the features.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-white flex flex-col p-5 py-10 lg:py-4 flex-1 grow overflow-y-scroll hide_scrollbar">
        {friends.map((friend) => {
          const chat = friendChat.find(
            (chat) =>
              (chat.user1 === session?.user?.email &&
                chat.user2 === friend.email) ||
              (chat.user1 === friend.email &&
                chat.user2 === session?.user?.email)
          );
          return (
            <Link
              href={`/dashboard/chats/${chat?.id}`}
              key={friend.id}
              className="flex items-center space-x-4 p-4 border-b border-gray-200"
            >
              <ProfileAvatar
                image={friend.image}
                name={friend.display_name}
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900">
                  {friend.display_name}
                </h2>
                <p className="text-sm text-gray-600">{friend.email}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <DashboardFloatingDock />
    </section>
  );
};
export default ChatPage;
