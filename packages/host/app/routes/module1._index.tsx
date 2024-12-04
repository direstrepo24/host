import { lazy, Suspense } from "react";

const Module1Component = lazy(() => import("@mk-modular/module1"));

export default function Module1Index() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    }>
      <Module1Component />
    </Suspense>
  );
}
