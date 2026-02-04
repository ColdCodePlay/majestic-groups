
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    ShieldCheck,
    ShieldAlert,
    ShieldX,
    Loader2,
    Filter,
    Info,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Mock Data & Types ---
interface TrademarkResult {
    name: string;
    class: number;
    status: 'Available' | 'Objected' | 'Registered';
    applicationDate?: string;
    proprietor?: string;
    similarity?: number; // 0-100%
}

const TRADEMARK_CLASSES = [
    { id: 9, label: 'Class 9: Tech & Software' },
    { id: 25, label: 'Class 25: Clothing & Apparel' },
    { id: 35, label: 'Class 35: Advertising & Business' },
    { id: 41, label: 'Class 41: Education & Entertainment' },
    { id: 42, label: 'Class 42: IT Services' },
];

const TrademarkSearch = () => {
    const [query, setQuery] = useState('');
    const [selectedClass, setSelectedClass] = useState<number>(9);
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<TrademarkResult[] | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setResults(null);

        // Simulate API delay
        setTimeout(() => {
            const mockResults: TrademarkResult[] = [];

            // 1. Exact Match Simulation (Randomly decide if it exists)
            const isTaken = Math.random() > 0.6;

            if (isTaken) {
                mockResults.push({
                    name: query.toUpperCase(),
                    class: selectedClass,
                    status: 'Registered',
                    applicationDate: '2021-05-14',
                    proprietor: `${query.toUpperCase()} SOLUTIONS PVT LTD`,
                    similarity: 100
                });
            } else {
                mockResults.push({
                    name: query.toUpperCase(),
                    class: selectedClass,
                    status: 'Available',
                    similarity: 0
                });
            }

            // 2. Similar Matches
            mockResults.push({
                name: `THE ${query.toUpperCase()}`,
                class: selectedClass,
                status: 'Objected',
                applicationDate: '2023-11-02',
                proprietor: 'UNKNOWN TRADERS',
                similarity: 65
            });

            mockResults.push({
                name: `${query.toUpperCase()}IFY`,
                class: selectedClass,
                status: 'Registered',
                applicationDate: '2019-08-20',
                proprietor: 'GLOBAL BRANDS INC',
                similarity: 40
            });

            setResults(mockResults);
            setIsSearching(false);
        }, 2000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available': return 'text-green-500 bg-green-50 border-green-200';
            case 'Objected': return 'text-amber-500 bg-amber-50 border-amber-200';
            case 'Registered': return 'text-red-500 bg-red-50 border-red-200';
            default: return 'text-slate-500 bg-slate-50';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Available': return <ShieldCheck className="w-5 h-5" />;
            case 'Objected': return <ShieldAlert className="w-5 h-5" />;
            case 'Registered': return <ShieldX className="w-5 h-5" />;
            default: return <Info className="w-5 h-5" />;
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-8">

            {/* Header */}
            <div className="text-center space-y-4 mb-4">
                <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-2xl mb-4">
                    <Search className="w-8 h-8 text-violet-600" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                    Free Trademark Search
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                    Check if your brand name is available before you file. Search across the official IP India registry database (Mock).
                </p>
            </div>

            {/* Search Box */}
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative z-20">
                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 relative">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Brand Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ex. Nike, Google..."
                                    className="w-full pl-6 pr-4 py-4 bg-slate-50 rounded-xl border border-slate-200 font-bold text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Class</label>
                            <div className="relative">
                                <select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(Number(e.target.value))}
                                    className="w-full pl-4 pr-10 py-4 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all appearance-none cursor-pointer"
                                >
                                    {TRADEMARK_CLASSES.map(c => (
                                        <option key={c.id} value={c.id}>{c.label}</option>
                                    ))}
                                </select>
                                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSearching || !query}
                        className="w-full py-4 bg-violet-600 text-white rounded-xl font-black text-lg hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                        {isSearching ? 'Scanning Registry...' : 'Search Availability'}
                    </button>
                </form>
            </div>

            {/* Results */}
            <AnimatePresence>
                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-bold text-slate-900 text-lg">Search Results</h3>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Database Updated: Just Now</span>
                        </div>

                        {results.map((result, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`group p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:shadow-lg
                                    ${result.status === 'Available' ? 'bg-green-50/10 border-green-100 hover:border-green-200' :
                                        result.status === 'Objected' ? 'bg-amber-50/10 border-amber-100 hover:border-amber-200' :
                                            'bg-white border-slate-100 hover:border-violet-100'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${getStatusColor(result.status)}`}>
                                        {getStatusIcon(result.status)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-xl font-black text-slate-900">{result.name}</h4>
                                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md border ${getStatusColor(result.status)}`}>
                                                {result.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium">Class {result.class}</p>

                                        {result.status !== 'Available' && (
                                            <div className="mt-2 text-xs text-slate-400 space-y-1">
                                                <p>Proprietor: <span className="text-slate-600 font-bold">{result.proprietor}</span></p>
                                                <p>App Date: {result.applicationDate}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full md:w-auto flex flex-col items-end gap-3">
                                    {result.status === 'Available' ? (
                                        <Link to="/services?q=trademark" className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 flex items-center justify-center gap-2">
                                            Apply Now <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    ) : (
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-slate-400 mb-1">Match Score</div>
                                            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${result.similarity > 80 ? 'bg-red-500' : 'bg-amber-500'}`}
                                                    style={{ width: `${result.similarity}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {/* Summary / Advisory */}
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                            <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <div className="space-y-2">
                                <h4 className="font-bold text-blue-900">Expert's Note</h4>
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    This is a preliminary search. Even if a name appears "Available", phonetic similarities or well-known marks in other classes can cause objections. We recommend a full distinctiveness report by our attorneys before filing.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TrademarkSearch;
