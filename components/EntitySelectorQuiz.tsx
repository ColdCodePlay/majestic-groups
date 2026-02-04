
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HelpCircle,
    CheckCircle2,
    ArrowRight,
    RefreshCcw,
    ShieldCheck,
    Wallet,
    Users,
    TrendingUp,
    Building2,
    ChevronRight,
    Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
    id: number;
    text: string;
    icon: React.ReactNode;
    options: Option[];
}

interface Option {
    id: string;
    text: string;
    scores: Record<string, number>; // Entity Type -> Score
}

interface EntityResult {
    id: string;
    name: string;
    description: string;
    pros: string[];
    cons: string[];
    recommended: boolean;
}

const ENTITY_TYPES = {
    PVT_LTD: 'Private Limited Company',
    LLP: 'Limited Liability Partnership',
    OPC: 'One Person Company',
    PARTNERSHIP: 'Partnership Firm',
    PROPRIETORSHIP: 'Sole Proprietorship'
};

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "How many owners/partners will the business have?",
        icon: <Users className="w-8 h-8 text-indigo-500" />,
        options: [
            {
                id: 'solo',
                text: "Just me (Solopreneur)",
                scores: { [ENTITY_TYPES.OPC]: 5, [ENTITY_TYPES.PROPRIETORSHIP]: 5, [ENTITY_TYPES.PVT_LTD]: 1, [ENTITY_TYPES.LLP]: 0, [ENTITY_TYPES.PARTNERSHIP]: 0 }
            },
            {
                id: 'partners',
                text: "Two or more partners",
                scores: { [ENTITY_TYPES.PVT_LTD]: 5, [ENTITY_TYPES.LLP]: 5, [ENTITY_TYPES.PARTNERSHIP]: 4, [ENTITY_TYPES.OPC]: 0, [ENTITY_TYPES.PROPRIETORSHIP]: 0 }
            }
        ]
    },
    {
        id: 2,
        text: "Is protecting your personal assets (Limited Liability) important?",
        icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
        options: [
            {
                id: 'critical',
                text: "Yes, I need complete protection",
                scores: { [ENTITY_TYPES.PVT_LTD]: 5, [ENTITY_TYPES.LLP]: 5, [ENTITY_TYPES.OPC]: 5, [ENTITY_TYPES.PARTNERSHIP]: 0, [ENTITY_TYPES.PROPRIETORSHIP]: 0 }
            },
            {
                id: 'low_concern',
                text: "Not a major concern right now",
                scores: { [ENTITY_TYPES.PARTNERSHIP]: 3, [ENTITY_TYPES.PROPRIETORSHIP]: 3, [ENTITY_TYPES.PVT_LTD]: 1, [ENTITY_TYPES.LLP]: 1, [ENTITY_TYPES.OPC]: 1 }
            }
        ]
    },
    {
        id: 3,
        text: "Do you plan to raise funds from VCs or Investors?",
        icon: <TrendingUp className="w-8 h-8 text-violet-500" />,
        options: [
            {
                id: 'investors',
                text: "Yes, seeking investment aggressively",
                scores: { [ENTITY_TYPES.PVT_LTD]: 10, [ENTITY_TYPES.LLP]: 1, [ENTITY_TYPES.OPC]: 0, [ENTITY_TYPES.PARTNERSHIP]: 0, [ENTITY_TYPES.PROPRIETORSHIP]: 0 }
            },
            {
                id: 'bootstrapped',
                text: "No, entirely bootstrapped / self-funded",
                scores: { [ENTITY_TYPES.LLP]: 4, [ENTITY_TYPES.OPC]: 3, [ENTITY_TYPES.PARTNERSHIP]: 3, [ENTITY_TYPES.PROPRIETORSHIP]: 3, [ENTITY_TYPES.PVT_LTD]: 2 }
            }
        ]
    },
    {
        id: 4,
        text: "What is your preference for annual compliance costs?",
        icon: <Wallet className="w-8 h-8 text-amber-500" />,
        options: [
            {
                id: 'low_cost',
                text: "Low (Minimal paperwork & fees)",
                scores: { [ENTITY_TYPES.PROPRIETORSHIP]: 5, [ENTITY_TYPES.PARTNERSHIP]: 4, [ENTITY_TYPES.LLP]: 3, [ENTITY_TYPES.PVT_LTD]: 0, [ENTITY_TYPES.OPC]: 1 }
            },
            {
                id: 'medium_cost',
                text: "Moderate (I can handle some filings)",
                scores: { [ENTITY_TYPES.LLP]: 5, [ENTITY_TYPES.OPC]: 4, [ENTITY_TYPES.PVT_LTD]: 3, [ENTITY_TYPES.PARTNERSHIP]: 2, [ENTITY_TYPES.PROPRIETORSHIP]: 1 }
            },
            {
                id: 'high_value',
                text: "High (Credibility is more important than cost)",
                scores: { [ENTITY_TYPES.PVT_LTD]: 5, [ENTITY_TYPES.LLP]: 2, [ENTITY_TYPES.OPC]: 2, [ENTITY_TYPES.PARTNERSHIP]: 0, [ENTITY_TYPES.PROPRIETORSHIP]: 0 }
            }
        ]
    },
    {
        id: 5,
        text: "Do you plan to give ESOPs to employees?",
        icon: <Briefcase className="w-8 h-8 text-blue-500" />,
        options: [
            {
                id: 'yes_esop',
                text: "Yes, definitely",
                scores: { [ENTITY_TYPES.PVT_LTD]: 8, [ENTITY_TYPES.LLP]: 0, [ENTITY_TYPES.OPC]: 0, [ENTITY_TYPES.PARTNERSHIP]: 0, [ENTITY_TYPES.PROPRIETORSHIP]: 0 }
            },
            {
                id: 'no_esop',
                text: "No plans currently",
                scores: { [ENTITY_TYPES.LLP]: 3, [ENTITY_TYPES.OPC]: 3, [ENTITY_TYPES.PARTNERSHIP]: 3, [ENTITY_TYPES.PROPRIETORSHIP]: 3, [ENTITY_TYPES.PVT_LTD]: 2 }
            }
        ]
    }
];

const EntitySelectorQuiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({
        [ENTITY_TYPES.PVT_LTD]: 0,
        [ENTITY_TYPES.LLP]: 0,
        [ENTITY_TYPES.OPC]: 0,
        [ENTITY_TYPES.PARTNERSHIP]: 0,
        [ENTITY_TYPES.PROPRIETORSHIP]: 0
    });
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (option: Option) => {
        const newScores = { ...scores };
        Object.keys(option.scores).forEach(entity => {
            newScores[entity] = (newScores[entity] || 0) + option.scores[entity];
        });
        setScores(newScores);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScores({
            [ENTITY_TYPES.PVT_LTD]: 0,
            [ENTITY_TYPES.LLP]: 0,
            [ENTITY_TYPES.OPC]: 0,
            [ENTITY_TYPES.PARTNERSHIP]: 0,
            [ENTITY_TYPES.PROPRIETORSHIP]: 0
        });
        setShowResult(false);
    };

    const getRecommendedEntity = (): EntityResult => {
        const sortedEntities = Object.entries(scores).sort(([, a], [, b]) => b - a);
        const topEntity = sortedEntities[0][0];

        // Basic data map for the result card
        const ENTITY_DETAILS: Record<string, Omit<EntityResult, 'recommended'>> = {
            [ENTITY_TYPES.PVT_LTD]: {
                id: 'pvt',
                name: ENTITY_TYPES.PVT_LTD,
                description: "The most popular choice for startups looking to raise funds and scale aggressively.",
                pros: ["Limited Liability Protection", "Easy to Raise Funds (VC/Angel)", "High Market Credibility", "ESOP Options"],
                cons: ["Higher Compliance Cost", "Annual Audits Mandatory"]
            },
            [ENTITY_TYPES.LLP]: {
                id: 'llp',
                name: ENTITY_TYPES.LLP,
                description: "Perfect for service-based businesses and partners who want protection without high compliance.",
                pros: ["Limited Liability Protection", "Lower Compliance Cost", "No Mandatory Audit (upto limits)", "Flexible Agreement"],
                cons: ["Cannot Raise Venture Capital", "Higher Tax Rate (Flat 30%)"]
            },
            [ENTITY_TYPES.OPC]: {
                id: 'opc',
                name: ENTITY_TYPES.OPC,
                description: "Ideal for solo entrepreneurs who want the credibility of a company with limited liability.",
                pros: ["Single Owner Control", "Limited Liability", "Professional Entity Status"],
                cons: ["Higher Tax Rate (Flat 30%)", "Cannot Add Partners later", "High Compliance like Pvt Ltd"]
            },
            [ENTITY_TYPES.PARTNERSHIP]: {
                id: 'partnership',
                name: ENTITY_TYPES.PARTNERSHIP,
                description: "Good for small home businesses or traditional family businesses with minimal legal needs.",
                pros: ["Easy to Form", "Minimal Compliance", "Low Cost"],
                cons: ["Unlimited Liability (Risky)", "No Legal Distinct Entity", "Hard to Transfer"]
            },
            [ENTITY_TYPES.PROPRIETORSHIP]: {
                id: 'proprietorship',
                name: ENTITY_TYPES.PROPRIETORSHIP,
                description: "The simplest form for individuals starting small shops or freelance work.",
                pros: ["Simplest to Start", "Lowest Compliance", "Complete Control"],
                cons: ["Unlimited Liability", "No Continuous Existence", "Hard to Scale"]
            }
        };

        return { ...ENTITY_DETAILS[topEntity], recommended: true };
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-50/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {!showResult ? (
                    <div className="space-y-12">
                        <div className="text-center space-y-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest"
                            >
                                <HelpCircle className="w-4 h-4" />
                                Find Your Perfect Fit
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Entity Selector Quiz</h2>
                            <p className="text-slate-500 max-w-xl mx-auto text-lg">
                                Answer {QUESTIONS.length} simple questions to find the best legal structure for your new business.
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-indigo-600 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        {/* Question Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>

                                <div className="flex flex-col items-center text-center space-y-8 relative z-10">
                                    <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center shadow-sm text-indigo-600">
                                        {QUESTIONS[currentQuestionIndex].icon}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                                        {QUESTIONS[currentQuestionIndex].text}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        {QUESTIONS[currentQuestionIndex].options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => handleAnswer(option)}
                                                className="group relative p-6 bg-slate-50 hover:bg-indigo-600 border border-slate-100 hover:border-indigo-600 rounded-2xl transition-all duration-300 text-left flex items-center justify-between"
                                            >
                                                <span className="font-bold text-slate-700 group-hover:text-white text-lg">{option.text}</span>
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                                    <ArrowRight className="w-5 h-5 text-indigo-600" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-14 shadow-3xl relative overflow-hidden border-4 border-white/10"
                    >
                        {/* Result Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/30 via-slate-900 to-slate-900"></div>

                        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>

                            <div className="space-y-4">
                                <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-widest border border-indigo-500/30">
                                    Recommended Structure
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black">{getRecommendedEntity().name}</h2>
                                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                    {getRecommendedEntity().description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl bg-white/5 rounded-3xl p-8 border border-white/10">
                                <div className="space-y-4">
                                    <h4 className="font-black text-emerald-400 uppercase tracking-widest text-sm text-left">Why it fits you</h4>
                                    <ul className="space-y-3 text-left">
                                        {getRecommendedEntity().pros.map((pro, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-black text-amber-400 uppercase tracking-widest text-sm text-left">Things to consider</h4>
                                    <ul className="space-y-3 text-left">
                                        {getRecommendedEntity().cons.map((con, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div> {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-8">
                                <Link
                                    to="/contact"
                                    className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all shadow-xl shadow-white/10 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Building2 className="w-5 h-5" /> Register This Entity
                                </Link>
                                <button
                                    onClick={resetQuiz}
                                    className="px-10 py-5 bg-transparent border-2 border-slate-700 text-slate-300 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <RefreshCcw className="w-5 h-5" /> Retake Quiz
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default EntitySelectorQuiz;
