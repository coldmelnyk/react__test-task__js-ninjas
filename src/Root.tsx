import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import App from './App';
import { AddHeroPage, HeroDetailsPage, HomePage } from './pages';

import { Paths } from './enums';

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.HOME} element={<App />}>
          <Route index element={<HomePage />} />
          <Route path={Paths.DETAILS} element={<HeroDetailsPage />} />
          <Route path={Paths.ADD_HERO} element={<AddHeroPage />} />
        </Route>
        <Route path={Paths.NOT_FOUND} element={<Navigate to={Paths.HOME} />} />
      </Routes>
    </BrowserRouter>
  );
};
