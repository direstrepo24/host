import { useMatches, Link } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbHandle {
  breadcrumb: string;
}

export function Breadcrumbs() {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => (match.handle as BreadcrumbHandle)?.breadcrumb)
    .map((match) => ({
      breadcrumb: (match.handle as BreadcrumbHandle).breadcrumb,
      path: match.pathname,
    }));

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 py-2 px-4 text-sm">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />}
          <Link
            to={breadcrumb.path}
            className="hover:text-blue-600 transition-colors"
          >
            {breadcrumb.breadcrumb}
          </Link>
        </div>
      ))}
    </nav>
  );
}
