import React from 'react';

export default function EmptyState({
    title = "No items found",
    description = "Get started by creating a new item.",
    icon = "inbox",
    actionLabel,
    onAction
}) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 shadow-sm animate-fade-in w-full my-4">
            <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[32px]">{icon}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 pb-2">
                {description}
            </p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="bg-primary text-white font-bold py-2 px-6 rounded-full shadow-lg shadow-primary/30 hover:bg-blue-600 transition"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
