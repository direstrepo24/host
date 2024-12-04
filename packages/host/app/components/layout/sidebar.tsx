import React from 'react';
import { Link } from '@remix-run/react';
import { Package } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { cn } from '~/lib/utils';

interface Module {
  id: string;
  name: string;
  description: string;
  path: string;
}

const modules: Module[] = [
  {
    id: 'module1',
    name: 'Module 1',
    description: 'Data management and event system demonstration',
    path: '/module1',
  },
  {
    id: 'module2',
    name: 'Module 2',
    description: 'Analytics and metrics visualization',
    path: '/module2',
  }
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Modules
          </h2>
          <div className="space-y-1">
            <Accordion type="single" collapsible className="w-full">
              {modules.map((module) => (
                <AccordionItem value={module.id} key={module.id}>
                  <AccordionTrigger className="text-sm px-4">
                    <div className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      {module.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-4 py-2">
                      <p className="text-sm text-gray-500 mb-2">
                        {module.description}
                      </p>
                      <Link
                        to={module.path}
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        Open Module
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};
