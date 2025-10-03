import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import LogoutButton from "./LogoutButton";
import { TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface DesktopItemProps {
  value: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  active?: boolean;
}

const DesktopItem = ({
  value,
  label,
  icon: Icon,
  active,
}: DesktopItemProps) => {
  return (
    <li>
      {label === "Logout" ? (
        <LogoutButton variant="outline">
          <Icon
            className="w-5 h-5"
            strokeWidth={1.6}
          />
        </LogoutButton>
      ) : (
        <TabsTrigger
          value={value}
          className={cn(
            buttonVariants({
              size: "icon",
              variant: "outline",
            }),
            "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          )}
        >
          <Icon
            className="w-5 h-5"
            strokeWidth={1.6}
          />
          <span className="sr-only">{label}</span>
        </TabsTrigger>
      )}
    </li>
  );
};

export default DesktopItem;
