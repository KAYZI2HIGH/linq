import { Button } from "./ui/button";
import { items } from "@/lib/constant";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import FriendRequestNumber from "./FriendRequestNumber";

const DashboardFloatingDock = () => {
  return (
    <div className="w-full px-5 py-2 shadow-sm border-t bg-white z-50 flex gap-5 justify-between items-center md:hidden">
      {items.map((item, key) => {
        if (item.title === "Friends") {
          return (
            <Button
              key={key}
              variant="ghost"
              className="flex flex-col items-center gap-1 h-[75px]"
              asChild
            >
              <Link
                href={item.url}
                className="flex flex-col items-center gap-1 h-full w-full relative"
              >
                <item.icon className="size-[24px]" />
                <span className="text-[12px] font-medium text-[#4B5563] z-10 relative">
                  {item.title}
                </span>
                <span className="size-[18px] rounded-full flex items-center justify-center bg-orange-800 text-white text-xs font-bold absolute bottom-[41px] translate-y-1/2 left-1/2">
                  <FriendRequestNumber />
                </span>
              </Link>
            </Button>
          );
        }
        return (
          <Button
            key={key}
            variant="ghost"
            className="flex flex-col items-center gap-1 h-[75px]"
            asChild
          >
            <Link
              href={item.url}
              className="flex flex-col items-center gap-1 h-full w-full"
            >
              <item.icon className="size-[24px]" />
              <span className="text-[12px] font-medium text-[#4B5563]">
                {item.title}
              </span>
            </Link>
          </Button>
        );
      })}
      <LogoutBtn className="flex-col items-center gap-1 h-[75px] text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 ease-in-out text-[12px]" />
    </div>
  );
};

export default DashboardFloatingDock;
