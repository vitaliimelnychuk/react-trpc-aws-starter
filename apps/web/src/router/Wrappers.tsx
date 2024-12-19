import { RouterOutputs } from '@web/api';
import { dashboardUrl, singInUrl } from '@web/router/urls';
import React from 'react';
import { Navigate } from 'react-router-dom';

type RedirectArgsType = {
  user?: RouterOutputs['currentUser'] | null;
  children: React.ReactNode;
};

type RedirectType = any;

export const AuthorizationRequiredRoute = ({
  user,
  children
}: RedirectArgsType): RedirectType => {
  if (!user) return <Navigate to={singInUrl} />;

  return children;
};

export const NoAutharizationRoute = ({
  user,
  children
}: RedirectArgsType): RedirectType => {
  if (user) return <Navigate to={dashboardUrl} />;

  return children;
};
