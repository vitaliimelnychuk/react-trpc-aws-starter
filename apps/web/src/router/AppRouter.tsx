// import { useUserContext } from '@web/contexts/User';
import { DashboardView } from '@web/pages/Dashboard';
import NotFoundView from '@web/pages/layout/NotFoundView/NotFoundView';
import { SingInView } from '@web/pages/SingIn';
import { dashboardUrl, homeUrl, singInUrl } from '@web/router/urls';
import {
  AuthorizationRequiredRoute,
  NoAutharizationRoute
} from '@web/router/Wrappers';
import { Route, Routes } from 'react-router-dom';

export const appRoutesList = [
  {
    url: homeUrl,
    ViewComponent: DashboardView,
    WrapperComponent: AuthorizationRequiredRoute
  },
  {
    url: singInUrl,
    ViewComponent: SingInView,
    WrapperComponent: NoAutharizationRoute
  },
  {
    url: dashboardUrl,
    ViewComponent: DashboardView,
    WrapperComponent: AuthorizationRequiredRoute
  }
];

export function AppRouter() {
  // const { currentUser } = useUserContext();

  return (
    <Routes>
      {appRoutesList.map(({ url, ViewComponent, WrapperComponent }) => (
        <Route
          key={url}
          path={url}
          element={
            <WrapperComponent>
              <ViewComponent />
            </WrapperComponent>
          }
        />
      ))}
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}
