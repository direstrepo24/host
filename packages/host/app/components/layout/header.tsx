import { Link } from '@remix-run/react';
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
import { useCallback, useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    role: string;
    permissions: string[];
  } | null;
}

export function Header() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);

  const handleNotification = useCallback((event: NotificationEvent) => {
    console.log('Header: Received notification:', event);
    setNotifications(prev => [...prev, event]);
    setUnreadCount(prev => prev + 1);
  }, []);

  useEventSubscription<NotificationEvent>('NOTIFICATION', handleNotification);

  const handleOpenNotifications = () => {
    setUnreadCount(0);
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            <Link to="/">Modular Remix</Link>
          </h1>
          <div className="flex items-center space-x-4">
            {authState.isAuthenticated ? (
              <>
                <span className="text-gray-600">
                  Welcome, {authState.user?.role}
                </span>
                <button
                  onClick={() => {
                    // Simulamos un logout
                    setAuthState({
                      isAuthenticated: false,
                      user: null,
                    });
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  // Simulamos un login
                  setAuthState({
                    isAuthenticated: true,
                    user: {
                      id: '1',
                      role: 'admin',
                      permissions: ['read', 'write'],
                    },
                  });
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={handleOpenNotifications}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {notifications.length === 0 ? (
                  <DropdownMenuItem disabled>
                    No new notifications
                  </DropdownMenuItem>
                ) : (
                  notifications.map((notification, index) => (
                    <DropdownMenuItem key={index} className="flex flex-col items-start">
                      <span className="font-medium">
                        {notification.payload.message}
                      </span>
                      <span className="text-sm text-gray-500">
                        From: {notification.source}
                      </span>
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
}
