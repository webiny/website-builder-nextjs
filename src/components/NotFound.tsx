import React from "react";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <p className="text-8xl font-extrabold text-indigo-600 tracking-tight">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-base text-gray-500 max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or deleted.
      </p>
      <a
        href="/"
        className="mt-8 inline-block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
      >
        Go back home
      </a>
    </div>
  );
};
