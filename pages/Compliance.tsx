
import React, { useEffect } from 'react';
import ComplianceCalendar from '../components/ComplianceCalendar';
import { motion } from 'framer-motion';

const Compliance: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="bg-slate-900 text-white pt-32 pb-20 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
                    <div className="absolute w-96 h-96 bg-violet-600/20 rounded-full blur-3xl bottom-0 right-0"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Compliance Hub</h1>
                    <p className="text-xl text-slate-300">Master your deadlines. Automate your specialized filings.</p>
                </div>
            </div>

            <ComplianceCalendar />
        </motion.div>
    );
};

export default Compliance;
