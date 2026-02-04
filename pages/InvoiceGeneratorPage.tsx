import React, { useEffect } from 'react';
import InvoiceGenerator from '../components/InvoiceGenerator';
import { FileText } from 'lucide-react';

const InvoiceGeneratorPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-slate-50/50">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-6">
                        <FileText className="w-8 h-8 text-indigo-600" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Free Invoice Generator
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Create professional GST invoices for your business in seconds.
                        Free to use, no signup required. Download as PDF instantly.
                    </p>
                </div>

                <InvoiceGenerator />
            </div>
        </div>
    );
};

export default InvoiceGeneratorPage;
