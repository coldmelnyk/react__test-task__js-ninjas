import { Outlet } from 'react-router';

export default function App() {
  return (
    <div className="flex py-5 sm:py-0 justify-center sm:items-center h-screen background-superhero">
      <Outlet />
    </div>
  );
}
