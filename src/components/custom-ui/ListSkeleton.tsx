import { Skeleton } from "../ui/skeleton";

const ListSkeleton = () => {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-3 items-center p-3"
        >
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default ListSkeleton;
``