
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, Save, RotateCcw, ChevronRight, Check } from 'lucide-react';
import { DetailedService, ServiceGroup } from '../../types';

const AdminServices: React.FC = () => {
    const { serviceGroups, updateServiceGroups, resetToDefaults } = useData();
    const [editingGroups, setEditingGroups] = useState<ServiceGroup[]>(JSON.parse(JSON.stringify(serviceGroups)));
    const [successMessage, setSuccessMessage] = useState(false);

    const handleGroupChange = (idx: number, field: keyof ServiceGroup, value: any) => {
        const newGroups = [...editingGroups];
        newGroups[idx] = { ...newGroups[idx], [field]: value };
        setEditingGroups(newGroups);
    };

    const handleServiceChange = (groupIdx: number, serviceIdx: number, field: keyof DetailedService, value: any) => {
        const newGroups = [...editingGroups];
        const newServices = [...newGroups[groupIdx].services];
        newServices[serviceIdx] = { ...newServices[serviceIdx], [field]: value };
        newGroups[groupIdx].services = newServices;
        setEditingGroups(newGroups);
    };

    const addService = (groupIdx: number) => {
        const newGroups = [...editingGroups];
        newGroups[groupIdx].services.push({ name: 'New Service', startingPrice: '₹0', features: [] });
        setEditingGroups(newGroups);
    };

    const removeService = (groupIdx: number, serviceIdx: number) => {
        const newGroups = [...editingGroups];
        newGroups[groupIdx].services.splice(serviceIdx, 1);
        setEditingGroups(newGroups);
    };

    const addCategory = () => {
        const newGroups = [...editingGroups];
        newGroups.push({
            category: 'New Category',
            description: 'Provide a description for this category.',
            services: [{ name: 'Initial Service', startingPrice: '₹0', features: [] }]
        });
        setEditingGroups(newGroups);
    };

    const removeCategory = (gIdx: number) => {
        if (window.confirm("Are you sure you want to delete this entire category and all its services?")) {
            const newGroups = [...editingGroups];
            newGroups.splice(gIdx, 1);
            setEditingGroups(newGroups);
        }
    };

    const handleSave = () => {
        updateServiceGroups(editingGroups);
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all services to defaults? This will erase your local edits.")) {
            resetToDefaults();
            window.location.reload();
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col items-start gap-6 mb-8">
                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full">
                    <button
                        onClick={handleSave}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 active:scale-95"
                    >
                        <Save size={18} /> Save Changes
                    </button>
                    <button
                        onClick={handleReset}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <RotateCcw size={18} /> Reset
                    </button>
                    <button
                        onClick={addCategory}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 sm:ml-auto"
                    >
                        <Plus size={18} /> New Category
                    </button>
                </div>
                {successMessage && (
                    <div className="w-full flex items-center gap-2 text-green-600 bg-green-50 px-6 py-3 rounded-xl border border-green-100 font-bold text-sm animate-in fade-in slide-in-from-top-2">
                        <Check size={18} /> Changes saved successfully!
                    </div>
                )}
            </div>

            <div className="space-y-12">
                {editingGroups.map((group, gIdx) => (
                    <div key={gIdx} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-1 flex-grow max-w-2xl">
                                <input
                                    type="text"
                                    value={group.category}
                                    onChange={(e) => handleGroupChange(gIdx, 'category', e.target.value)}
                                    className="bg-transparent text-2xl font-black text-slate-900 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600/10 rounded-lg"
                                />
                                <textarea
                                    value={group.description}
                                    onChange={(e) => handleGroupChange(gIdx, 'description', e.target.value)}
                                    className="bg-transparent text-slate-500 font-medium text-sm w-full block resize-none h-10 focus:outline-none focus:ring-2 focus:ring-indigo-600/10 rounded-lg py-1 px-2 -ml-2"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => addService(gIdx)}
                                    className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-100 transition-colors"
                                >
                                    <Plus size={16} /> Add Service
                                </button>
                                <button
                                    onClick={() => removeCategory(gIdx)}
                                    className="flex items-center gap-2 bg-red-50 text-red-500 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 size={16} /> Delete Category
                                </button>
                            </div>
                        </div>

                        <div className="p-10">
                            <div className="grid gap-6">
                                {group.services.map((service, sIdx) => (
                                    <div key={sIdx} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center gap-6 group/row">
                                        <div className="flex-grow grid md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Service Name</label>
                                                <input
                                                    type="text"
                                                    value={service.name}
                                                    onChange={(e) => handleServiceChange(gIdx, sIdx, 'name', e.target.value)}
                                                    className="bg-white text-sm font-bold text-slate-800 w-full border border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-600 focus:outline-none shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Starting Price</label>
                                                <input
                                                    type="text"
                                                    value={service.startingPrice}
                                                    onChange={(e) => handleServiceChange(gIdx, sIdx, 'startingPrice', e.target.value)}
                                                    className="bg-white text-sm font-bold text-slate-800 w-full border border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-600 focus:outline-none shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeService(gIdx, sIdx)}
                                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover/row:opacity-100"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default AdminServices;
