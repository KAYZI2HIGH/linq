import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import ProfileAvatar from "../Avatar";
import { items } from "@/lib/constant";
import LogoutBtn from "../LogoutBtn";

const Navbar = async () => {
  const session = await auth();
  return (
    <header>
      <nav className="flex items-center justify-between py-6 px-8 md:px-[50px]">
        <Link
          href="/signin"
          className="flex gap-3 items-center"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="md:size-10 size-9"
          />
          <h1 className="text-lg font-bold">Linq</h1>
        </Link>
        <ul className="space-x-6 hidden md:flex">
          <li>
            <a
              href="/"
              className="hover:text-gray-600"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="hover:text-gray-600"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#stack"
              className="hover:text-gray-600"
            >
              Tech Stack
            </a>
          </li>
        </ul>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ProfileAvatar
                image={session?.user?.image || ""}
                name={session?.user?.name || ""}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="mb-0 pb-0 font-bold tracking-wide">
                {session?.user?.name?.split(" ")[0]}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="text-[12px] text-gray-600">
                {session?.user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {items.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  asChild
                >
                  <Link
                    href={item.url}
                    className="flex gap-3 font-semibold items-center"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild><LogoutBtn className="w-full h-ful items-center justify-start text-red-500 hover:bg-red-100 hover:text-red-500"/></DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="w-full flex items-center justify-center  text-sm text-gray-500">Linq &copy; 2025</div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="bg-gray-200 shadow-none text-black font-semibold hover:bg-gray-200/80"
            asChild
          >
            <Link
              href={"/signin"}
              className="flex gap-1"
            >
              LogIn
              <LogIn />
            </Link>
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
