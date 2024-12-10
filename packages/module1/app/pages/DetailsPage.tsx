import { Button } from "@mk-modular/shared";
import { useNavigate } from "@remix-run/react";
import { ArrowLeft, FileText } from "lucide-react";

interface UserDetails {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  projects: string[];
}

const mockUserDetails: UserDetails = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Admin',
  department: 'Engineering',
  joinDate: '2023-01-15',
  projects: ['Project Alpha', 'Project Beta', 'Project Gamma']
};

export function DetailsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">User Details</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/module1')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to List</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-lg text-gray-900">{mockUserDetails.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg text-gray-900">{mockUserDetails.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Role</h3>
              <p className="mt-1 text-lg text-gray-900">{mockUserDetails.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Department</h3>
              <p className="mt-1 text-lg text-gray-900">{mockUserDetails.department}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Join Date</h3>
              <p className="mt-1 text-lg text-gray-900">{mockUserDetails.joinDate}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Projects</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="list-disc list-inside space-y-2">
              {mockUserDetails.projects.map((project) => (
                <li key={project} className="text-gray-700">{project}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
