import { Button } from "@mk-modular/shared";
import { useEventPublisher } from "@mk-modular/shared/events";
import type { NotificationEvent, NotificationLevel } from "@mk-modular/shared/events";
import { useCallback } from "react";
import { Activity } from "lucide-react";

export function HomePage() {
  const { publish } = useEventPublisher();

  const handleNotification = useCallback(() => {
    console.log("Module2: Triggering event");
    const event: NotificationEvent = {
      type: "NOTIFICATION",
      source: "module2",
      timestamp: Date.now(),
      payload: {
        message: "New feature available",
        level: "info" as NotificationLevel,
      },
    };
    console.log("Module2: Publishing event:", event);
    publish(event);
  }, [publish]);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-green-500" />
            <h1 className="text-2xl font-bold">Module 2</h1>
          </div>
          <Button onClick={handleNotification}>Trigger Notification</Button>
        </div>
        
        <p className="text-gray-600">
          This is Module 2, focusing on analytics and metrics visualization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Total Users', value: '1,234', change: '+12%' },
            { title: 'Active Sessions', value: '456', change: '+5%' },
            { title: 'Response Time', value: '120ms', change: '-8%' }
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <p className={`ml-2 text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
