interface FooterProps {
  version: string;
  buildTime: string;
}

export function Footer({ version, buildTime }: FooterProps) {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-semibold">Module 2</span>
            <span className="mx-2">|</span>
            <span>Version: {version}</span>
            <span className="mx-2">|</span>
            <span>Build: {buildTime}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
