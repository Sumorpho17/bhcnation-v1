import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Directory from './pages/Directory'; // We will rename this to Members later or keep it and change title
import Events from './pages/Events'; // Programs
import Giving from './pages/Giving'; // Finance
import Volunteers from './pages/Volunteers';
import Departments from './pages/Departments';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import { ToastProvider } from './contexts/ToastContext';
import { AppDataProvider } from './contexts/AppDataContext';
import './App.css';

function App() {
  return (
    <Router>
      <AppDataProvider>
        <ToastProvider>
          <Routes>
            {/* Public Entry Point */}
            <Route path="/" element={<LandingPage />} />

            {/* Dashboard Protected Application */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="directory" element={<Directory />} />
              <Route path="events" element={<Events />} />
              <Route path="giving" element={<Giving />} />
              <Route path="volunteers" element={<Volunteers />} />
              <Route path="departments" element={<Departments />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AppDataProvider>
    </Router>
  );
}

export default App;
