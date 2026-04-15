import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

export default function Departments() {
    const { departments, setDepartments, members } = useContext(DataContext);
    const [isAdding, setIsAdding] = useState(false);

    const [name, setName] = useState('');
    const [leadName, setLeadName] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        const newDept = {
            id: Date.now(),
            name,
            lead: leadName,
            description,
            memberCount: 0 // Mocked, but in real app would calculate from members
        };
        setDepartments([...departments, newDept]);
        setIsAdding(false);
        setName('');
        setLeadName('');
        setDescription('');
    };

    const handleDelete = (id) => setDepartments(departments.filter(d => d.id !== id));

    return (
        <div className="w-full max-w-5xl mx-auto pb-24 px-4 sm:px-6">
            <header className="mt-6 mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Departments & Units</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage ministries and core church teams.</p>
                </div>
                <button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">{isAdding ? 'close' : 'add'}</span>
                    <span className="hidden sm:inline">New Unit</span>
                </button>
            </header>

            {isAdding && (
                <form onSubmit={handleAdd} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Department Name</label>
                        <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Media Team" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Lead/HOD Name</label>
                        <input required type="text" value={leadName} onChange={e => setLeadName(e.target.value)} placeholder="e.g. Joy" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Description</label>
                        <input required type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="What does this department do?" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <button type="submit" className="sm:col-span-2 mt-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl w-full">Create Department</button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map(d => (
                    <div key={d.id} className="relative bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col group">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="h-12 w-12 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 flex items-center justify-center">
                                <span className="material-symbols-outlined">domain</span>
                            </div>
                            <button onClick={() => handleDelete(d.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 absolute top-0 right-0">
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                        </div>
                        <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 leading-tight mb-2">{d.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-2">{d.description}</p>
                        
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm font-medium">
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <span className="material-symbols-outlined text-[16px] text-slate-400">person</span>
                                {d.lead}
                            </div>
                            <div className="text-primary font-bold bg-primary/10 px-2 py-1 rounded-md">
                                {d.memberCount} Mbrs
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
