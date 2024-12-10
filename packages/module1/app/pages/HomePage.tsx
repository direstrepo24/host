import { Button } from "@mk-modular/shared";
import { DataTable } from "@mk-modular/shared";
import { useEventPublisher } from "@mk-modular/shared/events";
import type { NotificationEvent, NotificationLevel } from "@mk-modular/shared/events";
import { type ColumnDef } from "@tanstack/react-table";
import { useCallback } from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "@remix-run/react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

const data: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-01-02",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "inactive",
    lastLogin: "2023-12-25",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-01-03",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "2024-01-01",
  },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-3 py-1 rounded-xl text-xs font-semibold ${
          row.original.status === "active"
            ? "bg-green-100 text-green-800 shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff]"
            : "bg-red-100 text-red-800 shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff]"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => alert(`Edit user ${row.original.name}`)}
          className="px-3 py-1 rounded-xl bg-gray-100 text-blue-600 shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] transition-all duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => alert(`Delete user ${row.original.name}`)}
          className="px-3 py-1 rounded-xl bg-gray-100 text-red-600 shadow-[3px_3px_6px_#b8b9be,-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#b8b9be,inset_-3px_-3px_6px_#ffffff] transition-all duration-300"
        >
          Delete
        </button>
      </div>
    ),
  },
];

export function HomePage() {
  const { publish } = useEventPublisher();
  const navigate = useNavigate();

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
    <div className="p-8 max-w-6xl mx-auto space-y-8 bg-gray-100">
      <div className="rounded-xl bg-gray-100 shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Module 1</h1>
          </div>
          <Button
            variant="primary"
            onClick={handleTriggerEvent}
            className="px-4 py-2 rounded-xl bg-blue-500 text-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#2563eb,inset_-5px_-5px_10px_#60a5fa] transition-all duration-300"
          >
            Trigger Event
          </Button>
        </div>
        
        <p className="text-gray-600">
          This is Module 1, demonstrating the use of shared components, events system, and
          neumorphic design.
        </p>
      </div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Users</h1>
          <div className="rounded-xl bg-gray-100">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
