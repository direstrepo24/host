import { type FC } from 'react';

interface FooterProps {
  buildTime?: string;
  version?: string;
}

export const Footer: FC<FooterProps> = ({ buildTime = '2024-12-09T22:19:32-05:00', version = '1.0.0' }) => {
  const date = new Date(buildTime);
  const formattedBuildTime = date.toLocaleString('en-US', { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-2 sm:mb-0">
            <span className="font-medium">Build:</span> {formattedBuildTime}
          </div>
          <div>
            <span className="font-medium">Version:</span> {version}
          </div>
        </div>
      </div>
    </footer>
  );
};
