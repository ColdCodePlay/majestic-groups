
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Plus,
    Trash2,
    PieChart,
    DollarSign,
    Lightbulb,
    Briefcase,
    Clock,
    Network,
    ArrowRight,
    Share2
} from 'lucide-react';

// --- Types ---
interface Founder {
    id: string;
    name: string;
    role: string;
    color: string;
}

interface Factor {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    weight: number;
    // Store which founder IDs are selected for this factor
    selectedFounders: string[];
}

const COLORS = [
    '#6366f1', // Indigo
    '#ec4899', // Pink
    '#8b5cf6', // Violet
    '#10b981', // Emerald
    '#f59e0b', // Amber
];

const EQUITY_FACTORS = [
    { id: 'idea', label: 'Original Idea', description: 'Who came up with the core concept?', icon: Lightbulb, weight: 7 },
    { id: 'business_plan', label: 'Business Plan', description: 'Who wrote the initial plan & strategy?', icon: PieChart, weight: 5 },
    { id: 'domain_expertise', label: 'Domain Expertise', description: 'Who knows this industry inside out?', icon: Network, weight: 6 },
    { id: 'commitment', label: 'Full-Time Commitment', description: 'Who is working on this full-time?', icon: Clock, weight: 12 },
    { id: 'responsibilities', label: 'CEO/COO Role', description: 'Who is managing daily operations?', icon: Briefcase, weight: 6 },
    { id: 'capital', label: 'Seed Capital', description: 'Who is funding the early expenses?', icon: DollarSign, weight: 15 },
];

