import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

export default function Inventory() {
    const { inventory, setInventory } = useContext(DataContext);
    const [isAdding, setIsAdding] = useState(false);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('Audio');
    const [condition, setCondition] = useState('Good');
    const [quantity, setQuantity] = useState(1);
    const [assignedTo, setAssignedTo] = useState('General');

    const handleAdd = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            name,
            category,
            condition,
            quantity: parseInt(quantity),
            assignedTo,
            dateAcquired: new Date().toISOString().split('T')[0]
        };
        setInventory([newItem, ...inventory]);
        setIsAdding(false);
        setName('');
    };

    const handleDelete = (id) => setInventory(inventory.filter(i => i.id !== id));

    const conditionColors = {
        'Excellent': 'text-green-700 bg-green-100',
        'Good': 'text-blue-700 bg-blue-100',
        'Fair': 'text-amber-700 bg-amber-100',
        'Poor': 'text-red-700 bg-red-100'
    };

    return (
        <div className="w-full max-w-5xl mx-auto pb-24 px-4 sm:px-6">
            <header className="mt-6 mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Inventory Tracker</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage physical assets and equipment.</p>
                </div>
                <button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">{isAdding ? 'close' : 'add'}</span>
                    <span className="hidden sm:inline">Add Asset</span>
                </button>
            </header>

            {isAdding && (
                <form onSubmit={handleAdd} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Item Name</label>
                        <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Wireless Mic" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm">
                            <option value="Audio">Audio</option>
                            <option value="Instruments">Instruments</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Media">Media</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Condition</label>
                        <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm">
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor/Broken</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Quantity</label>
                        <input required type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Assigned To</label>
                        <input required type="text" value={assignedTo} onChange={e => setAssignedTo(e.target.value)} placeholder="e.g. General, Media Dept" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <button type="submit" className="sm:col-span-full mt-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl w-full">Save Asset</button>
                </form>
            )}

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Asset Name</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Category</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Condition</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Qty</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Assigned</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {inventory.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">{item.name}</td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${conditionColors[item.condition] || 'bg-slate-100 text-slate-600'}`}>
                                        {item.condition}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium">{item.quantity}</td>
                                <td className="px-6 py-4"><span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs">{item.assignedTo}</span></td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-500">
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
