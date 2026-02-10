import React, { useState } from 'react';
import { supabase } from '../src/supabaseClient';
import { SERVICE_GROUPS } from '../constants';
import { Loader2, Check, AlertCircle } from 'lucide-react';

const DataSeeder: React.FC = () => {
    const [status, setStatus] = useState<string>('Ready to seed');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const seedData = async () => {
        setLoading(true);
        setStatus('Starting migration...');
        setError(null);

        try {
            // 1. Insert Categories
            for (const group of SERVICE_GROUPS) {
                setStatus(`Processing category: ${group.category}`);

                // Insert category
                const { data: categoryData, error: catError } = await supabase
                    .from('categories')
                    .upsert({ name: group.category, description: group.description }, { onConflict: 'name' })
                    .select()
                    .single();

                if (catError) throw new Error(`Error inserting category ${group.category}: ${catError.message}`);
                if (!categoryData) throw new Error(`No data returned for category ${group.category}`);

                const categoryId = categoryData.id;

                // 2. Insert Services for this category
                for (const service of group.services) {
                    setStatus(`Inserting service: ${service.name}`);

                    const { error: serviceError } = await supabase
                        .from('services')
                        .insert({
                            category_id: categoryId,
                            name: service.name,
                            starting_price: service.startingPrice,
                            features: service.features
                        });

                    if (serviceError) throw new Error(`Error inserting service ${service.name}: ${serviceError.message}`);
                }
            }

            setStatus('Migration Complete! All data has been seeded.');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An unknown error occurred');
            setStatus('Migration Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-slate-100 mt-10">
            <h2 className="text-2xl font-bold mb-4">Database Migration Utility</h2>
            <p className="mb-6 text-slate-600">
                This tool will migrate your local <code>SERVICE_GROUPS</code> data to your Supabase PostgreSQL database.
                It expects <code>categories</code> and <code>services</code> tables to exist.
            </p>

            {error && (
                <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            <div className="bg-slate-100 p-4 rounded-lg mb-6 font-mono text-sm min-h-[100px]">
                {status}
            </div>

            <button
                onClick={seedData}
                disabled={loading}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <Check />}
                {loading ? 'Migrating Data...' : 'Start Migration'}
            </button>
        </div>
    );
};

export default DataSeeder;
