import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { useToast } from '../contexts/ToastContext';

export default function Directory() {
    const { members, addMember, deleteMember } = useAppData();
    const { addToast } = useToast();
    const [activeFilter, setActiveFilter] = useState('All Members');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    
    // New Member Form State
    const [newName, setNewName] = useState('');
    const [newRole, setNewRole] = useState('Member');
    const [newStatus, setNewStatus] = useState('Active');
    const [newDepartment, setNewDepartment] = useState('None');

    const filters = ['All Members', 'Active', 'New Convert', 'Visitor'];

    // Filter Logic
    const filteredMembers = members.filter(m => {
        const matchesFilter = activeFilter === 'All Members' || m.status === activeFilter;
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleAddMember = (e) => {
        e.preventDefault();
        const newMember = {
            name: newName,
            status: newStatus,
            role: newRole,
            department: newDepartment,
            joinDate: new Date().toISOString().split('T')[0],
            image: `https://i.pravatar.cc/150?u=${Date.now()}`,
            phone: ''
        };
        addMember(newMember);
        addToast('Member added successfully!', 'success');
        setIsAdding(false);
        setNewName('');
        setNewRole('Member');
        setNewStatus('Active');
        setNewDepartment('None');
    };

    const handleDelete = (id) => {
        deleteMember(id);
        addToast('Member removed from directory.', 'info');
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'Active': return 'text-green-700 bg-green-100 dark:bg-green-900/40 dark:text-green-400';
            case 'New Convert': return 'text-blue-700 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-400';
            default: return 'text-amber-700 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-400';
        }
    };

    return (
        <div className="relative flex flex-col w-full max-w-3xl mx-auto pb-24 h-full px-4 sm:px-6">
            <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-6 pb-2">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Members Directory</h1>
                    <button 
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition shadow-sm flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">{isAdding ? 'close' : 'person_add'}</span>
                        {isAdding ? 'Cancel' : 'Add Member'}
                    </button>
                </div>

                {isAdding && (
                    <form onSubmit={handleAddMember} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-4 flex flex-col gap-3 animate-fade-in">
                        <input required type="text" placeholder="Full Name" value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100">
                                <option value="Active">Active</option>
                                <option value="New Convert">New Convert</option>
                                <option value="Visitor">Visitor</option>
                            </select>
                            <input required type="text" placeholder="Department (e.g. Choir)" value={newDepartment} onChange={e => setNewDepartment(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                            <input required type="text" placeholder="Role (e.g. Lead)" value={newRole} onChange={e => setNewRole(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500" />
                        </div>
                        <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-2 rounded-lg text-sm transition">Save Member</button>
                    </form>
                )}

                <div className="mb-4">
                    <div className="flex w-full items-stretch rounded-xl h-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus-within:border-primary shadow-sm transition-all overflow-hidden relative">
                        <div className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:ring-0 pl-10 pr-3 text-sm text-slate-900 dark:text-slate-100 outline-none"
                            placeholder="Search members..."
                        />
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${activeFilter === filter
                                    ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
                                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </header>

            <main className="flex-1 flex flex-col space-y-3 mt-2 pb-6">
                {filteredMembers.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-sm">No members found matching your criteria.</div>
                ) : (
                    filteredMembers.map(member => (
                        <div key={member.id} className="group flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition">
                            {member.image ? (
                                <img src={member.image} alt={member.name} className="h-12 w-12 rounded-full object-cover border border-slate-200" />
                            ) : (
                                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
                                    {member.name.charAt(0)}
                                </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{member.name}</h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${getStatusStyle(member.status)}`}>
                                        {member.status}
                                    </span>
                                    <span className="text-xs text-slate-500 truncate">{member.department !== 'None' ? `${member.role} • ${member.department}` : member.role}</span>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(member.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}
