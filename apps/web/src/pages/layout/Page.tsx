import React from 'react';

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-6 lg:px-8">
        {children}
      </div>
    </>
  );
};
