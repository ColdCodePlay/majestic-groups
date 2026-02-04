import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    User,
    Briefcase,
    TrendingUp,
    ShieldCheck,
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
type EntityType = 'Private Limited Company' | 'Limited Liability Partnership (LLP)' | 'One Person Company (OPC)' | 'Proprietorship';

interface Question {
    id: number;
    text: string;
    description: string;
    options: Option[];
}

interface Option {
    id: string;
    label: string;
    icon: React.ReactNode;
    value: string;
}

// --- Quiz Logic Data ---
const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "How many owners will the business have?",
        description: "Are you going solo or do you have co-founders?",
        options: [
            { id: 'solo', label: 'Just Me (Solo)', value: 'solo', icon: <User className="w-6 h-6 text-indigo-500" /> },
            { id: 'multiple', label: 'Multiple Partners', value: 'multiple', icon: <Users className="w-6 h-6 text-violet-500" /> }
        ]
    },
    {
        id: 2,
        text: "What is your funding plan?",
        description: "Do you plan to raise investment from VCs or Angels?",
        options: [
            { id: 'bootstrapped', label: 'Self-Funded / Bootstrapped', value: 'bootstrapped', icon: <Briefcase className="w-6 h-6 text-emerald-500" /> },
            { id: 'vc', label: 'Raise Investment (VC/Angel)', value: 'vc', icon: <TrendingUp className="w-6 h-6 text-rose-500" /> }
        ]
    },
    {
        id: 3,
        text: "How much risk is involved?",
        description: "Does your business liability need to be separate from personal assets?",
        options: [
            { id: 'low', label: 'Low Risk', value: 'low', icon: <CheckCircle2 className="w-6 h-6 text-blue-500" /> },
            { id: 'high', label: 'High Liability Protection', value: 'high', icon: <ShieldCheck className="w-6 h-6 text-amber-500" /> }
        ]
    }
];

const EntitySelector = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<EntityType | null>(null);

    const handleOptionSelect = (value: string) => {
        const newAnswers = { ...answers, [step]: value };
        setAnswers(newAnswers);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: Record<number, string>) => {
        const { 0: owners, 1: funding, 2: risk } = finalAnswers;

        let recommended: EntityType = 'Private Limited Company';

        if (owners === 'solo') {
            if (funding === 'vc' || risk === 'high') {
                recommended = 'One Person Company (OPC)';
            } else {
                recommended = 'Proprietorship';
            }
        } else {
            // Multiple owners
            if (funding === 'vc') {
                recommended = 'Private Limited Company';
            } else if (risk === 'low') {
                recommended = 'Limited Liability Partnership (LLP)';
            } else {
                recommended = 'Private Limited Company'; // Default for high risk/multiple
            }
        }
        setResult(recommended);
    };

    const resetQuiz = () => {
        setStep(0);
        setAnswers({});
        setResult(null);
    };

    // --- Result Content Helpers ---
    const getResultDetails = (type: EntityType) => {
        switch (type) {
            case 'Private Limited Company':
                return {
                    desc: "The gold standard for startups looking to scale and raise funds.",
                    pros: ["Easy to raise VC funding", "Limited Liability protection", "High credibility with vendors"],
                    cons: ["Higher compliance cost", "More statutory filings"],
                    link: "/services/pvt-ltd"
                };
            case 'Limited Liability Partnership (LLP)':
                return {
                    desc: "Best for professional firms and small businesses with partners.",
                    pros: ["Lower compliance cost", "Limited Liability", "No audit if turnover < 40L"],
                    cons: ["Harder to raise VC funds", "Ownership transfer restricted"],
                    link: "/services/llp"
                };
            case 'One Person Company (OPC)':
                return {
                    desc: "Perfect for solo founders who want limited liability.",
                    pros: ["Complete control (1 owner)", "Limited Liability", "Corporate status"],
                    cons: ["High tax rate (30%)", "Cannot issue ESOPs easily"],
                    link: "/services/opc"
                };
            case 'Proprietorship':
                return {
                    desc: "Simplest form for small, low-risk businesses.",
                    pros: ["Easiest to start (just GST)", "Lowest compliance", "Total control"],
                    cons: ["Unlimited personal liability", "Cannot raise equity funding"],
                    link: "/services/proprietorship"
                };
        }
    };

    const currentQuestion = QUESTIONS[step];

    return (
        <div className="w-full max-w-xl mx-auto">
            {/* Progress Bar */}
            {!result && (
                <div className="mb-6">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-violet-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                        />
                    </div>
                    <p className="text-right text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                        Step {step + 1} of {QUESTIONS.length}
                    </p>
                </div>
            )}

            <AnimatePresence mode='wait'>
                {!result ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100"
                    >
                        <h2 className="text-2xl font-black text-slate-900 mb-2">{currentQuestion.text}</h2>
                        <p className="text-slate-500 text-base mb-6">{currentQuestion.description}</p>

                        <div className="grid grid-cols-1 gap-3">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option.value)}
                                    className="group relative flex items-center p-4 border-2 border-slate-100 rounded-xl hover:border-violet-500 hover:bg-violet-50 transition-all text-left"
                                >
                                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 mr-4 group-hover:scale-110 transition-transform">
                                        {option.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-700">{option.label}</h3>
                                    </div>
                                    <div className="absolute right-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                        <ArrowRight className="w-4 h-4 text-violet-600" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-indigo-900 to-violet-900 p-1 rounded-3xl shadow-2xl shadow-indigo-500/30"
                    >
                        <div className="bg-white rounded-[1.4rem] p-6 md:p-8 text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>

                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Maximum Match Found</h2>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">
                                {result}
                            </h1>

                            <p className="text-base text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed">
                                {getResultDetails(result).desc}
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div>
                                    <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2 text-sm">
                                        <TrendingUp className="w-4 h-4" /> Pros
                                    </h4>
                                    <ul className="space-y-1">
                                        {getResultDetails(result).pros.map((p, i) => (
                                            <li key={i} className="text-xs font-medium text-slate-600 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-rose-500 mb-2 flex items-center gap-2 text-sm">
                                        <AlertTriangle className="w-4 h-4" /> Cons
                                    </h4>
                                    <ul className="space-y-1">
                                        {getResultDetails(result).cons.map((c, i) => (
                                            <li key={i} className="text-xs font-medium text-slate-600 flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 flex-shrink-0" />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                                <Link
                                    to={getResultDetails(result).link}
                                    className="w-full md:w-auto px-6 py-3 bg-violet-600 text-white rounded-lg font-bold text-base hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
                                >
                                    Register Now <ArrowRight className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={resetQuiz}
                                    className="w-full md:w-auto px-6 py-3 bg-white text-slate-600 border-2 border-slate-100 rounded-lg font-bold text-base hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" /> Retake
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EntitySelector;
