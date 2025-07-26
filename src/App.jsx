import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer'; 
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  </Provider>
);

export default App;