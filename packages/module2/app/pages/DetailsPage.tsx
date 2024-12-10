import { Button } from "@mk-modular/shared";
import { useNavigate } from "@remix-run/react";
import { Activity, ArrowLeft, TrendingUp, Users, Clock } from "lucide-react";

export function DetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => navigate("/module2")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <h1 className="text-2xl font-bold">Detailed Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Engagement Metrics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">User Engagement</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Daily Active Users</p>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-green-600">+12% from last week</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Session Duration</p>
              <p className="text-2xl font-bold">15.5 minutes</p>
              <p className="text-sm text-green-600">+8% from last week</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold">Performance</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Average Response Time</p>
              <p className="text-2xl font-bold">120ms</p>
              <p className="text-sm text-red-600">+5ms from last week</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-sm text-green-600">+0.1% from last week</p>
            </div>
          </div>
        </div>

        {/* Trending Data */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-semibold">Trending</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Most Active Time</p>
              <p className="text-2xl font-bold">2:00 PM - 4:00 PM</p>
              <p className="text-sm text-gray-600">UTC-5</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Peak Concurrent Users</p>
              <p className="text-2xl font-bold">856</p>
              <p className="text-sm text-green-600">New record!</p>
            </div>
          </div>
        </div>

        {/* Historical Data */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold">Historical Data</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">30-Day Average Users</p>
              <p className="text-2xl font-bold">1,105</p>
              <p className="text-sm text-green-600">+15% month over month</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">90-Day Uptime</p>
              <p className="text-2xl font-bold">99.98%</p>
              <p className="text-sm text-gray-600">Within SLA target</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
