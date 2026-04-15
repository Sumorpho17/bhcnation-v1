import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { members, finances, events, settings } = useAppData();
    const [aiInsight, setAiInsight] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Format currency to Nigerian Naira
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    // Calculate Stats
    const totalMembers = members.length;
    const activeMembers = members.filter(m => m.status === 'Active').length;
    
    // Calculate current month's income
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const totalIncome = finances
        .filter(f => f.type === 'Income')
        .reduce((sum, current) => sum + current.amount, 0);

    const upcomingEvents = events.filter(e => e.status === 'Upcoming').length;

    const generateInsight = async () => {
        setIsGenerating(true);
        
        if (!settings.aiApiKey) {
            setAiInsight("No API Key found. Please add your Gemini API Key in the Settings module to enable Pastoral Intelligence.");
            setIsGenerating(false);
            return;
        }

        try {
            // Context to feed to AI
            const prompt = `
                You are an AI Pastoral Assistant for BHCNation (Believers House Chapel). 
                Analyze this data and provide a brief, actionable 2-sentence pastoral insight.
                Total Members: ${totalMembers}
                Active Members: ${activeMembers}
                Total Income: ₦${totalIncome}
                Upcoming Programs: ${upcomingEvents}
                Recent events include: ${events.slice(0,2).map(e=>e.title).join(', ')}.
                Recent finances include: ${finances.slice(0,2).map(f=>f.title).join(', ')}.
            `;

            // Using Google Gemini API REST call (supports CORS natively for client-side beta apps)
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${settings.aiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!response.ok) {
                throw new Error('API Request Failed');
            }

            const data = await response.json();
            const insightText = data.candidates[0].content.parts[0].text;
            setAiInsight(insightText);
        } catch (error) {
            console.error("AI Error:", error);
            setAiInsight("Sorry, I encountered an error communicating with the AI. Check your API key or internet connection.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-24 px-4 sm:px-6">
            
            {/* Header Section */}
            <header className="mt-6 mb-8">
                <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Overview</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Here is what's happening at BHCNation today.</p>
            </header>

            {/* Live Stat Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Members</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{totalMembers}</h3>
                    </div>
                    <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">group</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Income</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{formatCurrency(totalIncome)}</h3>
                    </div>
                    <div className="size-12 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming Programs</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{upcomingEvents}</h3>
                    </div>
                    <div className="size-12 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">event</span>
                    </div>
                </div>
            </section>

            {/* AI Pastoral Intelligence */}
            <section className="mb-8">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 shadow-md relative overflow-hidden">
                    {/* Decorative Background Icon */}
                    <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[150px] text-white/5 pointer-events-none">auto_awesome</span>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-amber-400 text-2xl">magic_button</span>
                            <h2 className="text-white text-xl font-bold tracking-tight">AI Pastoral Intelligence</h2>
                        </div>
                        
                        {!aiInsight ? (
                            <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                                <p className="text-slate-300 text-sm mb-4">
                                    Click below to analyze live church data and generate actionable pastoral insights powered by Gemini AI.
                                </p>
                                <button 
                                    onClick={generateInsight}
                                    disabled={isGenerating}
                                    className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                                            Analyzing Data...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-sm">insights</span>
                                            Generate Insight
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-sm animate-fade-in">
                                <p className="text-white text-sm leading-relaxed mb-4">
                                    {aiInsight}
                                </p>
                                <button 
                                    onClick={generateInsight}
                                    disabled={isGenerating}
                                    className="text-primary hover:text-white transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">refresh</span>
                                    {isGenerating ? 'Regenerating...' : 'Regenerate'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Upcoming Programs Grid */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold tracking-tight">Recent & Upcoming</h2>
                    <Link to="/events" className="text-primary text-sm font-semibold hover:underline">View All</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.slice(0, 2).map(program => (
                        <div key={program.id} className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${program.status === 'Upcoming' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'}`}>
                                        {program.status}
                                    </span>
                                    <span className="text-slate-400 text-[10px]">•</span>
                                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">{program.month} {program.date} at {program.time}</span>
                                </div>
                                <p className="text-slate-900 dark:text-slate-100 text-base font-bold">{program.title}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{program.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
