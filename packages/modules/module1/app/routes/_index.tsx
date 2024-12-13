import { Button, DataTable } from "@mk-modular/shared";
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
    const event: NotificationEvent = {
      type: 'NOTIFICATION',
      source: 'module1',
      timestamp: Date.now(),
      payload: {
        message: 'Important security update from Module 1',
        level: 'error' as NotificationLevel,
      },
    };
    publish(event);
  }, [publish]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="shadow-neumorphic rounded-xl p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 shadow-neumorphic rounded-xl">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-700">Module 1 Dashboard</h1>
                <p className="text-sm text-gray-500">User Management System</p>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={handleTriggerEvent}
              className="shadow-neumorphic hover:shadow-neumorphic-inset transition-all duration-300"
            >
              Send Notification
            </Button>
          </div>
        </header>

        {/* DataTable Section */}
        <section className="shadow-neumorphic rounded-xl p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">User List</h2>
            <p className="text-sm text-gray-500">Manage and view all system users</p>
          </div>
          <DataTable 
            columns={columns} 
            data={data}
          />
        </section>
      </div>
    </main>
  );
}
