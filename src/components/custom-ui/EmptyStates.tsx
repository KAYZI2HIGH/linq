import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="py-10 px-6 md:px-8 xl:px-10 h-full flex justify-center items-center bg-zinc-100/50">
      <div className="text-center items-center flex flex-col">
        <div className="relative w-full max-w-2xl aspect-video">
          <Image
            fill
            src="https://illustrations.popsy.co/gray/working-vacation.svg"
            alt="empty image"
            className="object-contain z-10"
          />
        </div>
        <h3 className="mt-2 text-xl font-medium text-primary">
          Send and receive messages in real time, without refreshing the page
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
