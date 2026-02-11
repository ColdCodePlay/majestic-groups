
import React from 'react';
import {
    Globe,
    Megaphone,
    Target,
    Monitor,
    ShoppingCart,
    Database,
    ArrowRight,
    Zap,
    Cpu,
    BarChart3,
    Users
} from 'lucide-react';
import { motion } from 'framer-motion';

const DigitalSolutions: React.FC = () => {
    const solutions = [
        {
            category: "Marketing & Growth",
            icon: <Megaphone className="w-8 h-8 text-indigo-400" />,
            items: [
                {
                    title: "Digital Marketing",
                    description: "End-to-end digital presence management including SEO, SEM, and social media dominance.",
                    features: ["Social Media Management", "Content Strategy", "Performance Marketing"],
                    icon: <Globe className="w-6 h-6 text-indigo-500" />
                },
                {
                    title: "Lead Generation",
                    description: "High-quality B2B & B2C lead acquisition through targeted funnels and data-driven campaigns.",
                    features: ["Conversion Optimization", "Cold Outreach Systems", "Funnel Building"],
                    icon: <Target className="w-6 h-6 text-indigo-500" />
                }
            ]
        },
        {
            category: "Software Solutions",
            icon: <Cpu className="w-8 h-8 text-indigo-400" />,
            items: [
                {
                    title: "Inventory Management App",
                    description: "Streamline your supply chain with real-time tracking, automated reordering, and multi-warehouse support.",
                    features: ["Barcode Integration", "Stock Alerts", "Supplier Management"],
                    icon: <Database className="w-6 h-6 text-indigo-500" />
                },
                {
                    title: "Billing & ERP App",
                    description: "Modernized invoicing, GST compliance, and financial reporting for businesses of all sizes.",
                    features: ["GST Ready Invoices", "Tally Integration", "Expense Tracking"],
                    icon: <BarChart3 className="w-6 h-6 text-indigo-500" />
                },
                {
                    title: "Restaurant Management App",
                    description: "Complete solution for dining, takeaway, and delivery with KOT and tabletop ordering.",
                    features: ["Table Management", "Kitchen Display System", "Integrations"],
                    icon: <Users className="w-6 h-6 text-indigo-500" />
                }
            ]
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent)]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Next-Gen Tech</span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Digital Solutions</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Empowering your business with high-performance software and growth-focused digital strategies.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-32">
                    {solutions.map((group, idx) => (
                        <div key={idx} className="space-y-12">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center shadow-2xl">
                                    {group.icon}
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{group.category}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {group.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -10 }}
                                        className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col group"
                                    >
                                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                                            {item.description}
                                        </p>
                                        <ul className="space-y-3 mb-8">
                                            {item.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                                    <Zap className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group/btn active:scale-95">
                                            Expert Consultation <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]"></div>
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Ready to Digitally Transform?</h2>
                        <p className="text-indigo-100 text-lg font-medium">
                            Join 500+ businesses that scaled their operations using our custom tech stacks and marketing intelligence.
                        </p>
                        <div className="pt-4">
                            <button className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-2xl hover:scale-105 active:scale-95">
                                Book a Free Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DigitalSolutions;
