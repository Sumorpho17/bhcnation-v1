import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

export default function Events() {
    const { programs, setPrograms } = useContext(DataContext);
    const [isAdding, setIsAdding] = useState(false);

    // New Program Form
    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState('Service');
    const [newDate, setNewDate] = useState('');
    const [newLocation, setNewLocation] = useState('Main Auditorium');

    const handleAddProgram = (e) => {
        e.preventDefault();
        const program = {
            id: Date.now(),
            title: newTitle,
            type: newType,
            date: newDate || new Date().toISOString().split('T')[0],
            location: newLocation,
            attendees: 0,
            status: 'Upcoming'
        };
        setPrograms([program, ...programs]);
        setIsAdding(false);
        setNewTitle('');
        setNewDate('');
    };

    const handleDelete = (id) => {
        setPrograms(programs.filter(p => p.id !== id));
    };

    const markCompleted = (id) => {
        setPrograms(programs.map(p => p.id === id ? { ...p, status: 'Completed' } : p));
    };

    return (
        <div className="w-full max-w-5xl mx-auto pb-24 px-4 sm:px-6">
            <header className="mt-6 mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Programs & Events</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage all BHCNation services and special gatherings.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">{isAdding ? 'close' : 'add'}</span>
                    <span className="hidden sm:inline">{isAdding ? 'Cancel' : 'New Program'}</span>
                </button>
            </header>

            {isAdding && (
                <form onSubmit={handleAddProgram} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Program Title</label>
                        <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Easter Special Service" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Type</label>
                        <select value={newType} onChange={e => setNewType(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-primary">
                            <option value="Service">Service</option>
                            <option value="Special">Special Event</option>
                            <option value="Meeting">Meeting</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Date</label>
                        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-primary" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</label>
                        <input required type="text" value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder="e.g. Main Auditorium" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-primary" />
                    </div>
                    <button type="submit" className="sm:col-span-2 mt-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl transition shadow-sm w-full">Create Program</button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map(program => (
                    <div key={program.id} className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                        <div className="p-5 flex-1">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${program.status === 'Upcoming' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                    {program.status}
                                </span>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    {program.status === 'Upcoming' && (
                                        <button onClick={() => markCompleted(program.id)} title="Mark Completed" className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-green-600 flex items-center justify-center hover:bg-green-100 transition">
                                            <span className="material-symbols-outlined text-[18px]">check</span>
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(program.id)} title="Delete Event" className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-red-500 flex items-center justify-center hover:bg-red-100 transition">
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{program.title}</h3>
                            <p className="text-sm font-medium text-slate-500 mb-4">{parseInt(program.type) ? 'Service' : program.type}</p>
                            
                            <div className="space-y-2 mt-auto">
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                                    <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                    <span>{document.body ? new Date(program.date).toDateString() : program.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    <span>{program.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                                    <span className="material-symbols-outlined text-[18px]">groups</span>
                                    <span>{program.attendees} Attended</span>
                                </div>
                            </div>
                        </div>
                        {program.status === 'Upcoming' && (
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800">
                                <button className="w-full bg-primary/10 text-primary font-bold py-2 rounded-lg text-sm hover:bg-primary hover:text-white transition">
                                    Manage Event
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                
                {programs.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
                        No programs found. Click "New Program" to add one.
                    </div>
                )}
            </div>
        </div>
    );
}
