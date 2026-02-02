
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Check,
    X,
    Info,
    Users,
    ShieldCheck,
    FileText,
    Gavel,
    TrendingUp,
    HelpCircle
} from 'lucide-react';

interface ComparisonRow {
    feature: string;
    pvtLtd: string | boolean;
    llp: string | boolean;
    opc: string | boolean;
    info?: string;
}

const COMPARISON_DATA: Record<string, ComparisonRow[]> = {
    "Registration & Ownership": [
        { feature: "Minimum Members", pvtLtd: "2 Directors / 2 Shareholders", llp: "2 Partners", opc: "1 Director / 1 Nominee", info: "Minimum requirement to start the entity." },
        { feature: "Maximum Members", pvtLtd: "200 Members", llp: "No Limit", opc: "Only 1 Member", info: "Scalability in terms of ownership." },
        { feature: "Foreign Ownership", pvtLtd: true, llp: true, opc: false, info: "Eligibility for FDI (Foreign Direct Investment)." },
        { feature: "Transferability", pvtLtd: "Easy (Share Transfer)", llp: "Subject to Agreement", opc: "Restricted", info: "Ease of exiting or bringing in new owners." },
    ],
    "Compliance & Liability": [
        { feature: "Limited Liability", pvtLtd: true, llp: true, opc: true, info: "Protection of personal assets from business debts." },
        { feature: "Audit Requirement", pvtLtd: "Mandatory", llp: "Conditional (>40L Turnover)", opc: "Mandatory", info: "Requirement for statutory audit by a CA." },
        { feature: "Annual Filings", pvtLtd: "Higher (ROC + IT)", llp: "Medium", opc: "Medium", info: "Volume of recurring compliance tasks." },
        { feature: "Board Meetings", pvtLtd: "Mandatory (Quarterly)", llp: "Not Required", opc: "Not Required", info: "Requirement for formal board meetings." },
    ],
    "Taxation & Funding": [
        { feature: "Tax Rate", pvtLtd: "25% (Base Rate)", llp: "30% (Flat)", opc: "25% (Base Rate)", info: "Standard corporate income tax rate." },
        { feature: "Investor Preference", pvtLtd: "Highly Preferred (VC/PE)", llp: "Low Preference", opc: "Low Preference", info: "How much venture capitalists like this structure." },
        { feature: "Capital Raising", pvtLtd: "Very Easy", llp: "Moderate", opc: "Difficult", info: "Ease of raising equity funding." },
    ]
};

const EntityComparison: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(Object.keys(COMPARISON_DATA)[0]);

    const renderValue = (val: string | boolean) => {
        if (typeof val === 'boolean') {
            return val ? (
                <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Check className="w-5 h-5" strokeWidth={3} />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <X className="w-5 h-5" strokeWidth={3} />
                    </div>
                </div>
            );
        }
        return <span className="text-sm font-bold text-slate-700">{val}</span>;
    };

    return (
        <section id="compare-entities" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Decision Matrix
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Pvt Ltd vs. LLP vs. OPC</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        Choosing the right legal structure is the most important decision for your startup. Use our expert comparison to find your perfect match.
                    </p>
                </div>

                {/* Tab Selection */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {Object.keys(COMPARISON_DATA).map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === category
                                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="bg-slate-50 rounded-[3rem] p-4 md:p-8 border border-slate-100 shadow-inner overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="text-left">
                                <th className="pb-8 pl-6 text-slate-400 font-black uppercase tracking-widest text-[10px]">Feature</th>
                                <th className="pb-8 text-center">
                                    <div className="inline-flex flex-col items-center">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-3">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <span className="font-black text-slate-900 text-lg uppercase tracking-tight">Pvt Ltd</span>
                                        <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-[8px] font-black uppercase mt-1">Best for Growth</span>
                                    </div>
                                </th>
                                <th className="pb-8 text-center">
                                    <div className="inline-flex flex-col items-center">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm mb-3">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <span className="font-black text-slate-900 text-lg uppercase tracking-tight">LLP</span>
                                        <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded text-[8px] font-black uppercase mt-1">Best for Services</span>
                                    </div>
                                </th>
                                <th className="pb-8 text-center">
                                    <div className="inline-flex flex-col items-center">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-violet-600 shadow-sm mb-3">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <span className="font-black text-slate-900 text-lg uppercase tracking-tight">OPC</span>
                                        <span className="bg-violet-100 text-violet-600 px-2 py-0.5 rounded text-[8px] font-black uppercase mt-1">Best for Solos</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="space-y-4">
                            <AnimatePresence mode="wait">
                                <motion.tr
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="contents"
                                >
                                    {COMPARISON_DATA[activeTab].map((row, idx) => (
                                        <tr key={idx} className="group">
                                            <td className="py-6 pl-6 bg-white rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-indigo-50/30 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black text-slate-900 text-sm">{row.feature}</span>
                                                    {row.info && (
                                                        <div className="group/info relative">
                                                            <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" />
                                                            <div className="absolute bottom-full left-0 mb-2 w-48 bg-slate-900 text-white text-[10px] p-2 rounded-lg opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all z-20 font-medium">
                                                                {row.info}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-6 text-center bg-white border-y border-slate-100 group-hover:bg-indigo-50/30 transition-colors">
                                                {renderValue(row.pvtLtd)}
                                            </td>
                                            <td className="py-6 text-center bg-white border-y border-slate-100 group-hover:bg-indigo-50/30 transition-colors">
                                                {renderValue(row.llp)}
                                            </td>
                                            <td className="py-6 text-center bg-white rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:bg-indigo-50/30 transition-colors">
                                                {renderValue(row.opc)}
                                            </td>
                                        </tr>
                                    ))}
                                </motion.tr>
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Bottom CTA for Comparison */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between bg-slate-900 p-8 rounded-[2.5rem] gap-6 text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
                            <Gavel className="w-7 h-7" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black mb-1">Still confused which one to pick?</h4>
                            <p className="text-slate-400 text-sm font-medium">Talk to our experts for a free personalized legal assessment.</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl whitespace-nowrap"
                    >
                        Book Free Consult
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default EntityComparison;
