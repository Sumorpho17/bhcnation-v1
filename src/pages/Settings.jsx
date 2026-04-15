import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { useToast } from '../contexts/ToastContext';

export default function Settings() {
  const { settings, updateSettings } = useAppData();
  const { addToast } = useToast();
  const [apiKey, setApiKey] = useState(settings.aiApiKey || '');

  const handleSave = () => {
    updateSettings({ aiApiKey: apiKey });
    addToast('Settings saved successfully', 'success');
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-24 h-full p-4">
      <header className="mb-6">
        <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight">System Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Configure your BHCNation application preferences and integrations.</p>
      </header>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">AI Integration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Claude/Gemini API Key</label>
            <p className="text-xs text-slate-500 mb-2">Used to power the AI Pastoral Intelligence Panel in your dashboard.</p>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..." 
              className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleSave}
            className="h-10 px-4 bg-primary text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition"
          >
            Save Settings
          </button>
        </div>
      </section>
    </div>
  );
}
