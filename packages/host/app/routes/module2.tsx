import { lazy } from 'react';

const Module2 = lazy(() => import('@mk-modular/module2'));

export default function Module2Route() {
  return <Module2 />;
}
