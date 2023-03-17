import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalContext } from 'src/contexts';
import { HomePage } from 'src/views';
import { Menu } from 'src/components/menu';
import { homeRoute } from './helpers';
import { PopupWrapper } from 'src/components/popups';

const App: React.FC = () => (
  <GlobalContext>
    <BrowserRouter>
    <PopupWrapper />
    <Menu />
    <Routes>
      <Route path={homeRoute.path} element={<HomePage />} />
    </Routes>
  </BrowserRouter>
  </GlobalContext>
  );

export default App;
