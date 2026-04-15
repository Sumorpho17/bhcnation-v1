import React from 'react';

export default function Skeleton({ className = '' }) {
    return (
        <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`}></div>
    );
}

export function CardSkeleton() {
    return (
        <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-slate-900 p-4 shadow-sm border border-slate-100 dark:border-slate-800 w-full animate-fade-in">
            <div className="flex items-center gap-4">
                <Skeleton className="size-14 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-3/4" />
                </div>
            </div>
        </div>
    );
}

export function ListSkeleton({ count = 3 }) {
    return (
        <div className="flex flex-col gap-3">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} />
            ))}
        </div>
    );
}
