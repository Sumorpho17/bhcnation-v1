import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

export default function Volunteers() {
    const { volunteers, setVolunteers, members } = useContext(DataContext);
    const [isAdding, setIsAdding] = useState(false);

    const [memberId, setMemberId] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('Ushering');

    const handleAdd = (e) => {
        e.preventDefault();
        const selectedMember = members.find(m => m.id.toString() === memberId);
        if (!selectedMember) return;

        const newVol = {
            id: Date.now(),
            memberId: selectedMember.id,
            name: selectedMember.name,
            role,
            department,
            availability: ['Sundays']
        };
        setVolunteers([...volunteers, newVol]);
        setIsAdding(false);
        setRole('');
    };

    const handleDelete = (id) => setVolunteers(volunteers.filter(v => v.id !== id));

    return (
        <div className="w-full max-w-5xl mx-auto pb-24 px-4 sm:px-6">
            <header className="mt-6 mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Volunteers</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage church workforce and roles.</p>
                </div>
                <button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">{isAdding ? 'close' : 'add'}</span>
                    <span className="hidden sm:inline">Assign Role</span>
                </button>
            </header>

            {isAdding && (
                <form onSubmit={handleAdd} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Select Member</label>
                        <select required value={memberId} onChange={e => setMemberId(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm">
                            <option value="">-- Select Member --</option>
                            {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Department</label>
                        <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm">
                            <option value="Ushering">Ushering</option>
                            <option value="Music">Music</option>
                            <option value="Media">Media</option>
                            <option value="Children">Children</option>
                            <option value="Technical">Technical</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Role/Title</label>
                        <input required type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Lead Vocals" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <button type="submit" className="sm:col-span-3 mt-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl w-full">Save Assignment</button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {volunteers.map(v => (
                    <div key={v.id} className="relative bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined absolute opacity-20 text-[50px]">badge</span>
                            <span className="font-bold">{v.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100">{v.name}</h3>
                            <p className="text-sm font-medium text-primary mb-1">{v.role}</p>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 rounded">
                                {v.department}
                            </span>
                        </div>
                        <button onClick={() => handleDelete(v.id)} className="text-slate-400 hover:text-red-500 absolute top-4 right-4">
                            <span className="material-symbols-outlined text-[20px]">person_remove</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
