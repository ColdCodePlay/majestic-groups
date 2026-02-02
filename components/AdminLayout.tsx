
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    Package,
    IndianRupee,
    Home,
    LogOut,
    ChevronRight,
    ShieldCheck,
    Zap,
    Users,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard /> },
        { name: 'Services', path: '/admin/services', icon: <Package /> },
        { name: 'Pricing', path: '/admin/pricing', icon: <IndianRupee /> },
        { name: 'CRM (Leads)', path: '/admin/crm', icon: <Users /> },
        { name: 'Settings', path: '/admin/settings', icon: <Settings /> },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans relative">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Admin Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col h-screen transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                }`}>
                <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-600/20">
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tight">Majestic</span>
                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] -mt-1">Admin Panel</span>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-grow p-4 space-y-1 mt-6 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all group ${isActive
                                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-4 text-sm font-bold">
                                    <div className={`transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`}>
                                        {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                                    </div>
                                    {item.name}
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <ShieldCheck className="w-5 h-5 text-indigo-400" />
                            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Master Mode</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">All changes are local and persistent across sessions.</p>
                    </div>

                    <Link to="/" className="flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-white transition-colors text-sm font-bold border-t border-slate-800">
                        <LogOut className="w-5 h-5" /> Logout Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-4 md:p-12 w-full md:w-auto overflow-x-hidden">
                <header className="flex items-center justify-between mb-8 md:mb-12">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-600"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                {menuItems.find(i => i.path === location.pathname)?.name || 'Admin'}
                            </h1>
                            <p className="text-slate-500 font-medium text-xs md:text-sm mt-1 hidden sm:block">Manage your majestic operations from here.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-indigo-100 italic">
                            <Zap className="w-3 h-3 md:w-4 md:h-4 text-indigo-600" />
                            <span className="text-[10px] md:text-xs font-bold text-indigo-600 uppercase tracking-widest">v2.1</span>
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                            <Settings className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                        </div>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default AdminLayout;
