
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Minus,
    CheckCircle2,
    Info,
    Calculator,
    ArrowRight,
    ShieldCheck,
    Zap,
    HelpCircle
} from 'lucide-react';

import { useData } from '../context/DataContext';
import PlanDetailsModal from './PlanDetailsModal';

const PricingCalculator: React.FC = () => {
    const { calculatorComponents } = useData();
    const [selectedIds, setSelectedIds] = useState<string[]>(['pvt']);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const newTotal = calculatorComponents
            .filter(c => selectedIds.includes(c.id))
            .reduce((acc, curr) => acc + curr.price, 0);
        setTotal(newTotal);
    }, [selectedIds, calculatorComponents]);

    const toggleService = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest"
                    >
                        <Calculator className="w-4 h-4" />
                        Instant Estimator
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Build Your Own Compliance Bundle</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Don't want a full plan? Pick only what you need. Real-time professional fee calculation with transparency at its core.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Service Selection Area */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {calculatorComponents.map((comp) => {
                                const isActive = selectedIds.includes(comp.id);
                                return (
                                    <motion.button
                                        key={comp.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleService(comp.id)}
                                        className={`text-left p-6 rounded-[2rem] border-2 transition-all duration-300 relative group ${isActive
                                            ? 'border-indigo-600 bg-indigo-50/30'
                                            : 'border-slate-100 bg-white hover:border-slate-200'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-2xl transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
                                                }`}>
                                                {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                            </div>
                                            <span className={`text-xl font-black ${isActive ? 'text-indigo-600' : 'text-slate-900'}`}>
                                                {comp.price === 0 ? 'FREE' : `₹${comp.price}`}
                                            </span>
                                        </div>
                                        <h4 className="font-black text-lg mb-2 text-slate-900">{comp.name}</h4>
                                        <p className="text-slate-500 text-xs font-medium leading-relaxed">{comp.description}</p>

                                        {isActive && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-900 text-sm">Corporate Guarantee</h5>
                                <p className="text-slate-500 text-xs">Full refund if registration is rejected due to professional error.</p>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Summary Area */}
                    <div className="lg:col-span-5 sticky top-28">
                        <motion.div
                            layout
                            className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-3xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 space-y-8">
                                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                                    <h3 className="text-2xl font-black">Your Bundle</h3>
                                    <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/30">
                                        {selectedIds.length} Items Selected
                                    </span>
                                </div>

                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    <AnimatePresence mode='popLayout'>
                                        {calculatorComponents.filter(c => selectedIds.includes(c.id)).map(comp => (
                                            <motion.div
                                                key={comp.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="flex justify-between items-center group"
                                            >
                                                <span className="text-slate-300 group-hover:text-white transition-colors">{comp.name}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-bold">{comp.price === 0 ? 'FREE' : `₹${comp.price}`}</span>
                                                    <button
                                                        onClick={() => toggleService(comp.id)}
                                                        className="text-white/20 hover:text-red-400 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4 text-xs" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {selectedIds.length === 0 && (
                                        <p className="text-slate-500 italic text-center py-4">Add services to see your estimate</p>
                                    )}
                                </div>

                                <div className="pt-8 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Professional Fee</p>
                                            <motion.h4
                                                key={total}
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="text-5xl font-black text-indigo-400"
                                            >
                                                ₹{total.toLocaleString()}
                                            </motion.h4>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-500 text-[10px] leading-tight flex items-center justify-end gap-1">
                                                Excluding Govt Fees <HelpCircle className="w-3 h-3" />
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        disabled={selectedIds.length === 0}
                                        className="w-full bg-white text-indigo-600 py-6 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 group active:scale-95 shadow-xl shadow-white/5 disabled:opacity-50 disabled:scale-100"
                                    >
                                        Start Checkout <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </button>

                                    <div className="flex items-center justify-center gap-2 pt-2 text-slate-500 text-xs font-medium">
                                        <Zap className="w-3 h-3 text-amber-500" />
                                        24/7 Expert Support Included
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Hint Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="mt-6 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100 flex gap-4"
                        >
                            <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                            <p className="text-indigo-900/70 text-xs leading-relaxed">
                                <span className="font-black text-indigo-600">Pro-tip:</span> Bundle <span className="font-bold italic">GST</span> and <span className="font-bold italic">MSME</span> with Company Inc. for the fastest approval turnaround.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <PlanDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                planName="Custom Compliance Bundle"
                planPrice={total.toLocaleString()}
                items={calculatorComponents.filter(c => selectedIds.includes(c.id)).map(c => c.name)}
            />
        </section>
    );
};

export default PricingCalculator;
