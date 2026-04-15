import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultMembers, defaultFinances, defaultEvents, defaultVolunteers, defaultDepartments, defaultInventory } from '../data/seedData';

const AppDataContext = createContext();

export function useAppData() {
  return useContext(AppDataContext);
}

export function AppDataProvider({ children }) {
  // Generic hook for syncing state with localStorage
  const usePersistentState = (key, initialValue) => {
    const [state, setState] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return initialValue;
      }
    });

    useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    }, [key, state]);

    return [state, setState];
  };

  const [members, setMembers] = usePersistentState('bhc_members', defaultMembers);
  const [finances, setFinances] = usePersistentState('bhc_finances', defaultFinances);
  const [events, setEvents] = usePersistentState('bhc_events', defaultEvents);
  const [volunteers, setVolunteers] = usePersistentState('bhc_volunteers', defaultVolunteers);
  const [departments, setDepartments] = usePersistentState('bhc_departments', defaultDepartments);
  const [inventory, setInventory] = usePersistentState('bhc_inventory', defaultInventory);
  
  // Settings
  const [settings, setSettings] = usePersistentState('bhc_settings', { aiApiKey: '' });

  // Generic CRUD helpers
  const addItem = (setStateAction, newItem) => {
    setStateAction(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
  };

  const updateItem = (setStateAction, id, updatedData) => {
    setStateAction(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };

  const deleteItem = (setStateAction, id) => {
    setStateAction(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    members, setMembers: (data) => setMembers(data),
    addMember: (data) => addItem(setMembers, data),
    updateMember: (id, data) => updateItem(setMembers, id, data),
    deleteMember: (id) => deleteItem(setMembers, id),

    finances,
    addFinance: (data) => addItem(setFinances, data),
    deleteFinance: (id) => deleteItem(setFinances, id),

    events,
    addEvent: (data) => addItem(setEvents, data),
    updateEvent: (id, data) => updateItem(setEvents, id, data),
    deleteEvent: (id) => deleteItem(setEvents, id),

    volunteers,
    addVolunteer: (data) => addItem(setVolunteers, data),
    updateVolunteer: (id, data) => updateItem(setVolunteers, id, data),
    deleteVolunteer: (id) => deleteItem(setVolunteers, id),

    departments,
    addDepartment: (data) => addItem(setDepartments, data),
    updateDepartment: (id, data) => updateItem(setDepartments, id, data),
    deleteDepartment: (id) => deleteItem(setDepartments, id),

    inventory,
    addInventory: (data) => addItem(setInventory, data),
    updateInventory: (id, data) => updateItem(setInventory, id, data),
    deleteInventory: (id) => deleteItem(setInventory, id),

    settings,
    updateSettings: (data) => setSettings(prev => ({ ...prev, ...data }))
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}
