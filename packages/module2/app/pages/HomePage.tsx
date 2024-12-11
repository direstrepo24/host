import { Link } from "@remix-run/react";
import { Activity, TrendingUp, Users, Clock } from "lucide-react";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    role: string;
    permissions: string[];
  } | null;
}

interface HomePageProps {
  authState: AuthState;
}

export function HomePage({ authState }: HomePageProps) {
  if (!authState.isAuthenticated) {
    return (
      <div className="p-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please log in to access the analytics dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const canAccessDetails = authState.user?.role === 'admin' || 
                         authState.user?.permissions.includes('read');

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Welcome, {authState.user?.role}</h2>
        <p className="text-gray-600">
          Your permissions: {authState.user?.permissions.join(', ')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-blue-500" />
            <span className="ml-2 text-lg font-semibold">Activity</span>
          </div>
          <p className="mt-2 text-2xl font-bold">1,234</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <span className="ml-2 text-lg font-semibold">Growth</span>
          </div>
          <p className="mt-2 text-2xl font-bold">+12.3%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-purple-500" />
            <span className="ml-2 text-lg font-semibold">Users</span>
          </div>
          <p className="mt-2 text-2xl font-bold">892</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-orange-500" />
            <span className="ml-2 text-lg font-semibold">Uptime</span>
          </div>
          <p className="mt-2 text-2xl font-bold">99.9%</p>
        </div>
      </div>

      {canAccessDetails && (
        <div className="mt-6">
          <Link
            to="details"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
}
