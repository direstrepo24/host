import React from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
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
      </div>
    </div>
  );
};
