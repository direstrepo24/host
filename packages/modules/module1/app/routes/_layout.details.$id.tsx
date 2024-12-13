import { useParams } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@mk-modular/shared";
import { Link } from "@remix-run/react";

export default function Details() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-base p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="bg-base shadow-neumorphic rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="..">
                <div className="p-3 bg-base shadow-neumorphic rounded-xl hover:shadow-neumorphic-inset transition-all duration-300">
                  <ArrowLeft className="h-6 w-6 text-blue-500" />
                </div>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-700">User Details</h1>
                <p className="text-sm text-gray-500">User ID: {id}</p>
              </div>
            </div>
            <Button
              variant="primary"
              className="shadow-neumorphic hover:shadow-neumorphic-inset transition-all duration-300"
            >
              Edit User
            </Button>
          </div>
        </header>

        {/* Details Content */}
        <section className="bg-base shadow-neumorphic rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-gray-700">John Doe</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-700">john@example.com</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-gray-700">Admin</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Additional Details</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="text-gray-700">2024-03-13 10:30 AM</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-gray-700">Active</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
