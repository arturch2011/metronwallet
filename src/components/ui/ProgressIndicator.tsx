"use client";

export const ProgressIndicator = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-md bg-opacity-50">
      <div className="animate-spin w-10 h-10 border-t-4 border-b-4 border-cprimary rounded-full"></div>
    </div>
  );
};
