
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock,
    FileText,
    Upload,
    Download,
    Shield,
    Eye,
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    FolderOpen,
    Search,
    Key
} from 'lucide-react';

// Mock Data for Vault
interface VaultDocument {
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
    category: 'Corporate' | 'Tax' | 'KYC';
    status: 'Verified' | 'Pending' | 'Rejected';
}

const MOCK_DOCS: VaultDocument[] = [
    { id: '1', name: 'Certificate of Incorporation.pdf', type: 'PDF', date: '2023-11-01', size: '1.2 MB', category: 'Corporate', status: 'Verified' },
    { id: '2', name: 'Company PAN Card.pdf', type: 'PDF', date: '2023-11-05', size: '0.8 MB', category: 'Corporate', status: 'Verified' },
    { id: '3', name: 'GST Registration Certificate.pdf', type: 'PDF', date: '2023-11-10', size: '1.5 MB', category: 'Tax', status: 'Verified' },
    { id: '4', name: 'Director KYC - Adhaar.jpg', type: 'JPG', date: '2023-10-15', size: '2.4 MB', category: 'KYC', status: 'Pending' },
    { id: '5', name: 'Q2 GST Return Ack.pdf', type: 'PDF', date: '2023-10-20', size: '0.5 MB', category: 'Tax', status: 'Verified' },
];

const DocumentVault: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

    const filteredDocs = MOCK_DOCS.filter(doc =>
        (activeCategory === 'All' || doc.category === activeCategory) &&
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = ['All', 'Corporate', 'Tax', 'KYC'];

    return (
        <section className="py-24 bg-white relative overflow-hidden min-h-screen">
            {/* Security Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100"
                        >
                            <Lock className="w-3 h-3" />
                            256-Bit AES Encrypted
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Secure Document Vault</h2>
                        <p className="text-slate-500 max-w-xl text-lg">
                            Your permanent digital locker. Access your company's vital documents anytime, anywhere, with bank-grade security.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-95">
                            <Upload className="w-5 h-5" />
                            Upload New
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                                <FolderOpen className="w-5 h-5 text-indigo-600" />
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex justify-between items-center transition-all ${activeCategory === cat
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'text-slate-500 hover:bg-white hover:text-indigo-600'
                                            }`}
                                    >
                                        {cat}
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                                            }`}>
                                            {cat === 'All' ? MOCK_DOCS.length : MOCK_DOCS.filter(d => d.category === cat).length}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-emerald-50 rounded-[2rem] p-6 border border-emerald-100 relative overflow-hidden">
                            <div className="relative z-10">
                                <Shield className="w-8 h-8 text-emerald-600 mb-3" />
                                <h4 className="font-bold text-slate-900 mb-1">Status: Secure</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Your vault is protected by 2-Factor Authentication and end-to-end encryption.
                                </p>
                            </div>
                            <div className="absolute -bottom-4 -right-4 text-emerald-100 rotate-12">
                                <Key className="w-32 h-32" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Search Bar */}
                        <div className="mb-6 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search documents by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
                            />
                        </div>

                        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl overflow-hidden min-h-[500px]">
                            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-100 p-4 text-xs font-black uppercase tracking-widest text-slate-400">
                                <div className="col-span-12 md:col-span-5 pl-4">Name</div>
                                <div className="hidden md:block col-span-2">Category</div>
                                <div className="hidden md:block col-span-2">Date Added</div>
                                <div className="hidden md:block col-span-2">Status</div>
                                <div className="hidden md:block col-span-1 text-right pr-4">Action</div>
                            </div>

                            <div className="divide-y divide-slate-50">
                                <AnimatePresence>
                                    {filteredDocs.map((doc, idx) => (
                                        <motion.div
                                            key={doc.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="grid grid-cols-12 items-center p-4 hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                                            onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                                        >
                                            <div className="col-span-12 md:col-span-5 flex items-center gap-4 pl-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                                                    }`}>
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{doc.name}</div>
                                                    <div className="text-xs text-slate-400 md:hidden">{doc.date} • {doc.size}</div>
                                                </div>
                                            </div>

                                            <div className="hidden md:block col-span-2">
                                                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                                                    {doc.category}
                                                </span>
                                            </div>

                                            <div className="hidden md:block col-span-2 text-sm text-slate-500 font-medium">
                                                {doc.date}
                                            </div>

                                            <div className="hidden md:block col-span-2">
                                                {doc.status === 'Verified' ? (
                                                    <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold bg-green-50 w-fit px-2 py-1 rounded-full">
                                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold bg-amber-50 w-fit px-2 py-1 rounded-full">
                                                        <AlertCircle className="w-3 h-3" /> Pending Test
                                                    </div>
                                                )}
                                            </div>

                                            <div className="hidden md:flex col-span-1 justify-end pr-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-slate-200 rounded-full text-slate-500" title="View">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-indigo-100 rounded-full text-indigo-600" title="Download">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {filteredDocs.length === 0 && (
                                    <div className="p-12 text-center text-slate-400">
                                        <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>No documents found matching your filters.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center text-xs text-slate-400 font-medium px-4">
                            <p>Storage Used: 45MB / 1GB</p>
                            <p>Last Backup: Today, 10:45 AM</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DocumentVault;
