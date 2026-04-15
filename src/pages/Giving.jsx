import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { useToast } from '../contexts/ToastContext';

export default function Giving() {
    const { finances, addFinance, deleteFinance } = useAppData();
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('All');
    
    // New Record Form
    const [isAdding, setIsAdding] = useState(false);
    const [newType, setNewType] = useState('Income');
    const [newCategory, setNewCategory] = useState('Offering');
    const [newAmount, setNewAmount] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    const handleAddRecord = (e) => {
        e.preventDefault();
        const record = {
            type: newType,
            category: newCategory,
            amount: parseFloat(newAmount),
            date: new Date().toISOString(),
            title: newTitle,
            note: ''
        };
        addFinance(record);
        addToast('Transaction recorded permanently.', 'success');
        setIsAdding(false);
        setNewAmount('');
        setNewTitle('');
    };

    const handleDelete = (id) => {
        deleteFinance(id);
        addToast('Transaction deleted.', 'info');
    };

    const totalIncome = finances.filter(f => f.type === 'Income').reduce((sum, f) => sum + f.amount, 0);
    const totalExpense = finances.filter(f => f.type === 'Expense').reduce((sum, f) => sum + f.amount, 0);
    const balance = totalIncome - totalExpense;

    const filteredRecords = finances.filter(f => {
        if (activeTab === 'Income') return f.type === 'Income';
        if (activeTab === 'Expenses') return f.type === 'Expense';
        return true;
    });

    return (
        <div className="w-full max-w-4xl mx-auto pb-24 px-4 sm:px-6">
            <header className="mt-6 mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Finance</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage BHCNation operations.</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">{isAdding ? 'close' : 'add'}</span>
                    <span className="hidden sm:inline">{isAdding ? 'Cancel' : 'New Record'}</span>
                </button>
            </header>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-900 dark:bg-white rounded-2xl p-5 shadow-lg border border-slate-800 dark:border-slate-200 relative overflow-hidden">
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mb-1 relative z-10">Running Balance</p>
                    <h3 className="text-3xl font-bold text-white dark:text-slate-900 relative z-10">{formatCurrency(balance)}</h3>
                    <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[100px] text-white/5 dark:text-black/5 pointer-events-none">account_balance</span>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                    <p className="text-slate-500 text-sm font-medium mb-1">Total Income</p>
                    <h3 className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                    <p className="text-slate-500 text-sm font-medium mb-1">Total Expenses</p>
                    <h3 className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</h3>
                </div>
            </div>

            {/* Add Record Form */}
            {isAdding && (
                <form onSubmit={handleAddRecord} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <h2 className="sm:col-span-2 font-bold text-lg border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">Record Transaction</h2>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Type</label>
                        <select value={newType} onChange={e => setNewType(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-primary">
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Category</label>
                        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-primary">
                            {newType === 'Income' ? (
                                <>
                                    <option value="Tithes">Tithes</option>
                                    <option value="Offering">Offering</option>
                                    <option value="Donation">Donation</option>
                                </>
                            ) : (
                                <>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Ministry">Ministry</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Salary">Salary</option>
                                </>
                            )}
                        </select>
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Amount (₦)</label>
                        <input required type="number" min="0" value={newAmount} onChange={e => setNewAmount(e.target.value)} placeholder="0.00" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-primary" />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Description</label>
                        <input required type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="E.g. Sunday service offering or Generator Fuel" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-primary" />
                    </div>

                    <button type="submit" className="sm:col-span-2 mt-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition shadow-sm w-full">Save Transaction</button>
                </form>
            )}

            {/* Ledger */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-100 dark:border-slate-800">
                    {['All', 'Income', 'Expenses'].map(tab => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {filteredRecords.length === 0 ? (
                        <div className="p-8 text-center text-slate-500 text-sm">No transactions found.</div>
                    ) : (
                        filteredRecords.map(record => (
                            <div key={record.id} className="group p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                <div className="flex items-center gap-4">
                                    <div className={`size-10 rounded-full flex items-center justify-center ${record.type === 'Income' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
                                        <span className="material-symbols-outlined">{record.type === 'Income' ? 'arrow_downward' : 'arrow_upward'}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{record.category}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-slate-500">{new Date(record.date).toLocaleDateString()}</span>
                                            <span className="text-slate-300 dark:text-slate-600">•</span>
                                            <span className="text-xs text-slate-400 truncate max-w-[120px] sm:max-w-xs">{record.title}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className={`font-bold ${record.type === 'Income' ? 'text-green-600' : 'text-slate-900 dark:text-slate-100'}`}>
                                        {record.type === 'Income' ? '+' : '-'}{formatCurrency(record.amount)}
                                    </p>
                                    <button onClick={() => handleDelete(record.id)} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1">
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
