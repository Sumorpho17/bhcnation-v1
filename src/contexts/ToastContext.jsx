import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 pointer-events-none md:bottom-8 md:right-8">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 50, scale: 0.3 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg font-medium text-sm
                ${toast.type === 'success' ? 'bg-green-600 text-white' :
                                    toast.type === 'error' ? 'bg-red-600 text-white' :
                                        'bg-slate-800 text-white dark:bg-white dark:text-slate-900'}
              `}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
                            </span>
                            <span>{toast.message}</span>
                            <button onClick={() => removeToast(toast.id)} className="ml-2 hover:opacity-75">
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
