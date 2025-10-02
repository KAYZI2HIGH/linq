import EmptyState from "@/components/custom-ui/EmptyStates";
import { cn } from "@/lib/utils";

const Page = () => {
  return (
    <div className={cn("w-full h-screen md:block")}>
      <EmptyState />
    </div>
  );
};

export default Page;
