import React from "react";
import Header from "./Header";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
};
