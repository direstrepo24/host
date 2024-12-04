import React from 'react';
import { Bell } from 'lucide-react';
import { useEventSubscription } from '@mk-modular/shared/events';
import type { NotificationEvent } from '@mk-modular/shared/events';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { cn } from '~/lib/utils';

export const Header = () => {
  const [notifications, setNotifications] = React.useState<Array<{
    id: string;
    message: string;
    level: string;
    timestamp: number;
  }>>([]);

  const [unreadCount, setUnreadCount] = React.useState(0);

  const handleNotification = React.useCallback((event: NotificationEvent) => {
    console.log('Header: Received notification event:', event);
    const newNotification = {
      id: Date.now().toString(),
      message: event.payload.message,
      level: event.payload.level,
      timestamp: event.timestamp,
    };
    console.log('Header: Adding new notification:', newNotification);
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    setUnreadCount(prev => prev + 1);
  }, []);

  useEventSubscription<NotificationEvent>('NOTIFICATION', handleNotification);

  const handleOpenNotifications = () => {
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold inline-block">Modular Remix</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2">
          <nav className="flex items-center space-x-6">
            {/* Add navigation items here if needed */}
          </nav>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={handleOpenNotifications}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {notifications.length === 0 ? (
                  <DropdownMenuItem className="text-sm text-gray-500">
                    No notifications
                  </DropdownMenuItem>
                ) : (
                  notifications.map(notification => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                      <div className="flex items-center w-full">
                        <span className={cn(
                          "h-2 w-2 rounded-full mr-2",
                          {
                            'bg-blue-500': notification.level === 'info',
                            'bg-green-500': notification.level === 'success',
                            'bg-yellow-500': notification.level === 'warning',
                            'bg-red-500': notification.level === 'error',
                          }
                        )} />
                        <span className="flex-1 text-sm font-medium">
                          {notification.message}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
