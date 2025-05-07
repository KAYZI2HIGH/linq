import { Button } from "./ui/button";
import { items } from "@/lib/constant";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

const DashboardFloatingDock = () => {
  return (
    <div className="w-full px-5 py-2 shadow-sm border-t bg-white z-50 flex gap-5 justify-between items-center md:hidden">
      {items.map((item, key) => {
        return (
          <Button
            key={key}
            variant="ghost"
            className="flex flex-col items-center gap-1 h-[75px]"
            asChild
          >
            <Link href={item.url} className="flex flex-col items-center gap-1 h-full w-full">
            <item.icon className="size-[24px]" />
            <span className="text-[12px] font-medium text-[#4B5563]">
              {item.title}
              </span>
              </Link>
          </Button>
        );
      })}
      <LogoutBtn className='flex-col items-center gap-1 h-[75px] text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 ease-in-out text-[12px]'/>
    </div>
  );
};

export default DashboardFloatingDock;
