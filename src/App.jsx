import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
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
          <div className="flex h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64 relative w-full h-full overflow-y-auto">
              <Topbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/directory" element={<Directory />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/giving" element={<Giving />} />
                  <Route path="/volunteers" element={<Volunteers />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </div>
        </ToastProvider>
      </AppDataProvider>
    </Router>
  );
}

export default App;
