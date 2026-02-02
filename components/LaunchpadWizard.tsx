
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Rocket,
    ArrowRight,
    ArrowLeft,
    Building2,
    Users,
    MapPin,
    Briefcase,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Zap,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Step {
    id: string;
    title: string;
    question: string;
    options: { id: string; label: string; icon: React.ReactNode; description: string }[];
}

const STEPS: Step[] = [
    {
        id: 'industry',
        title: 'Your Industry',
        question: 'What sector does your business operate in?',
        options: [
            { id: 'tech', label: 'Tech & Software', icon: <Zap />, description: 'SaaS, Apps, AI, Fintech' },
            { id: 'food', label: 'Food & Beverage', icon: <Building2 />, description: 'Restaurant, Cloud Kitchen, FSSAI' },
            { id: 'retail', label: 'Retail & E-commerce', icon: <Briefcase />, description: 'Store, Marketplace, GST' },
            { id: 'services', label: 'Professional Services', icon: <Users />, description: 'Consultancy, Agency, PT' },
        ]
    },
    {
        id: 'team',
        title: 'Team Size',
        question: 'How many co-founders or employees do you have?',
        options: [
            { id: 'solo', label: 'Solo Founder', icon: <Users />, description: 'Just me, for now' },
            { id: 'small', label: '2-5 People', icon: <Users />, description: 'Small core team' },
            { id: 'medium', label: '5-20 People', icon: <Users />, description: 'Growing startup' },
            { id: 'large', label: '20+ People', icon: <Building2 />, description: 'Established scale' },
        ]
    },
    {
        id: 'location',
        title: 'Primary Location',
        question: 'Where is your business headquartered?',
        options: [
            { id: 'metro', label: 'Tier 1 Metro', icon: <MapPin />, description: 'Bangalore, Mumbai, Delhi' },
            { id: 'tier2', label: 'Tier 2 City', icon: <MapPin />, description: 'Pune, Jaipur, Ahmedabad' },
            { id: 'remote', label: 'Remote / Virtual', icon: <MapPin />, description: 'Digital presence only' },
        ]
    }
];

const LaunchpadWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (stepId: string, optionId: string) => {
        setSelections(prev => ({ ...prev, [stepId]: optionId }));
        if (currentStep < STEPS.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 300);
        } else {
            setTimeout(() => setIsFinished(true), 300);
        }
    };

    const getRoadmap = () => {
        const roadmap = [
            { id: 'inc', name: 'Company Incorporation', time: '5-7 Days', status: 'Priority 1', icon: <Building2 /> },
        ];

        if (selections['industry'] === 'food') {
            roadmap.push({ id: 'fssai', name: 'FSSAI License', time: '10-15 Days', status: 'Mandatory', icon: <ShieldCheck /> });
        }

        if (selections['industry'] === 'tech' || selections['industry'] === 'retail') {
            roadmap.push({ id: 'gst', name: 'GST Registration', time: '3-5 Days', status: 'Required for Trading', icon: <Zap /> });
        }

        if (selections['team'] !== 'solo') {
            roadmap.push({ id: 'pt', name: 'Professional Tax (PT)', time: '2-3 Days', status: 'Compliance', icon: <Briefcase /> });
        }

        roadmap.push({ id: 'msme', name: 'MSME / Udyam', time: '1 Day', status: 'Recommended', icon: <Sparkles /> });

        return roadmap;
    };

    if (isFinished) {
        const roadmap = getRoadmap();
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="text-center mb-12 space-y-4">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4" /> Roadmap Generated
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Your Majestic Launchpad</h2>
                        <p className="text-slate-500 font-medium max-w-xl mx-auto">We've analyzed your inputs. Based on your profile, here is your prioritized compliance sequence.</p>
                    </div>

                    <div className="space-y-4 mb-12">
                        {roadmap.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-indigo-600/30 hover:bg-white transition-all shadow-sm hover:shadow-xl"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white text-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    {item.icon}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-black text-slate-900 text-lg">{item.name}</h4>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                        <Zap className="w-3 h-3" /> Estimate: {item.time}
                                    </div>
                                </div>
                                <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-indigo-600 transition-colors" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Link
                            to="/pricing"
                            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all text-center"
                        >
                            Get Started with Bundle
                        </Link>
                        <button
                            onClick={() => { setIsFinished(false); setCurrentStep(0); setSelections({}); }}
                            className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all text-center"
                        >
                            Restart Wizard
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="flex gap-2 mb-12">
                {STEPS.map((step, idx) => (
                    <div
                        key={step.id}
                        className={`h-2 rounded-full transition-all duration-500 flex-grow ${idx <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'
                            }`}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-12"
                >
                    <div className="space-y-4">
                        <div className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Step {currentStep + 1} of {STEPS.length} • {STEPS[currentStep].title}</div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            {STEPS[currentStep].question}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {STEPS[currentStep].options.map((option) => (
                            <motion.button
                                key={option.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelect(STEPS[currentStep].id, option.id)}
                                className={`text-left p-8 rounded-[2.5rem] border-2 transition-all relative group overflow-hidden ${selections[STEPS[currentStep].id] === option.id
                                        ? 'border-indigo-600 bg-indigo-50/30'
                                        : 'border-slate-100 bg-white hover:border-slate-200'
                                    }`}
                            >
                                <div className="flex items-start gap-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${selections[STEPS[currentStep].id] === option.id
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'
                                        }`}>
                                        {option.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-xl mb-1">{option.label}</h4>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{option.description}</p>
                                    </div>
                                </div>
                                <div className={`absolute bottom-0 right-0 p-4 transition-transform duration-500 translate-x-12 translate-y-12 ${selections[STEPS[currentStep].id] === option.id ? 'translate-x-0 translate-y-0' : ''
                                    }`}>
                                    <CheckCircle2 className="w-8 h-8 text-indigo-600" />
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {currentStep > 0 && (
                        <button
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors py-4 uppercase tracking-widest text-xs"
                        >
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </button>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LaunchpadWizard;
