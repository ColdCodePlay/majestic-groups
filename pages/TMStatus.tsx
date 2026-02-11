
import React from 'react';
import {
    ClipboardList,
    Info,
    ExternalLink,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Activity,
    UserCheck,
    Search
} from 'lucide-react';

const TMStatus: React.FC = () => {
    const portalUrl = "https://tmrsearch.ipindia.gov.in/estatus";

    return (
        <div className="bg-slate-50 min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">E-Status Check</h1>
                        </div>
                        <p className="text-slate-500 font-medium">Verify your trademark application status and history via Official Portals.</p>
                    </div>
                </div>

                {/* Portal Access Hero */}
                <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Side: Instructions */}
                        <div className="p-8 md:p-16 space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                                    Check Your <br />
                                    <span className="text-indigo-600">Application E-Status</span>
                                </h2>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    To protect application data, the Indian Trademark Registry (TMR) requires a direct secure session. Click below to launch the official tracking system.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">What You'll Need</h3>
                                <div className="space-y-4">
                                    {[
                                        "Your 7 or 8-digit Trademark Application Number.",
                                        "Choice of 'Trade Mark Number' search on the portal.",
                                        "Correct Application Date if requested by the system."
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-black shrink-0">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <p className="text-slate-700 font-bold pt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <a
                                    href={portalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg hover:bg-slate-900 transition-all shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 group"
                                >
                                    Launch Status Portal <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Visual/Status Meanings */}
                        <div className="bg-slate-900 p-8 md:p-16 flex flex-col justify-center text-white relative overflow-hidden min-h-[400px]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.1),transparent)]"></div>
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8 relative z-10">Status Guide</h3>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { label: "Formality Chk Pass", color: "bg-emerald-500", desc: "Basic documents are verified and correct." },
                                    { label: "Marked for Exam", color: "bg-amber-500", desc: "The examiner is reviewing your brand name." },
                                    { label: "Objected", color: "bg-red-500", desc: "Action required: Registry has raised concerns." },
                                    { label: "Accepted & Adv.", color: "bg-indigo-500", desc: "Your mark is published in the journal." }
                                ].map((status, i) => (
                                    <div key={i} className="flex gap-4 group cursor-default">
                                        <div className={`w-1 shrink-0 ${status.color} rounded-full group-hover:w-2 transition-all`}></div>
                                        <div className="space-y-1">
                                            <div className="font-black text-sm tracking-tight">{status.label}</div>
                                            <div className="text-[11px] text-slate-400 font-medium">{status.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-3">
                                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-time TMR Data Access</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Helpful Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                                <Search className="w-5 h-5" />
                            </div>
                            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Application History</h4>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed font-bold">
                            You can view every document ever filed or issued for your trademark by clicking on the application number after the status loads.
                        </p>
                    </div>
                    <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Need Expert Action?</h4>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed font-bold">
                            If your status shows <strong>Objected</strong>, <strong>Opposed</strong>, or <strong>Refused</strong>, you have limited time to file a legal reply. Contact us for priority assistance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TMStatus;
