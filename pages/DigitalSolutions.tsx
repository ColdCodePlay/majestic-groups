
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
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { CheckCircle2, Send } from 'lucide-react';

const DigitalSolutions: React.FC = () => {
    const { addLead } = useData();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        plan: 'Digital Marketing',
        location: '', // Using location field for message/context
        price: 'Consultation'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addLead({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                plan: `Digital Solution: ${formData.plan}`,
                price: formData.price,
                source: 'Digital Solutions Page'
            });
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                plan: 'Digital Marketing',
                location: '',
                price: 'Consultation'
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                        <a
                                            href="#contact-form"
                                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                                        >
                                            Expert Consultation <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact-form" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Get Started</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Ready to start your <span className="text-indigo-600">Digital Journey?</span></h2>
                        </div>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed">
                            Tell us about your project and our tech experts will get back to you with a custom roadmap and proposal within 24 hours.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Custom Software Architecture",
                                "Performance-First Marketing",
                                "Scalable Cloud Infrastructure",
                                "Dedicated Success Manager"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <span className="text-slate-700 font-bold text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl relative">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12 space-y-6"
                                >
                                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900">Request Received!</h3>
                                    <p className="text-slate-500 font-medium max-w-xs mx-auto">
                                        Our digital solutions expert will contact you shortly to discuss your project.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-indigo-600 font-black text-sm hover:underline"
                                    >
                                        Send another request
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="John Doe"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Interested In</label>
                                            <select
                                                value={formData.plan}
                                                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none"
                                            >
                                                <option>Digital Marketing</option>
                                                <option>Lead Generation</option>
                                                <option>Inventory App</option>
                                                <option>Billing/ERP App</option>
                                                <option>Restaurant App</option>
                                                <option>Custom Solution</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Brief Message</label>
                                        <textarea
                                            rows={4}
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            placeholder="Tell us about your requirements..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Submit Request <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
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
                            <a
                                href="#contact-form"
                                className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-2xl hover:scale-105 active:scale-95 inline-block"
                            >
                                Book a Free Demo
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DigitalSolutions;
