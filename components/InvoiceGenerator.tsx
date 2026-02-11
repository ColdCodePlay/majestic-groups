import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Download,
    Plus,
    Trash2,
    FileText,
    Printer,
    PenLine
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- Types ---
interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    gstRate: number; // 0, 5, 12, 18, 28
}

interface InvoiceState {
    invoiceNo: string;
    date: string;
    dueDate: string;
    sellerName: string;
    sellerAddress: string;
    sellerGst: string;
    clientName: string;
    clientAddress: string;
    clientGst: string;
    items: InvoiceItem[];
}

const INITIAL_STATE: InvoiceState = {
    invoiceNo: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    sellerName: 'Your Company Name',
    sellerAddress: '123 Business Park, Bangalore, KA',
    sellerGst: '',
    clientName: '',
    clientAddress: '',
    clientGst: '',
    items: [
        { id: '1', description: 'Consulting Services', quantity: 1, rate: 5000, gstRate: 18 }
    ]
};

const InvoiceGenerator = () => {
    const [invoice, setInvoice] = useState<InvoiceState>(INITIAL_STATE);
    const invoiceRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // --- Actions ---
    const addItem = () => {
        setInvoice(prev => ({
            ...prev,
            items: [
                ...prev.items,
                { id: Date.now().toString(), description: '', quantity: 1, rate: 0, gstRate: 18 }
            ]
        }));
    };

    const removeItem = (id: string) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        setInvoice(prev => ({
            ...prev,
            items: prev.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    // --- Calculations ---
    const calculateTotals = () => {
        let subtotal = 0;
        let totalGst = 0;

        invoice.items.forEach(item => {
            const amount = item.quantity * item.rate;
            const gstAmount = (amount * item.gstRate) / 100;
            subtotal += amount;
            totalGst += gstAmount;
        });

        return {
            subtotal,
            totalGst,
            grandTotal: subtotal + totalGst
        };
    };

    const totals = calculateTotals();

    // --- PDF Generation ---
    const handleDownloadPdf = async () => {
        if (!invoiceRef.current) return;
        setIsGenerating(true);

        try {
            const element = invoiceRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`Invoice_${invoice.invoiceNo}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col xl:flex-row gap-8 items-start">

            {/* --- EDITOR FORM (Left Side) --- */}
            <div className="w-full xl:w-5/12 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <PenLine className="w-5 h-5 text-indigo-600" /> Invoice Details
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Invoice No</label>
                            <input
                                type="text"
                                value={invoice.invoiceNo}
                                onChange={e => setInvoice({ ...invoice, invoiceNo: e.target.value })}
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold placeholder:font-normal"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                            <input
                                type="date"
                                value={invoice.date}
                                onChange={e => setInvoice({ ...invoice, date: e.target.value })}
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h3 className="text-xs font-bold text-indigo-600 uppercase mb-3">Seller (You)</h3>
                            <input
                                type="text" placeholder="Your Business Name"
                                value={invoice.sellerName}
                                onChange={e => setInvoice({ ...invoice, sellerName: e.target.value })}
                                className="w-full p-2 mb-2 bg-white border border-slate-200 rounded-lg text-sm font-bold placeholder:font-normal"
                            />
                            <textarea
                                placeholder="Address & Contact Info"
                                value={invoice.sellerAddress}
                                onChange={e => setInvoice({ ...invoice, sellerAddress: e.target.value })}
                                className="w-full p-2 mb-2 bg-white border border-slate-200 rounded-lg text-sm h-20"
                            />
                            <input
                                type="text" placeholder="GSTIN (Optional)"
                                value={invoice.sellerGst}
                                onChange={e => setInvoice({ ...invoice, sellerGst: e.target.value })}
                                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm uppercase"
                            />
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h3 className="text-xs font-bold text-indigo-600 uppercase mb-3">Client (Bill To)</h3>
                            <input
                                type="text" placeholder="Client Business Name"
                                value={invoice.clientName}
                                onChange={e => setInvoice({ ...invoice, clientName: e.target.value })}
                                className="w-full p-2 mb-2 bg-white border border-slate-200 rounded-lg text-sm font-bold placeholder:font-normal"
                            />
                            <textarea
                                placeholder="Client Address"
                                value={invoice.clientAddress}
                                onChange={e => setInvoice({ ...invoice, clientAddress: e.target.value })}
                                className="w-full p-2 mb-2 bg-white border border-slate-200 rounded-lg text-sm h-20"
                            />
                            <input
                                type="text" placeholder="Client GSTIN (Optional)"
                                value={invoice.clientGst}
                                onChange={e => setInvoice({ ...invoice, clientGst: e.target.value })}
                                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm uppercase"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Items</h2>
                    <div className="space-y-3">
                        {invoice.items.map((item, index) => (
                            <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-3 rounded-lg border border-slate-100 relative group">
                                <div className="col-span-5">
                                    <input
                                        type="text" placeholder="Item Description"
                                        value={item.description}
                                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                                        className="w-full p-2 bg-white border border-slate-200 rounded-md text-sm"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input
                                        type="number" placeholder="Qty"
                                        value={item.quantity}
                                        onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))}
                                        className="w-full p-2 bg-white border border-slate-200 rounded-md text-sm text-center"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <input
                                        type="number" placeholder="Rate"
                                        value={item.rate}
                                        onChange={e => updateItem(item.id, 'rate', Number(e.target.value))}
                                        className="w-full p-2 bg-white border border-slate-200 rounded-md text-sm text-right"
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={addItem}
                        className="mt-4 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-bold text-sm hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                </div>
            </div>

            {/* --- PREVIEW (Right Side) --- */}
            <div className="w-full xl:w-7/12 sticky top-24">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-indigo-600" /> Preview
                    </h2>
                    <button
                        onClick={handleDownloadPdf}
                        disabled={isGenerating}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                    >
                        {isGenerating ? 'Generating...' : <><Download className="w-5 h-5" /> Download PDF</>}
                    </button>
                </div>

                {/* THE ACTUAL INVOICE CANVAS */}
                <div className="bg-slate-200/50 p-4 md:p-8 rounded-2xl overflow-x-auto">
                    <div
                        ref={invoiceRef}
                        className="bg-white mx-auto shadow-2xl"
                        style={{ width: '210mm', minHeight: '297mm', padding: '15mm' }} // A4 dimensions
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">INVOICE</h1>
                                <p className="text-slate-500 font-medium">#{invoice.invoiceNo}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-slate-500 mb-1">Date Issued</div>
                                <div className="font-bold text-slate-900">{invoice.date}</div>
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="grid grid-cols-2 gap-12 mb-12">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Bill From</h3>
                                <p className="font-bold text-slate-900 text-lg mb-1">{invoice.sellerName || 'Your Company Name'}</p>
                                <p className="text-slate-500 text-sm whitespace-pre-line mb-2">{invoice.sellerAddress || 'Address Line 1\nCity, State, Zip'}</p>
                                {invoice.sellerGst && <p className="text-xs font-bold text-slate-700">GSTIN: {invoice.sellerGst}</p>}
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Bill To</h3>
                                <p className="font-bold text-slate-900 text-lg mb-1">{invoice.clientName || 'Client Name'}</p>
                                <p className="text-slate-500 text-sm whitespace-pre-line mb-2">{invoice.clientAddress || 'Client Address'}</p>
                                {invoice.clientGst && <p className="text-xs font-bold text-slate-700">GSTIN: {invoice.clientGst}</p>}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="mb-8">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-slate-900">
                                        <th className="py-3 text-xs font-black text-slate-900 uppercase tracking-wider w-1/2">Description</th>
                                        <th className="py-3 text-xs font-black text-slate-900 uppercase tracking-wider text-center">Qty</th>
                                        <th className="py-3 text-xs font-black text-slate-900 uppercase tracking-wider text-right">Rate</th>
                                        <th className="py-3 text-xs font-black text-slate-900 uppercase tracking-wider text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {invoice.items.map((item, i) => (
                                        <tr key={i} className="border-b border-slate-100">
                                            <td className="py-4 font-medium text-slate-700">{item.description || 'Item Name'}</td>
                                            <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                                            <td className="py-4 text-right text-slate-600">₹{item.rate.toLocaleString('en-IN')}</td>
                                            <td className="py-4 text-right font-bold text-slate-900">₹{(item.quantity * item.rate).toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-64 space-y-3">
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{totals.subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Tax (GST)</span>
                                    <span className="font-medium">₹{totals.totalGst.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black text-slate-900 border-t-2 border-slate-900 pt-3">
                                    <span>Total</span>
                                    <span>₹{totals.grandTotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-20 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
                            <p className="font-medium">Thank you for your business!</p>
                            <p className="mt-2">Generated via Majestic Group</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
