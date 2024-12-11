import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createAuthMiddleware } from '@mk-modular/shared';
import { BarChart, LineChart, PieChart } from "lucide-react";

// Crear middleware de autenticación con requisitos específicos
const authMiddleware = createAuthMiddleware({
  requireAuth: true,
  roles: ['admin', 'analyst']
});

// Datos simulados para los gráficos
const mockData = {
  dailyVisits: [
    { date: '2024-01-01', visits: 1200 },
    { date: '2024-01-02', visits: 1500 },
    { date: '2024-01-03', visits: 1800 },
  ],
  userTypes: [
    { type: 'Free', count: 5000 },
    { type: 'Pro', count: 2000 },
    { type: 'Enterprise', count: 500 },
  ],
  performance: [
    { metric: 'Response Time', value: '120ms' },
    { metric: 'Error Rate', value: '0.5%' },
    { metric: 'Uptime', value: '99.9%' },
  ]
};

export async function loader(args: LoaderFunctionArgs) {
  // El middleware verifica la autenticación y los roles antes de continuar
  return authMiddleware(args, async () => {
    // Aquí iría la lógica real para obtener los datos
    return json({ data: mockData });
  });
}

export function DetailsPage() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Detailed Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Visits Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <LineChart className="h-6 w-6 text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold">Daily Visits</h3>
          </div>
          <div className="space-y-2">
            {data.dailyVisits.map((item) => (
              <div key={item.date} className="flex justify-between">
                <span className="text-gray-600">{item.date}</span>
                <span className="font-semibold">{item.visits}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Types Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <PieChart className="h-6 w-6 text-green-500" />
            <h3 className="ml-2 text-lg font-semibold">User Distribution</h3>
          </div>
          <div className="space-y-2">
            {data.userTypes.map((item) => (
              <div key={item.type} className="flex justify-between">
                <span className="text-gray-600">{item.type}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <BarChart className="h-6 w-6 text-purple-500" />
            <h3 className="ml-2 text-lg font-semibold">Performance</h3>
          </div>
          <div className="space-y-2">
            {data.performance.map((item) => (
              <div key={item.metric} className="flex justify-between">
                <span className="text-gray-600">{item.metric}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
