import React from 'react';
import { Bell } from 'lucide-react';
import { useEventSubscription } from '../../events/hooks';
import type { NotificationEvent } from '../../events/types';

export const Header: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Array<{ id: string; message: string; level: string }>>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  useEventSubscription<NotificationEvent>('NOTIFICATION', (event) => {
    const newNotification = {
      id: Date.now().toString(),
      message: event.payload.message,
      level: event.payload.level,
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
  });

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Modular Remix Application</h1>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              )}
            </button>

            {isNotificationsOpen && notifications.length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-4 space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg ${
                        notification.level === 'error' ? 'bg-red-50' :
                        notification.level === 'warning' ? 'bg-yellow-50' :
                        'bg-blue-50'
                      }`}
                    >
                      <p className="text-sm text-gray-900">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
