import type { FC } from 'react';
import { useRegisteredRoutes } from '@mk-modular/shared/routing';
import { Outlet, Route } from '@remix-run/react';

export const DynamicRouter: FC = () => {
  const routes = useRegisteredRoutes();

  return (
    <>
      {routes.map((route) => (
        <Route
          key={`${route.moduleId}-${route.path}`}
          path={route.path}
          element={<route.component />}
          index={route.index}
        >
          {route.children?.map((child) => (
            <Route
              key={`${child.moduleId}-${child.path}`}
              path={child.path}
              element={<child.component />}
              index={child.index}
            />
          ))}
        </Route>
      ))}
      <Outlet />
    </>
  );
};
