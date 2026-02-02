
import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../context/DataContext';
import {
    BarChart3,
    Package,
    IndianRupee,
    Rocket,
    AlertCircle,
    ArrowUpRight,
    ExternalLink,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const { serviceGroups, pricingPlans, leads } = useData();

    const stats = [
        { label: 'Service Categories', value: serviceGroups.length, icon: <Package />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Pricing Plans', value: pricingPlans.length, icon: <IndianRupee />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Active Leads', value: leads.length, icon: <Users />, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Total Services', value: serviceGroups.reduce((acc, g) => acc + g.services.length, 0), icon: <Rocket />, color: 'text-violet-600', bg: 'bg-violet-50' },
    ];

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                {React.cloneElement(stat.icon as React.ReactElement, { size: 24 })}
                            </div>
                            <div className="flex items-center gap-1 text-green-500 font-bold text-xs uppercase tracking-widest">
                                <ArrowUpRight size={14} /> Active
                            </div>
                        </div>
                        <div className="text-4xl font-black text-slate-900 mb-1 tracking-tight">{stat.value}</div>
                        <div className="text-slate-500 font-bold text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <BarChart3 className="text-indigo-600" /> Control Center
                    </h3>
                    <div className="space-y-4">
                        <Link to="/admin/services" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-indigo-50 hover:border-indigo-100 border border-transparent transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-indigo-600">
                                    <Package size={20} />
                                </div>
                                <span className="font-bold text-slate-700">Edit Service Content</span>
                            </div>
                            <ExternalLink size={18} className="text-slate-300 group-hover:text-indigo-600" />
                        </Link>
                        <Link to="/admin/pricing" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-emerald-50 hover:border-emerald-100 border border-transparent transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-emerald-600">
                                    <IndianRupee size={20} />
                                </div>
                                <span className="font-bold text-slate-700">Adjust Pricing Tiers</span>
                            </div>
                            <ExternalLink size={18} className="text-slate-300 group-hover:text-emerald-600" />
                        </Link>
                        <Link to="/admin/crm" className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-amber-50 hover:border-amber-100 border border-transparent transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:text-amber-600">
                                    <Users size={20} />
                                </div>
                                <span className="font-bold text-slate-700">Manage Leads (CRM)</span>
                            </div>
                            <ExternalLink size={18} className="text-slate-300 group-hover:text-amber-600" />
                        </Link>
                    </div>
                </div>

                {/* System Warnings / Info */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>

                    <div>
                        <div className="flex items-center gap-3 mb-6 bg-white/10 w-fit px-4 py-2 rounded-full border border-white/10">
                            <AlertCircle size={16} className="text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Persistence Notice</span>
                        </div>
                        <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">Changes are stored in <br />Local Storage.</h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">To reflect changes on other devices, a cloud database integration (like Supabase or Firebase) is required. Current changes will persist on this browser only.</p>
                    </div>

                    <div className="mt-12 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm italic">
                        <span className="text-indigo-400 font-black text-xs block mb-1 uppercase tracking-widest">Development Tip</span>
                        <p className="text-[11px] text-slate-300">You can clear LocalStorage or use the 'Reset' button in Settings to revert to the default `constants.tsx` values.</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
