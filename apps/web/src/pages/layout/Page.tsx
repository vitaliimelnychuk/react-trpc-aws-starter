import Header from '@web/components/Header';
import { useCurrentUser } from '@web/contexts/User';
import { singInUrl } from '@web/router/urls';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const Page = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();

  if (!user) return <Navigate to={singInUrl} />;

  return (
    <div className="min-h-full">
      <Header user={user} />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};
