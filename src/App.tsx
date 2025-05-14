import { Outlet } from 'react-router';

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen background-superhero">
      <Outlet />
    </div>
  );
}
