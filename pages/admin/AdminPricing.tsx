import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { Save, RotateCcw, Check, ArrowRight, Tag, Calculator } from 'lucide-react';
import { PricingPlan, ComponentProps } from '../../types';

const AdminPricing: React.FC = () => {
    const { pricingPlans, updatePricingPlans, calculatorComponents, updateCalculatorComponents, resetToDefaults } = useData();
    const [editingPlans, setEditingPlans] = useState<PricingPlan[]>(JSON.parse(JSON.stringify(pricingPlans)));
    const [editingCalculator, setEditingCalculator] = useState<ComponentProps[]>(JSON.parse(JSON.stringify(calculatorComponents)));
    const [successMessage, setSuccessMessage] = useState(false);

    const handlePlanChange = (idx: number, field: keyof PricingPlan, value: any) => {
        const newPlans = [...editingPlans];
        newPlans[idx] = { ...newPlans[idx], [field]: value };
        setEditingPlans(newPlans);
    };

    const handleCalculatorChange = (idx: number, field: keyof ComponentProps, value: any) => {
        const newComponents = [...editingCalculator];
        newComponents[idx] = { ...newComponents[idx], [field]: value };
        setEditingCalculator(newComponents);
    };

    const handleSave = () => {
        updatePricingPlans(editingPlans);
        updateCalculatorComponents(editingCalculator);
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset pricing to defaults?")) {
            resetToDefaults();
            window.location.reload();
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 md:gap-0">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={handleSave}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/30 active:scale-95"
                    >
                        <Save size={18} /> Update Pricing
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <RotateCcw size={18} /> Reset
                    </button>
                </div>
                {successMessage && (
                    <div className="w-full md:w-auto flex items-center justify-center gap-2 text-green-600 bg-green-50 px-6 py-3 rounded-xl border border-green-100 font-bold text-sm animate-in fade-in slide-in-from-right-4">
                        <Check size={18} /> Pricing updated successfully!
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {editingPlans.map((plan, idx) => (
                    <div key={idx} className={`bg-white rounded-[3rem] p-10 border-2 transition-all shadow-sm flex flex-col h-full ${plan.recommended ? 'border-indigo-600' : 'border-slate-100'
                        }`}>
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Plan Tier
                                </div>
                                <button
                                    onClick={() => handlePlanChange(idx, 'recommended', !plan.recommended)}
                                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${plan.recommended ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400'
                                        }`}
                                >
                                    <Tag size={12} /> Recommended
                                </button>
                            </div>
                            <input
                                type="text"
                                value={plan.name}
                                onChange={(e) => handlePlanChange(idx, 'name', e.target.value)}
                                className="text-4xl font-black text-slate-900 w-full bg-transparent focus:outline-none mb-2"
                            />
                            <input
                                type="text"
                                value={plan.subtitle || ''}
                                placeholder="Subtitle (e.g. + Govt Fees)"
                                onChange={(e) => handlePlanChange(idx, 'subtitle', e.target.value)}
                                className="text-sm font-bold text-slate-400 w-full bg-transparent focus:outline-none italic"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block mb-2">Professional Fee</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={plan.price}
                                    onChange={(e) => handlePlanChange(idx, 'price', e.target.value)}
                                    className="text-5xl font-black text-indigo-600 w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 focus:border-indigo-600 focus:outline-none shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 flex-grow">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block">Key Features (One per line)</label>
                            <textarea
                                value={plan.features.join('\n')}
                                onChange={(e) => handlePlanChange(idx, 'features', e.target.value.split('\n'))}
                                className="w-full h-48 bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm font-bold text-slate-600 focus:border-indigo-600 focus:outline-none shadow-inner resize-none leading-relaxed"
                            />
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-50 italic text-[10px] text-slate-400 font-medium text-center">
                            Changes reflect immediately on public pricing.
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-slate-900 rounded-[3rem] p-10 md:p-14 border border-slate-800 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                        <Calculator className="text-indigo-400" /> Calculator Components
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {editingCalculator.map((comp, idx) => (
                            <div key={comp.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Component Name</label>
                                        <input
                                            type="text"
                                            value={comp.name}
                                            onChange={(e) => handleCalculatorChange(idx, 'name', e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Price (INR)</label>
                                        <input
                                            type="number"
                                            value={comp.price}
                                            onChange={(e) => handleCalculatorChange(idx, 'price', parseInt(e.target.value) || 0)}
                                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Description</label>
                                    <input
                                        type="text"
                                        value={comp.description}
                                        onChange={(e) => handleCalculatorChange(idx, 'description', e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 text-[10px] font-medium focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPricing;
