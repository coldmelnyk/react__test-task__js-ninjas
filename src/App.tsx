import { Outlet } from 'react-router';

export default function App() {
  return (
    <div className="text-3xl font-bold underline flex justify-center items-center h-screen background-superhero">
      <Outlet />
    </div>
  );
}
