import React from "react";

const DashboardCustomLayout = ({
  aside,
  content,
}: {
  aside: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[340px_1fr] h-screen max-md:h-[calc(100vh-70px)]">
      <aside className="md:border-r h-full overflow-hidden max-md:w-full">
        {aside}
      </aside>
      <main className="overflow-y-auto hidden md:block">{content}</main>
    </div>
  );
};

export default DashboardCustomLayout;
