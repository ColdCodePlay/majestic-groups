
import React, { useEffect } from 'react';
import EntitySelectorQuiz from '../components/EntitySelectorQuiz';
import { motion } from 'framer-motion';

const EntitySelectorPage: React.FC = () => {
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
                    <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -top-20 right-0"></div>
                    <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl bottom-0 left-0"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Structure Strategy Tool</h1>
                    <p className="text-xl text-slate-300">Don't guess. Let our algorithm find your ideal legal foundation.</p>
                </div>
            </div>

            <EntitySelectorQuiz />
        </motion.div>
    );
};

export default EntitySelectorPage;
