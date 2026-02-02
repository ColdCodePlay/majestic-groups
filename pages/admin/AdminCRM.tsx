
import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../context/DataContext';
import {
    Users,
    Search,
    Filter,
    Trash2,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Package,
    CheckCircle2,
    Clock,
    TrendingUp,
    XCircle,
    AlertCircle,
    Download,
    ChevronDown
} from 'lucide-react';
import { Lead, LeadStatus } from '../../types';

const STATUS_CONFIG: Record<LeadStatus, { color: string, icon: any }> = {
    'New': { color: 'bg-indigo-500', icon: Clock },
    'Contacted': { color: 'bg-emerald-500', icon: Phone },
    'In Progress': { color: 'bg-amber-500', icon: TrendingUp },
    'Converted': { color: 'bg-green-600', icon: CheckCircle2 },
    'Lost': { color: 'bg-red-500', icon: XCircle }
};

const AdminCRM: React.FC = () => {
    const { leads, updateLeadStatus, deleteLead } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
    const [dateFilter, setDateFilter] = useState<'all' | '24h' | '7d' | '30d'>('all');
    const [serviceFilter, setServiceFilter] = useState<string>('All');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    const uniqueServices = useMemo(() => {
        const services = new Set(leads.map(l => l.plan));
        return ['All', ...Array.from(services)];
    }, [leads]);

    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            const matchesSearch =
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

            const matchesService = serviceFilter === 'All' || lead.plan === serviceFilter;

            let matchesDate = true;
            if (dateFilter !== 'all') {
                const now = new Date();
                const leadDate = new Date(lead.timestamp);
                const diffTime = Math.abs(now.getTime() - leadDate.getTime());
                const diffDays = diffTime / (1000 * 60 * 60 * 24);

                if (dateFilter === '24h' && diffDays > 1) matchesDate = false;
                if (dateFilter === '7d' && diffDays > 7) matchesDate = false;
                if (dateFilter === '30d' && diffDays > 30) matchesDate = false;
            }

            return matchesSearch && matchesStatus && matchesService && matchesDate;
        });
    }, [leads, searchTerm, statusFilter, serviceFilter, dateFilter]);

    const downloadCSV = () => {
        // Filter for last 7 days as requested
        const now = new Date();
        const weekAgoLeads = leads.filter(lead => {
            const leadDate = new Date(lead.timestamp);
            const diffDays = Math.abs(now.getTime() - leadDate.getTime()) / (1000 * 60 * 60 * 24);
            return diffDays <= 7;
        });

        if (weekAgoLeads.length === 0) {
            alert('No data available for the last 7 days.');
            return;
        }

        const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Plan', 'Price', 'Location', 'Status'];
        const csvContent = [
            headers.join(','),
            ...weekAgoLeads.map(l => [
                l.id,
                new Date(l.timestamp).toLocaleDateString(),
                `"${l.name}"`,
                l.email,
                l.phone,
                `"${l.plan}"`,
                l.price,
                `"${l.location}"`,
                l.status
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `leads_last_7days_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const stats = useMemo(() => {
        const total = leads.length;
        const converted = leads.filter(l => l.status === 'Converted').length;
        const newLeads = leads.filter(l => l.status === 'New').length;
        const rate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;

        return { total, converted, newLeads, rate };
    }, [leads]);

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Lead Console</h1>
                        <p className="text-slate-500 mt-2 font-medium text-sm md:text-base">Manage and convert your business prospects.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <button
                            onClick={downloadCSV}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                        >
                            <Download className="w-4 h-4" /> Export CSV (7d)
                        </button>
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-3 flex items-center gap-3 justify-center">
                            <Users className="text-indigo-400" />
                            <div>
                                <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Pipeline</span>
                                <span className="text-xl font-black text-white">{stats.total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Clock className="w-6 h-6" />
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">New Leads</p>
                        <h3 className="text-3xl font-black text-slate-900">{stats.newLeads}</h3>
                    </div>
                    <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Converted</p>
                        <h3 className="text-3xl font-black text-slate-900">{stats.converted}</h3>
                    </div>
                    <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 hover:shadow-md transition-all group">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Conversion Rate</p>
                        <h3 className="text-3xl font-black text-slate-900">{stats.rate}%</h3>
                    </div>
                    <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 hover:shadow-md transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Efficiency Score</p>
                        <h3 className="text-3xl font-black text-slate-900">98.4</h3>
                    </div>
                </div>

                {/* Filters and List */}
                <div className="bg-slate-900 rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row gap-6 justify-between items-center">
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search leads by name, email or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-slate-500 w-4 h-4" />
                                <select
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value as any)}
                                    className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500 font-bold text-xs cursor-pointer appearance-none pr-8 relative"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                                >
                                    <option value="all">All Time</option>
                                    <option value="24h">Last 24h</option>
                                    <option value="7d">Last 7 Days</option>
                                    <option value="30d">Last 30 Days</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Package className="text-slate-500 w-4 h-4" />
                                <select
                                    value={serviceFilter}
                                    onChange={(e) => setServiceFilter(e.target.value)}
                                    className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500 font-bold text-xs cursor-pointer appearance-none pr-8 relative"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                                >
                                    {uniqueServices.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Filter className="text-slate-500 w-4 h-4" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as any)}
                                    className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500 font-bold text-xs cursor-pointer appearance-none pr-8 relative"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Lost">Lost</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/5 uppercase tracking-widest text-[10px] font-black text-slate-500">
                                    <th className="px-8 py-5">Lead</th>
                                    <th className="px-8 py-5">Contact</th>
                                    <th className="px-8 py-5">Inquiry Details</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredLeads.map((lead) => {
                                    const StatusIcon = STATUS_CONFIG[lead.status].icon;
                                    return (
                                        <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm">
                                                        {lead.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <span className="text-white font-black block leading-tight">{lead.name}</span>
                                                        <span className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{lead.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                        <Mail className="w-3.5 h-3.5 text-indigo-400" /> {lead.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                        <Phone className="w-3.5 h-3.5 text-emerald-400" /> {lead.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <span className="text-indigo-300 font-bold block text-sm">{lead.plan}</span>
                                                    <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-black">
                                                        <MapPin className="w-3 h-3" /> {lead.location}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="relative group/status">
                                                    <select
                                                        value={lead.status}
                                                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                                        className={`appearance-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-white ${STATUS_CONFIG[lead.status].color} cursor-pointer focus:outline-none pr-8 pl-4 transition-all`}
                                                    >
                                                        <option value="New">New</option>
                                                        <option value="Contacted">Contacted</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Converted">Converted</option>
                                                        <option value="Lost">Lost</option>
                                                    </select>
                                                    <StatusIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button
                                                    onClick={() => deleteLead(lead.id)}
                                                    className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {filteredLeads.length === 0 && (
                            <div className="p-20 text-center">
                                <Users className="w-16 h-16 text-slate-700 mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-bold text-slate-500">No leads found matching your criteria.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminCRM;
