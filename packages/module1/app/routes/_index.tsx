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
        message: 'Important security update from Module 1',
        level: 'error' as NotificationLevel,
      },
    };
    console.log('Module1: Publishing event:', event);
    publish(event);
  }, [publish]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Module 1</h1>
        <Button onClick={handleTriggerEvent}>
          <FileText className="mr-2 h-4 w-4" />
          Trigger Event
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
}
