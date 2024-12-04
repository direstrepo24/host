import React from 'react';
import { ChevronDown, ChevronRight, Layout } from 'lucide-react';
import { Link } from '@remix-run/react';

interface ModuleLink {
  id: string;
  name: string;
  description: string;
  path: string;
}

interface SidebarProps {
  modules: ModuleLink[];
}

export const Sidebar: React.FC<SidebarProps> = ({ modules }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Layout className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-lg font-semibold">Modules</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            {isOpen ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {isOpen && (
          <div className="space-y-2">
            {modules.map((module) => (
              <Link
                key={module.id}
                to={module.path}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">{module.name}</div>
                <div className="text-sm text-gray-500">{module.description}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
