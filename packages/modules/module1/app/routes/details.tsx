import { useNavigate } from "@remix-run/react";
import { Button } from "@mk-modular/shared";
import { ArrowLeft } from "lucide-react";

export default function Details() {
  const navigate = useNavigate();

  return (
    <div className="bg-base p-6 rounded-xl">
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="shadow-neumorphic hover:shadow-neumorphic-inset transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-700">Details Page</h1>
      </div>

      <div className="shadow-neumorphic rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Module Details</h2>
        <p className="text-gray-600 mb-4">
          This is a detailed view demonstrating the proper routing in Remix.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 shadow-neumorphic rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Features</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>File-based routing</li>
              <li>Nested layouts</li>
              <li>Data loading</li>
              <li>Neumorphic design</li>
            </ul>
          </div>
          <div className="p-4 shadow-neumorphic rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Technologies</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Remix</li>
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
