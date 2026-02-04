import React, { useEffect } from 'react';
import EntitySelector from '../components/EntitySelector';
import { ShieldCheck } from 'lucide-react';

const EntitySelectorPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">

                <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-6">
                    <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                    Find Your Perfect Structure
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-16 leading-relaxed">
                    Not sure if you should register as a Pvt Ltd, LLP, or OPC?
                    Answer 3 simple questions to get an instant recommendation.
                </p>

                <EntitySelector />
            </div>
        </div>
    );
};

export default EntitySelectorPage;
