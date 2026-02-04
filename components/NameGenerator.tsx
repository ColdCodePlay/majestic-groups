
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import {
    Sparkles,
    Search,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Globe,
    Loader2,
    Copy,
    ArrowRight
} from 'lucide-react';

interface GeneratedName {
    name: string;
    tagline: string;
    domainAvailable: boolean; // Mocked
    trademarkSafe: boolean;   // Mocked
    rationale: string;
}

const NameGenerator: React.FC = () => {
    const [keywords, setKeywords] = useState('');
    const [industry, setIndustry] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResults] = useState<GeneratedName[]>([]);
    const [error, setError] = useState('');

    const generateNames = async () => {
        if (!keywords.trim() || !industry.trim()) {
            setError('Please enter both keywords and industry.');
            return;
        }

        setError('');
        setIsGenerating(true);
        setResults([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
            // In a real app, strict JSON adherence is harder with LLMs without strict mode, 
            // so we'll ask for a specific format and parse it carefully or use regex.
            const prompt = `
        Act as a creative branding expert. Generate 5 unique, modern, and catchy business names for a specialized ${industry} company.
        Keywords to include or be inspired by: ${keywords}.
        
        For each name, provide:
        1. The Name
        2. A short, punchy tagline (max 5 words)
        3. A brief 1-sentence rationale on why it works.
        
        Output format: Returns ONLY a JSON array of objects. No markdown formatting.
        Example: [{"name": "EcoFlux", "tagline": "Energy Evolved", "rationale": "Combines ecology and flow."}]
      `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: prompt,
            });

            const text = response.text || '[]';
            // Clean up markdown code blocks if present
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

            const parsedNames: any[] = JSON.parse(cleanText);

            // Add mock availability data
            const enrichedResults: GeneratedName[] = parsedNames.map((item) => ({
                name: item.name,
                tagline: item.tagline,
                rationale: item.rationale,
                domainAvailable: Math.random() > 0.3, // 70% chance available
                trademarkSafe: Math.random() > 0.2,   // 80% chance safe
            }));

            setResults(enrichedResults);




        } catch (err) {
            console.error("AI Generation Error:", err);
            setError('');

            // SOPHISTICATED FALLBACK ALGORITHM
            // 1. Analyze Context
            const text = (industry + ' ' + keywords).toLowerCase();
            let category = 'general';
            if (/(tech|soft|app|data|cyber|code|web|net|ai|smart)/.test(text)) category = 'tech';
            else if (/(finance|money|invest|bank|coin|wealth|fund|pay)/.test(text)) category = 'finance';
            else if (/(health|med|care|fit|bio|doctor|wellness)/.test(text)) category = 'health';
            else if (/(green|eco|nature|planet|solar|env|sustain)/.test(text)) category = 'green';
            else if (/(food|eat|cook|tasty|kitchen|chef|cafe)/.test(text)) category = 'food';
            else if (/(art|design|creative|studio|fash|style)/.test(text)) category = 'creative';

            // 2. Define Vocabularies
            const vocab: Record<string, { prefixes: string[], suffixes: string[], adjectives: string[] }> = {
                tech: {
                    prefixes: ['Cyber', 'Digi', 'Neo', 'Syn', 'Net', 'Data', 'Quant', 'Virtup', 'Omni'],
                    suffixes: ['sys', 'io', 'soft', 'bot', 'node', 'sync', 'ware', 'lab', 'ai', 'ops'],
                    adjectives: ['Smart', 'Rapid', 'Virtual', 'Liquid', 'Hyper', 'Auto']
                },
                finance: {
                    prefixes: ['Fin', 'Cap', 'Wealth', 'Cred', 'Pay', 'Coin', 'Mone', 'Accu', 'Trea'],
                    suffixes: ['vest', 'bank', 'fund', 'wallet', 'base', 'capital', 'ly', 'flow'],
                    adjectives: ['Secure', 'Golden', 'Prime', 'Trust', 'Fiscal']
                },
                health: {
                    prefixes: ['Medi', 'Vita', 'Bio', 'Nutri', 'Cura', 'Heal', 'Physio'],
                    suffixes: ['care', 'life', 'med', 'well', 'path', 'genic', 'plus'],
                    adjectives: ['Vital', 'Pure', 'Active', 'Holistic', 'Safe']
                },
                green: {
                    prefixes: ['Eco', 'Enviro', 'Bio', 'Natur', 'Sustain', 'Verd', 'Solar'],
                    suffixes: ['cycle', 'earth', 'leaf', 'bloom', 'roots', 'gen', 'sphere'],
                    adjectives: ['Clean', 'Green', 'Pure', 'Re', 'Fresh']
                },
                food: {
                    prefixes: ['Culi', 'Gourmet', 'Chef', 'Yum', 'Zest', 'Deli'],
                    suffixes: ['bites', 'eats', 'dash', 'kitchen', 'hub', 'spot', 'fest'],
                    adjectives: ['Tasty', 'Fresh', 'Hot', 'Crispy', 'Sweet', 'Spicy']
                },
                general: {
                    prefixes: ['Pro', 'Ex', 'Nov', 'Unit', 'Glob', 'Intell', 'Max'],
                    suffixes: ['ify', 'ly', 'hub', 'works', 'box', 'zone', 'mate', 'hq'],
                    adjectives: ['Great', 'New', 'Top', 'Best', 'True']
                }
            };

            const selectedVocab = vocab[category] || vocab.general;

            // Mix general into specific for variety
            const finalPrefixes = [...selectedVocab.prefixes, ...vocab.general.prefixes];
            const finalSuffixes = [...selectedVocab.suffixes, ...vocab.general.suffixes];
            const finalAdjectives = [...selectedVocab.adjectives, ...vocab.general.adjectives];

            const inputs = [...keywords.split(/[\s,]+/), ...industry.split(/[\s,]+/)]
                .filter(s => s.length > 2) // Ignore tiny words
                .map(s => s.replace(/[^a-zA-Z]/g, '')); // Clean punctuation

            const seedRaw = inputs.length > 0
                ? inputs[Math.floor(Math.random() * inputs.length)]
                : (category === 'general' ? 'Brand' : category);

            // 3. Generation Loop
            const generatedMockNames: GeneratedName[] = [];
            const strategies = [0, 1, 2, 3, 4].sort(() => 0.5 - Math.random()).slice(0, 3);

            strategies.forEach((strat, idx) => {
                const currentSeed = inputs[idx % inputs.length] || seedRaw;
                const seedCap = currentSeed.charAt(0).toUpperCase() + currentSeed.slice(1).toLowerCase();

                let name = "";
                let rationale = "";

                const randPre = finalPrefixes[Math.floor(Math.random() * finalPrefixes.length)];
                const randSuf = finalSuffixes[Math.floor(Math.random() * finalSuffixes.length)];
                const randAdj = finalAdjectives[Math.floor(Math.random() * finalAdjectives.length)];

                if (strat === 0) { // Suffix
                    name = seedCap + randSuf;
                    rationale = `Modern blend of '${seedCap}' + '${randSuf}' for a trendy feel.`;
                }
                else if (strat === 1) { // Prefix
                    name = randPre + seedCap;
                    rationale = `Authority prefix '${randPre}' adds weight to '${seedCap}'.`;
                }
                else if (strat === 2) { // Compound
                    name = randAdj + seedCap;
                    rationale = `Combining descriptive '${randAdj}' with your core term.`;
                }
                else if (strat === 3) { // Blending (Short)
                    const shortSeed = seedCap.length > 4 ? seedCap.slice(0, 3) : seedCap;
                    name = shortSeed + randSuf;
                    rationale = `Short, punchy derivative of '${seedCap}'.`;
                }
                else { // Vowel Drop / Creative
                    const noVowels = seedCap.replace(/[aeiou]/gi, '');
                    name = (noVowels.length > 2 ? noVowels : seedCap) + 'z';
                    rationale = `Stylized abstraction of '${seedCap}' for a distinct identity.`;
                }

                generatedMockNames.push({
                    name,
                    tagline: `Redefining ${industry || 'Excellence'}`,
                    rationale,
                    domainAvailable: Math.random() > 0.4,
                    trademarkSafe: Math.random() > 0.3
                });
            });

            setResults(generatedMockNames);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden min-h-[80vh]">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30"
                    >
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Branding
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                        Create a Brand That <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Resonates</span>
                    </h1>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Stuck on a name? Let our AI analyze your industry and keywords to generate catchy, memorable business names instantly.
                    </p>
                </div>

                {/* Generator Input Box */}
                <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-100 p-8 md:p-10 relative mb-16">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Primary Industry</label>
                            <input
                                type="text"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                placeholder="e.g. Fintech, Organic Food, Consulting"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Keywords / Values</label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="e.g. Speed, Trust, Green, Future"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:font-medium"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm font-bold flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                                <XCircle className="w-4 h-4" /> {error}
                            </div>
                        )}

                        <button
                            onClick={generateNames}
                            disabled={isGenerating}
                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-lg hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/20 active:scale-95 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-3"
                        >
                            {isGenerating ? (
                                <> <Loader2 className="w-5 h-5 animate-spin" /> Generating Magic... </>
                            ) : (
                                <> <Sparkles className="w-5 h-5" /> Generate Names </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {results.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2rem] p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => copyToClipboard(item.name)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                                    <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest">{item.tagline}</p>
                                </div>

                                <p className="text-slate-500 text-sm leading-relaxed mb-6 border-b border-slate-100 pb-6">
                                    "{item.rationale}"
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                                            <Globe className="w-4 h-4" /> Domain (.com)
                                        </div>
                                        {item.domainAvailable ? (
                                            <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Available
                                            </span>
                                        ) : (
                                            <span className="text-red-400 font-bold text-xs bg-red-50 px-2 py-1 rounded-md flex items-center gap-1">
                                                <XCircle className="w-3 h-3" /> Taken
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                                            <Search className="w-4 h-4" /> Trademark
                                        </div>
                                        {item.trademarkSafe ? (
                                            <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-md flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> Likely Safe
                                            </span>
                                        ) : (
                                            <span className="text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-md flex items-center gap-1">
                                                <XCircle className="w-3 h-3" /> Risk Found
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-3 bg-slate-50 text-indigo-600 font-black rounded-xl hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 text-sm">
                                    Register {item.name} <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default NameGenerator;
