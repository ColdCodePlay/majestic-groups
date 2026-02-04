
import React, { useEffect } from 'react';
import TrademarkSearch from '../components/TrademarkSearch';

const TrademarkSearchPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <TrademarkSearch />
            </div>
        </div>
    );
};

export default TrademarkSearchPage;
