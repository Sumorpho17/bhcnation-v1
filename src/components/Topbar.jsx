import React from 'react';

export default function Topbar() {
    return (
        <header className="flex items-center bg-background-light dark:bg-background-dark p-4 sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
                <img alt="Admin Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU8diKO8jEN3hyKmsvdRmjr9aTzlQeidXXCPHyswOmbRm6Pz0TJQhHJEMdQjy1Gi7_MMRFlxQ9vZ1HG5U51l2QNfN9-A1m2xR8AfXVFkqMFVSWBtX-gLCQUhcAJXfSZzsDpWdljBCMzv74X_qv1z-8AEy9ZrrxEL7nRXHHlWjuAlij59u83EU0lN3UJBQiUO_1xFmONzWYliFT7OYEwkJxPWIxqPR2yH_yCdyaKVj0VnBWJuUfpdtJxbc5UWY6-CDnul1_pGjk0bg" />
            </div>
            <div className="flex flex-1 flex-col px-3">
                <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight uppercase">BHCNation</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Port Harcourt</p>
            </div>
            <div className="flex gap-2 items-center">
                <button className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition">
                    <span className="material-symbols-outlined text-2xl">search</span>
                </button>
                <button className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 relative transition">
                    <span className="material-symbols-outlined text-2xl">notifications</span>
                    <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
                </button>
            </div>
        </header>
    );
}
