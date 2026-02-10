import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    User,
    Mail,
    Phone,
    Building2,
    MapPin,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';

interface PlanDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planPrice: string;
    items?: string[]; // Optional for items in a bundle
}

type Step = 'contact' | 'business' | 'success';

const PlanDetailsModal: React.FC<PlanDetailsModalProps> = ({
    isOpen,
    onClose,
    planName,
    planPrice,
    items
}) => {
    const { addLead } = useData();
    const [step, setStep] = useState<Step>('contact');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [leadId, setLeadId] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        businessName: '',
        city: '',
        businessType: planName
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateContact = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName) newErrors.fullName = 'Name is required';
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateBusiness = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.city) newErrors.city = 'City/State is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 'contact' && validateContact()) {
            setStep('business');
        }
    };

    const handleSubmit = async () => {
        if (validateBusiness()) {
            setIsSubmitting(true);

            const rawLead = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                businessName: formData.businessName,
                location: formData.city,
                plan: planName,
                price: planPrice,
                items: items
            };

            const newLead = await addLead(rawLead);
            setLeadId(newLead.id);

            // Simulate API delay for UX
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsSubmitting(false);
            setStep('success');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-black text-slate-900">Plan Details</h3>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                                {planName} • <span className="text-indigo-600">₹{planPrice}</span>
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-100 flex">
                        <div
                            className={`h-full bg-indigo-600 transition-all duration-500 ${step === 'contact' ? 'w-1/3' : step === 'business' ? 'w-2/3' : 'w-full'
                                }`}
                        />
                    </div>

                    <div className="p-8">
                        <AnimatePresence mode="wait">
                            {step === 'contact' && (
                                <motion.div
                                    key="contact"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center mb-6">
                                        <h4 className="text-2xl font-black text-slate-900">Let's Get Started</h4>
                                        <p className="text-slate-500 text-sm">Please provide your contact information to reserve your plan.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="group relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={formData.fullName}
                                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all font-bold ${errors.fullName ? 'border-red-200 bg-red-50' : 'border-transparent focus:border-indigo-600'
                                                    }`}
                                            />
                                            {errors.fullName && <p className="text-red-500 text-[10px] font-black uppercase mt-1 ml-4">{errors.fullName}</p>}
                                        </div>

                                        <div className="group relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all font-bold ${errors.email ? 'border-red-200 bg-red-50' : 'border-transparent focus:border-indigo-600'
                                                    }`}
                                            />
                                            {errors.email && <p className="text-red-500 text-[10px] font-black uppercase mt-1 ml-4">{errors.email}</p>}
                                        </div>

                                        <div className="group relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all font-bold ${errors.phone ? 'border-red-200 bg-red-50' : 'border-transparent focus:border-indigo-600'
                                                    }`}
                                            />
                                            {errors.phone && <p className="text-red-500 text-[10px] font-black uppercase mt-1 ml-4">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                    >
                                        Next Step <ArrowRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 'business' && (
                                <motion.div
                                    key="business"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center mb-6">
                                        <h4 className="text-2xl font-black text-slate-900">Business Details</h4>
                                        <p className="text-slate-500 text-sm">Tell us a bit about the business you want to register.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="group relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Proposed Business Name (Optional)"
                                                value={formData.businessName}
                                                onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl focus:outline-none transition-all font-bold"
                                            />
                                        </div>

                                        <div className="group relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="City / State"
                                                value={formData.city}
                                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl focus:outline-none transition-all font-bold ${errors.city ? 'border-red-200 bg-red-50' : 'border-transparent focus:border-indigo-600'
                                                    }`}
                                            />
                                            {errors.city && <p className="text-red-500 text-[10px] font-black uppercase mt-1 ml-4">{errors.city}</p>}
                                        </div>

                                        <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex gap-4">
                                            <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                            <p className="text-indigo-900/70 text-[10px] leading-relaxed font-bold uppercase tracking-wider">
                                                Initial verification usually takes 2-4 hours after selection. Our expert will call you on <span className="text-indigo-600">{formData.phone || 'your number'}</span>.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep('contact')}
                                            className="w-1/3 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all active:scale-[0.98]"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="flex-grow bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                                </>
                                            ) : (
                                                <>Complete Selection <ArrowRight className="w-5 h-5" /></>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8 space-y-6"
                                >
                                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-black text-slate-900">Successfully Reserved!</h4>
                                        <p className="text-slate-500 mt-2">
                                            We've received your data for the <span className="font-bold text-slate-900">{planName}</span>.
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-3xl text-left space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Summary</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-slate-600">Lead ID:</span>
                                            <span className="font-black text-indigo-600">{leadId}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-slate-600">Selected Plan:</span>
                                            <span className="font-black text-slate-900">{planName}</span>
                                        </div>
                                        {items && items.length > 0 && (
                                            <div className="flex justify-between items-start">
                                                <span className="font-bold text-slate-600">Bundle Includes:</span>
                                                <span className="text-[10px] font-bold text-slate-500 text-right max-w-[60%]">{items.join(', ')}</span>
                                            </div>
                                        )}
                                        <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                                            <span className="font-black text-slate-900">Total Professional Fee:</span>
                                            <span className="text-2xl font-black text-emerald-600">₹{planPrice}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all active:scale-[0.98]"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PlanDetailsModal;
