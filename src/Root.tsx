import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Paths } from './enums';
import App from './App';

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.HOME} element={<App />}>
          {/* here will be all other components and routes */}
        </Route>
        <Route path={Paths.NOT_FOUND} element={<Navigate to={Paths.HOME} />} />
      </Routes>
    </BrowserRouter>
  );
};
