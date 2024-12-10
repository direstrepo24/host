import React from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Footer } from '@mk-modular/shared';

interface MainLayoutProps {
  children: React.ReactNode;
  version: string;
  buildTime: string;
}

// Versión estática del proyecto
const APP_VERSION = '1.0.0';

export const MainLayout = ({ children, version, buildTime }: MainLayoutProps) => {
  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden border-r bg-background md:block md:w-64">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer 
          buildTime={buildTime}
          version={version} 
        />
      </div>
    </div>
  );
};
