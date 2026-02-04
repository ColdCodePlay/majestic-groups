
import React, { useEffect } from 'react';
import NameGenerator from '../components/NameGenerator';
import { motion } from 'framer-motion';

const NameGeneratorPage: React.FC = () => {
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
            <div className="bg-slate-900 text-white pt-24 pb-12 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -top-20 right-0"></div>
                    <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl bottom-0 left-0"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Brand Identity Lab</h1>
                    <p className="text-xl text-slate-300">Where great companies get their names.</p>
                </div>
            </div>

            <NameGenerator />
        </motion.div>
    );
};

export default NameGeneratorPage;
