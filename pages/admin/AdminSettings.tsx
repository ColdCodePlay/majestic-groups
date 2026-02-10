
import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import {
    Database,
    Globe,
    Mail,
    MessageSquare,
    Save
} from 'lucide-react';

const AdminSettings: React.FC = () => {
    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Settings</h1>
                    <p className="text-slate-500 mt-2 font-medium">Configure your Majestic Admin Panel and data persistence.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Database Info */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                                <Database size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Database Connection</h3>
                                <p className="text-slate-500 text-sm font-medium">Synced with Supabase.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Live Connection Active</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            Services are being fetched directly from your Supabase cloud database.
                                            Pricing plans and leads are currently stored locally.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* App Configuration */}
                    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm opacity-50 cursor-not-allowed">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">App Configuration</h3>
                                <p className="text-slate-500 text-sm font-medium">Global business information.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Business Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input disabled type="text" value="support@majesticgroups.com" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-600 focus:outline-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Support WhatsApp</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input disabled type="text" value="+91 9899977311" className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-600 focus:outline-none" />
                                </div>
                            </div>
                            <p className="text-[10px] text-indigo-500 font-bold italic text-right mt-4">
                                * Editable fields coming in v2.2 (Cloud Sync)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Notice */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-black mb-2 tracking-tight">System Status: Stable</h3>
                            <p className="text-slate-400 text-sm font-medium">Version 2.1 • Connected to Supabase.</p>
                        </div>
                        <button disabled className="bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-white/20 transition-all opacity-50 cursor-not-allowed">
                            <Save size={18} /> Export Config
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
