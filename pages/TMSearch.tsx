
import React from 'react';
import {
    Search,
    Info,
    ExternalLink,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Lock,
    Globe
} from 'lucide-react';

const TMSearch: React.FC = () => {
    const portalUrl = "https://tmrsearch.ipindia.gov.in/tmrpublicsearch/";

    return (
        <div className="bg-slate-50 min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <Search className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">TM Public Search</h1>
                        </div>
                        <p className="text-slate-500 font-medium">Verify trademark availability via the Intellectual Property India Portal.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-slate-200">
                        <Lock className="w-3 h-3 text-emerald-500" /> Secure Encryption Active
                    </div>
                </div>

                {/* Portal Access Hero */}
                <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Side: Instructions */}
                        <div className="p-8 md:p-16 space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                                    Access the Official <br />
                                    <span className="text-indigo-600">Trademark Database</span>
                                </h2>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    Due to security protocols of the IP India portal (ipindia.gov.in), the search engine must be accessed through a direct secure window. We've prepared a guided tunnel for you.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Step-by-Step Guide</h3>
                                <div className="space-y-4">
                                    {[
                                        "Click the 'Launch Portal' button below.",
                                        "Select 'Wordmark' in the Search Type on the official site.",
                                        "Enter your brand name and check for conflicting marks."
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-black shrink-0">
                                                {i + 1}
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
                                    Launch Official Portal <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Visual/Badge */}
                        <div className="bg-slate-900 p-8 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.2),transparent)]"></div>
                            <div className="relative z-10 space-y-8">
                                <div className="w-24 h-24 bg-indigo-500/10 rounded-[2.5rem] border border-indigo-500/20 flex items-center justify-center mx-auto scale-110">
                                    <ShieldCheck className="w-12 h-12 text-indigo-400" strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-white text-xl font-black tracking-tight">Verified Secure Endpoint</div>
                                    <p className="text-slate-400 text-sm max-w-[280px] mx-auto leading-relaxed">
                                        We ensure your search parameters remain private and direct to the government database.
                                    </p>
                                </div>
                                <div className="flex items-center justify-center gap-6 pt-4">
                                    <div className="flex flex-col items-center gap-2 text-indigo-400">
                                        <Globe className="w-6 h-6" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Sync</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/10"></div>
                                    <div className="flex flex-col items-center gap-2 text-indigo-400">
                                        <CheckCircle2 className="w-6 h-6" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Official Data</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips Grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem]">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-6 h-6 text-indigo-600" />
                            <h4 className="font-black text-indigo-900 uppercase text-xs tracking-widest leading-none">Critical Search Tip</h4>
                        </div>
                        <p className="text-indigo-800 text-sm leading-relaxed font-medium">
                            Don't just search for the exact name. Use the <strong>'Phonetic'</strong> search option as well. If your brand name sounds like an existing trademark, your application might get objected.
                        </p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="w-6 h-6 text-indigo-400" />
                            <h4 className="font-black text-slate-400 uppercase text-xs tracking-widest leading-none">Legal Assistance</h4>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                            Interpreting search results can be tricky. If you see many 'Opposed' or 'Registered' marks similar to yours, our IP attorneys can help you refine your brand strategy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TMSearch;
