import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/' },
  { icon: 'group', label: 'Members', path: '/directory' },
  { icon: 'account_balance_wallet', label: 'Finance', path: '/giving' },
  { icon: 'event', label: 'Programs', path: '/events' },
  { icon: 'volunteer_activism', label: 'Volunteers', path: '/volunteers' },
  { icon: 'domain', label: 'Departments', path: '/departments' },
  { icon: 'inventory_2', label: 'Inventory', path: '/inventory' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      {/* Mobile Menu Button - visible only on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg border-4 border-background-light dark:border-background-dark hover:scale-105 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
      </button>

      {/* Desktop Sidebar OR Mobile Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-background-light dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 
        transform transition-transform duration-300 ease-in-out flex flex-col pt-4
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="flex items-center gap-3 px-6 mb-8 mt-2">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
            <span className="material-symbols-outlined">church</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase">BHCNation</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors
                ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}
              `}
            >
              <span className={`material-symbols-outlined ${({ isActive }) => isActive ? "filled-icon" : ""}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-between w-full p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <div className="flex items-center gap-3 font-medium">
              <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
          </button>

          <button className="flex items-center justify-between w-full p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition">
            <div className="flex items-center gap-3 font-medium">
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