const EquityCalculator = () => {
    // --- State ---
    const [founders, setFounders] = useState<Founder[]>([
        { id: '1', name: 'Founder A', role: 'CEO', color: COLORS[0] },
        { id: '2', name: 'Founder B', role: 'CTO', color: COLORS[1] },
    ]);

    const [factors, setFactors] = useState<Factor[]>(
        EQUITY_FACTORS.map(f => ({ ...f, selectedFounders: [] }))
    );

    // --- Actions ---
    const addFounder = () => {
        if (founders.length >= 5) return;
        const newId = Math.random().toString(36).substr(2, 9);
        setFounders(prev => [
            ...prev,
            {
                id: newId,
                name: `Founder ${String.fromCharCode(67 + (prev.length - 2))}`, // C, D, E...
                role: 'Co-Founder',
                color: COLORS[prev.length]
            }
        ]);
    };

    const removeFounder = (id: string) => {
        if (founders.length <= 1) return;
        setFounders(prev => prev.filter(f => f.id !== id));
        // Also remove from selections
        setFactors(prev => prev.map(f => ({
            ...f,
            selectedFounders: f.selectedFounders.filter(fid => fid !== id)
        })));
    };

    const toggleSelection = (factorId: string, founderId: string) => {
        setFactors(prev => prev.map(f => {
            if (f.id !== factorId) return f;
            const isSelected = f.selectedFounders.includes(founderId);
            return {
                ...f,
                selectedFounders: isSelected
                    ? f.selectedFounders.filter(id => id !== founderId)
                    : [...f.selectedFounders, founderId]
            };
        }));
    };

    const updateFounderName = (id: string, name: string) => {
        setFounders(prev => prev.map(f => f.id === id ? { ...f, name } : f));
    }

    // --- Calculation Engine ---
    const splitData = useMemo(() => {
        // Initialize scores
        const scores: Record<string, number> = {};
        founders.forEach(f => scores[f.id] = 0);

        let totalWeightUsed = 0;

        factors.forEach(factor => {
            if (factor.selectedFounders.length > 0) {
                totalWeightUsed += factor.weight;
                const pointsPerFounder = factor.weight / factor.selectedFounders.length;
                factor.selectedFounders.forEach(fid => {
                    if (scores[fid] !== undefined) {
                        scores[fid] += pointsPerFounder;
                    }
                });
            }
        });

        // Convert to Percentages
        const results = founders.map(f => {
            const score = scores[f.id];
            const percent = totalWeightUsed === 0 ? (100 / founders.length) : (score / totalWeightUsed) * 100;
            return { ...f, percent, score };
        });

        return results;
    }, [founders, factors]);

    // --- Visualization (Conic Gradient for Donut) ---
    const conicGradient = useMemo(() => {
        let currentDeg = 0;
        const segments = splitData.map(d => {
            const start = currentDeg;
            const deg = (d.percent / 100) * 360;
            currentDeg += deg;
            return `${d.color} ${start}deg ${currentDeg}deg`;
        });
        return `conic-gradient(${segments.join(', ')})`;
    }, [splitData]);

    return (
        <div className="w-full max-w-6xl mx-auto p-6 space-y-8">

            {/* Header */}
            <div className="text-center space-y-4 mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4">
                    <PieChart className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                    Fair Equity Calculator
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    Split startup equity fairly based on actual contributions.
                    Calculated using standard weighting for Idea, Capital, and Execution.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Inputs */}
                <div className="lg:col-span-7 space-y-8">

                    {/* 1. Team Setup */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Users className="w-5 h-5 text-indigo-500" />
                                Who are the Co-Founders?
                            </h3>
                            <button
                                onClick={addFounder}
                                disabled={founders.length >= 5}
                                className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
                            >
                                + Add Founder
                            </button>
                        </div>

                        <div className="space-y-3">
                            {founders.map((founder) => (
                                <motion.div
                                    layout
                                    key={founder.id}
                                    className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100"
                                >
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: founder.color }} />
                                    <input
                                        type="text"
                                        value={founder.name}
                                        onChange={(e) => updateFounderName(founder.id, e.target.value)}
                                        className="bg-transparent font-semibold text-slate-800 outline-none flex-grow"
                                        placeholder="Founder Name"
                                    />
                                    {founders.length > 2 && (
                                        <button onClick={() => removeFounder(founder.id)} className="text-slate-400 hover:text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Contributions */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-500" />
                            Contributions & Roles
                        </h3>

                        <div className="space-y-8">
                            {factors.map((factor) => (
                                <div key={factor.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2 font-bold text-slate-800">
                                            <factor.icon className="w-4 h-4 text-slate-400" />
                                            {factor.label}
                                        </div>
                                        <p className="text-xs text-slate-500 ml-6">{factor.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 ml-6">
                                        {founders.map(founder => {
                                            const isSelected = factor.selectedFounders.includes(founder.id);
                                            return (
                                                <button
                                                    key={founder.id}
                                                    onClick={() => toggleSelection(factor.id, founder.id)}
                                                    className={`
                                                        px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border
                                                        ${isSelected
                                                            ? `bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20 transform scale-105`
                                                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                                        }
                                                    `}
                                                >
                                                    {founder.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Visualization */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 space-y-6">
                        {/* Chart Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 border border-indigo-50 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 opacity-50 pointer-events-none" />

                            <h3 className="text-center font-bold text-slate-500 text-sm uppercase tracking-widest mb-8">Suggested Split</h3>

                            {/* Donut Chart */}
                            <div className="relative w-64 h-64 mx-auto mb-8">
                                <div
                                    className="w-full h-full rounded-full shadow-inner transition-all duration-500 ease-out"
                                    style={{ background: conicGradient }}
                                />
                                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <div className="text-center">
                                        <span className="block text-3xl font-black text-slate-900">100%</span>
                                        <span className="text-xs text-slate-400 font-bold uppercase">Equity</span>
                                    </div>
                                </div>
                            </div>

                            {/* Legend / Results */}
                            <div className="space-y-3">
                                {splitData.map((data) => (
                                    <div key={data.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: data.color }} />
                                            <div>
                                                <div className="font-bold text-slate-900">{data.name}</div>
                                                <div className="text-xs text-slate-500">{data.role}</div>
                                            </div>
                                        </div>
                                        <div className="text-xl font-black" style={{ color: data.color }}>
                                            {data.percent.toFixed(1)}%
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10">
                                <Share2 className="w-4 h-4" />
                                Export Summary
                            </button>
                        </div>

                        {/* Tip */}
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex gap-3 text-blue-700 text-sm">
                            <Lightbulb className="w-5 h-5 flex-shrink-0" />
                            <p>
                                <strong>Pro Tip:</strong> Equity splits are dynamic! Consider vesting schedules (standard is 4 years) to protect the company if a founder leaves early.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EquityCalculator;
