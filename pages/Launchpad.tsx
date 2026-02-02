
import React from 'react';
import { motion } from 'framer-motion';
import LaunchpadWizard from '../components/LaunchpadWizard';
import { Rocket, ShieldCheck, Zap } from 'lucide-react';

const Launchpad: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-24 relative overflow-hidden">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Header & Context */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
                            >
                                <Rocket className="w-4 h-4" /> Startup Tools
                            </motion.div>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                Launch Your <span className="text-indigo-600">Majestic</span> Venture.
                            </h1>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                                Answer 3 quick questions to get a personalized legal and compliance roadmap for your startup in India.
                            </p>
                        </div>

                        <div className="space-y-6 border-l-4 border-indigo-100 pl-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-bold text-slate-700 leading-snug">Expert-backed roadmap based on latest MCA & GST regulations.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-amber-600">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-bold text-slate-700 leading-snug">Average setup time reduced by 40% with Majestic bundles.</p>
                            </div>
                        </div>
                    </div>

                    {/* Wizard Area */}
                    <div className="lg:col-span-7">
                        <LaunchpadWizard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Launchpad;
