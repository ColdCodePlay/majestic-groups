
import React, { useEffect } from 'react';
import DocumentVault from '../components/DocumentVault';
import { motion } from 'framer-motion';

const VaultPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-16"
        >
            <div className="bg-slate-900 border-b border-white/10 text-white py-12 px-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white mb-1">My Client Portal</h1>
                        <p className="text-slate-400 text-sm">Welcome back, TechFlow Solutions Pvt Ltd (CIN: U72900DL2023PTC123456)</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold flex flex-col items-center border border-white/5">
                            <span className="text-slate-400 uppercase tracking-widest text-[10px]">Plan</span>
                            <span className="text-indigo-400">Premium Plan</span>
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold flex flex-col items-center border border-white/5">
                            <span className="text-slate-400 uppercase tracking-widest text-[10px]">RM</span>
                            <span className="text-green-400">Online</span>
                        </div>
                    </div>
                </div>
            </div>

            <DocumentVault />
        </motion.div>
    );
};

export default VaultPage;
