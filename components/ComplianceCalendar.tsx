
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    AlertCircle,
    FileText,
    CheckCircle2,
    BellRing,
    Filter
} from 'lucide-react';

// Mock Data for Compliance Events
const COMPLIANCE_EVENTS = [
    {
        id: 1,
        title: 'GSTR-1 Filing',
        date: '2023-11-11',
        type: 'GST',
        description: 'Monthly return of outward supplies.',
        priority: 'High'
    },
    {
        id: 2,
        title: 'GSTR-3B Filing',
        date: '2023-11-20',
        type: 'GST',
        description: 'Monthly summary return and tax payment.',
        priority: 'High'
    },
    {
        id: 3,
        title: 'TDS Payment',
        date: '2023-11-07',
        type: 'Tax',
        description: 'Deposit of Tax Deducted at Source for previous month.',
        priority: 'Medium'
    },
    {
        id: 4,
        title: 'PF/ESI Payment',
        date: '2023-11-15',
        type: 'Labor',
        description: 'Provident Fund & ESI challan payment.',
        priority: 'Medium'
    },
    {
        id: 5,
        title: 'Advance Tax (3rd Installment)',
        date: '2023-12-15',
        type: 'Tax',
        description: 'Payment of 75% of estimated tax liability.',
        priority: 'Critical'
    },
    {
        id: 6,
        title: 'AOC-4 (ROC Filing)',
        date: '2023-10-29',
        type: 'ROC',
        description: 'Filing of financial statements for Pvt Ltd Companies.',
        priority: 'Critical'
    },
    {
        id: 7,
        title: 'MGT-7 (ROC Filing)',
        date: '2023-11-28',
        type: 'ROC',
        description: 'Annual Return filing for Pvt Ltd Companies.',
        priority: 'Critical'
    },
    {
        id: 8,
        title: 'LLP Form 8',
        date: '2023-10-30',
        type: 'ROC',
        description: 'Statement of Account & Solvency for LLPs.',
        priority: 'High'
    }
];

const EVENT_TYPES = ['All', 'GST', 'Tax', 'ROC', 'Labor'];

const ComplianceCalendar: React.FC = () => {
    const [selectedType, setSelectedType] = useState('All');
    const [currentDate, setCurrentDate] = useState(new Date("2023-11-01")); // Mocking current date for demo
    const [activeEvent, setActiveEvent] = useState<number | null>(null);

    const filteredEvents = COMPLIANCE_EVENTS.filter(e =>
        selectedType === 'All' || e.type === selectedType
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Simple calendar grid generation
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getDayOfWeek = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const startDay = getDayOfWeek(currentDate);

    const calendarDays = Array.from({ length: 42 }, (_, i) => {
        const day = i - startDay + 1;
        return day > 0 && day <= daysInMonth ? day : null;
    });

    const getEventsForDay = (day: number) => {
        if (!day) return [];
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return filteredEvents.filter(e => e.date === dateStr);
    };

    const changeMonth = (delta: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + delta);
        setCurrentDate(newDate);
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest"
                    >
                        <CalendarIcon className="w-4 h-4" />
                        Stay Compliant
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Compliance Calendar</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Never miss a deadline. Track all your statutory due dates for GST, Income Tax, and ROC in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Calendar Control & List View */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Filters */}
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                                <Filter className="w-5 h-5 text-indigo-600" />
                                Filter by Type
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {EVENT_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedType === type
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming List */}
                        <div className="bg-slate-900 text-white p-8 rounded-[2rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                                <BellRing className="w-5 h-5 text-indigo-400" />
                                Upcoming Alerts
                            </h3>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {filteredEvents.length > 0 ? (
                                    filteredEvents.map(event => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                                            onClick={() => setActiveEvent(event.id === activeEvent ? null : event.id)}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm group-hover:text-indigo-300 transition-colors">{event.title}</span>
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">{event.type}</span>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${event.priority === 'Critical' ? 'bg-red-500/20 text-red-300' :
                                                        event.priority === 'High' ? 'bg-amber-500/20 text-amber-300' :
                                                            'bg-blue-500/20 text-blue-300'
                                                    }`}>
                                                    {new Date(event.date).getDate()} {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>

                                            <AnimatePresence>
                                                {activeEvent === event.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="text-xs text-slate-400 pt-2 border-t border-white/10 mt-2"
                                                    >
                                                        {event.description}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-slate-500 text-sm">No events found for this filter.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Calendar Grid */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200">
                                    <ChevronLeft className="w-6 h-6 text-slate-600" />
                                </button>
                                <h3 className="text-2xl font-black text-slate-900">
                                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h3>
                                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200">
                                    <ChevronRight className="w-6 h-6 text-slate-600" />
                                </button>
                            </div>

                            {/* Days Header */}
                            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/30">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="py-4 text-center text-xs font-black uppercase text-slate-400 tracking-wider">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 h-[500px] overflow-hidden">
                                {calendarDays.map((day, idx) => {
                                    const events = day ? getEventsForDay(day) : [];
                                    const isToday = day === new Date().getDate() &&
                                        currentDate.getMonth() === new Date().getMonth() &&
                                        currentDate.getFullYear() === new Date().getFullYear();

                                    return (
                                        <div
                                            key={idx}
                                            className={`border-b border-r border-slate-50 relative p-2 min-h-[80px] hover:bg-slate-50 transition-colors group ${!day ? 'bg-slate-50/30' : ''
                                                }`}
                                        >
                                            {day && (
                                                <>
                                                    <span className={`text-sm font-bold block mb-2 ${isToday ? 'bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md' : 'text-slate-700'
                                                        }`}>
                                                        {day}
                                                    </span>

                                                    <div className="space-y-1">
                                                        {events.map((ev, i) => (
                                                            <div
                                                                key={i}
                                                                className={`text-[10px] px-2 py-1 rounded-md font-bold truncate cursor-help ${ev.priority === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                                        ev.priority === 'High' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                                            'bg-blue-50 text-blue-600 border border-blue-100'
                                                                    }`}
                                                                title={ev.title}
                                                            >
                                                                {ev.title}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center px-4">
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div> Critical
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div> High
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <div className="w-3 h-3 rounded-full bg-blue-400"></div> Normal
                                </div>
                            </div>
                            <button className="text-indigo-600 font-black text-sm hover:underline flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Sync to Google Calendar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplianceCalendar;
