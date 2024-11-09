import React, { ReactNode } from "react";

interface SkeletonProps {
  children: ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full p-4 flex flex-col">{children}</div>
  );
};
