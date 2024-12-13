import { Outlet } from "@remix-run/react";
import { Footer } from './Footer';

interface ModuleLayoutProps {
  children: React.ReactNode;
  version: string;
  buildTime: string;
}

export function ModuleLayout({ children, version, buildTime }: ModuleLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer 
        buildTime={buildTime}
        version={version} 
      />
    </div>
  );
}
