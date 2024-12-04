import { Button } from "@mk-modular/shared";
import { DataTable } from "@mk-modular/shared";
import { useEventPublisher } from "@mk-modular/shared/events";
import type { NotificationEvent, NotificationLevel } from "@mk-modular/shared/events";
import { useCallback } from "react";
import { FileText } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];

export default function Index() {
  const { publish } = useEventPublisher();

  const handleTriggerEvent = useCallback(() => {
    console.log('Module1: Triggering event');
    const event: NotificationEvent = {
      type: 'NOTIFICATION',
      source: 'module1',
      timestamp: Date.now(),
      payload: {
        message: 'Important security update',
        level: 'error' as NotificationLevel,
      },
    };
    console.log('Module1: Publishing event:', event);
    publish(event);
  }, [publish]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Module 1</h1>
          </div>
          <Button
            variant="primary"
            onClick={handleTriggerEvent}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Trigger Event
          </Button>
        </div>
        
        <p className="text-gray-600">
          This is Module 1, demonstrating the use of shared components, events system, and
          neumorphic design.
        </p>

      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}
