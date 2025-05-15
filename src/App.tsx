import { Outlet, useLocation } from 'react-router';
import cn from 'classnames';

export default function App() {
  const location = useLocation();

  return (
    <div
      className={cn(
        'flex py-5 sm:py-0 px-4 justify-center sm:items-center h-screen background-superhero',
        {
          'items-center':
            location.pathname === '/add-hero' ||
            location.pathname.includes('/hero/')
        }
      )}
    >
      <Outlet />
    </div>
  );
}
