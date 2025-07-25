import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App = () => (
  <div className="app">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default App;