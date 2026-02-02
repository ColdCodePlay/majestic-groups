
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
  Utensils,
  Activity,
  Globe,
  ShoppingBag,
  Store,
  Briefcase,
  Banknote,
  FileCheck,
  Award,
  ShieldCheck,
  LayoutGrid,
  Filter,
  Info,
  Rocket,
  FileText,
  Presentation,
  TrendingUp,
  Headphones,
  ClipboardCheck,
  ListChecks,
  Sparkles
} from 'lucide-react';
import { CATEGORY_ICONS } from '../constants';
import { ServiceCategory, DetailedService } from '../types';
import { useData } from '../context/DataContext';
import EntityComparison from '../components/EntityComparison';
import PlanDetailsModal from '../components/PlanDetailsModal';

const AccordionSection: React.FC<{
  title: string,
  isOpen: boolean,
  onToggle: () => void,
  icon: React.ReactNode,
  children: React.ReactNode
}> = ({ title, isOpen, onToggle, icon, children }) => {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
            {icon}
          </div>
          <span className={`font-bold text-sm tracking-tight ${isOpen ? 'text-indigo-600' : 'text-slate-700'}`}>
            {title}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ service: DetailedService, onSelect: (name: string, price: string) => void }> = ({ service, onSelect }) => {
  const [openSection, setOpenSection] = useState<'features' | 'benefits' | null>(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const toggleSection = (section: 'features' | 'benefits') => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation: max 5 degrees tilt
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const displayedFeatures = showAllFeatures ? service.features : service.features.slice(0, 3);
  const hasMoreFeatures = service.features.length > 3;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: rotate.x === 0 ? 'all 0.5s ease-out' : 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d'
      }}
      className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl flex flex-col h-full group cursor-default"
    >
      <div className="p-8 pb-4" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-6">Complete documentation and expert-led processing.</p>

        {/* Accordion Container */}
        <div className="space-y-1">
          <AccordionSection
            title="What's Included"
            isOpen={openSection === 'features'}
            onToggle={() => toggleSection('features')}
            icon={<ListChecks className="w-4 h-4" />}
          >
            <ul className="space-y-2.5 px-1">
              {displayedFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 animate-in fade-in slide-in-from-left-1 duration-300">
                  <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                  </div>
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
            {hasMoreFeatures && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllFeatures(!showAllFeatures);
                }}
                className="mt-3 text-[11px] font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors uppercase tracking-widest pl-1 hover:underline"
              >
                {showAllFeatures ? (
                  <>Show Less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Show More (+{service.features.length - 3}) <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </AccordionSection>

          <AccordionSection
            title="Growth Benefits"
            isOpen={openSection === 'benefits'}
            onToggle={() => toggleSection('benefits')}
            icon={<TrendingUp className="w-4 h-4" />}
          >
            <div className="px-1 space-y-4">
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs mb-2">
                  <Sparkles className="w-3 h-3" /> Priority Compliance
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Access dedicated dashboards, real-time status tracking, and 12-month post-registration advisory support.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <Target className="w-3.5 h-3.5 text-indigo-500" /> Professional verification guaranteed
              </div>
            </div>
          </AccordionSection>
        </div>
      </div>

      <div className="p-8 pt-6 mt-auto border-t border-slate-50" style={{ transform: 'translateZ(10px)' }}>
        <div className="flex items-end justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Starting Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {service.startingPrice === "0" ? "Free" : service.startingPrice}
              </span>
              {service.startingPrice !== "0" && <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter">*</span>}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Status</span>
            <span className="text-green-600 font-bold text-[10px] bg-green-50 px-2 py-1 rounded-full border border-green-100">ACTIVE NOW</span>
          </div>
        </div>

        <button
          onClick={() => onSelect(service.name, service.startingPrice === "0" ? "Consultation (Free)" : `${service.startingPrice}`)}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-base hover:bg-indigo-700 hover:shadow-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 active:scale-[0.98] group/btn"
        >
          Select Plan
          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const { serviceGroups } = useData();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedPlan, setSelectedPlan] = useState<{ name: string, price: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const anchor = searchParams.get('anchor');
    if (anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  }, [searchParams]);

  const featuredLicenses = [
    { name: 'GST License', icon: <FileCheck className="w-4 h-4" /> },
    { name: 'FSSAI License', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Trade License', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Shop & Establishment Registration', icon: <Store className="w-4 h-4" /> },
    { name: 'Import Export Code (IEC)', icon: <Globe className="w-4 h-4" /> },
    { name: 'MSME / Udyam Registration', icon: <Award className="w-4 h-4" /> },
    { name: 'PF Registration', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'ESI Registration', icon: <Activity className="w-4 h-4" /> },
    { name: 'ISO Certification', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'Professional Tax Registration', icon: <Banknote className="w-4 h-4" /> },
  ];

  const startupFeatures = [
    { name: 'Startup India Registration', icon: <Rocket className="w-4 h-4" /> },
    { name: 'Business Plan Preparation', icon: <FileText className="w-4 h-4" /> },
    { name: 'Pitch Deck Creation', icon: <Presentation className="w-4 h-4" /> },
    { name: 'Financial Projections', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Advisory & Consultation', icon: <Headphones className="w-4 h-4" /> },
  ];

  const filteredData = useMemo(() => {
    return serviceGroups
      .filter(group => activeCategory === 'All' || group.category === activeCategory)
      .map(group => {
        const searchLower = searchTerm.toLowerCase();
        const categoryMatches = group.category.toLowerCase().includes(searchLower);

        const matchingServices = group.services.filter(s =>
          categoryMatches ||
          s.name.toLowerCase().includes(searchLower) ||
          s.features.some(f => f.toLowerCase().includes(searchLower))
        );
        return {
          ...group,
          services: matchingServices
        };
      })
      .filter(group => group.services.length > 0);
  }, [activeCategory, searchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-indigo-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Expert Business Solutions</h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            From incorporation to intellectual property, we provide end-to-end legal and financial services for your growth.
          </p>
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-indigo-300 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for a service, license or feature..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-[1.8rem] text-slate-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/20 shadow-2xl transition-all border-2 border-transparent focus:border-white/30"
            />
          </div>
        </div>
      </header>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Service Catalog</h3>
                </div>
                <div className="flex flex-col p-3 space-y-1">
                  <button
                    onClick={() => setActiveCategory('All')}
                    className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-left transition-all group ${activeCategory === 'All'
                      ? 'bg-indigo-600 text-white font-black shadow-lg shadow-indigo-100'
                      : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    <LayoutGrid className={`w-5 h-5 ${activeCategory === 'All' ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                    <span className="text-sm font-bold">All Categories</span>
                  </button>
                  <div className="h-px bg-slate-100 my-2 mx-2"></div>
                  {serviceGroups.map((group) => (
                    <button
                      key={group.category}
                      onClick={() => setActiveCategory(group.category)}
                      className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-left transition-all group ${activeCategory === group.category
                        ? 'bg-indigo-600 text-white font-black shadow-lg shadow-indigo-100'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      <span className={`transition-colors ${activeCategory === group.category ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'}`}>
                        {CATEGORY_ICONS[group.category]}
                      </span>
                      <span className="text-sm font-bold">{group.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-600 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h4 className="font-black mb-2 flex items-center gap-2 text-sm uppercase tracking-widest">
                  <Info className="w-5 h-5" /> Need Help?
                </h4>
                <p className="text-indigo-100 text-xs leading-relaxed font-medium mb-6">
                  Can't find what you're looking for? Use our AI search or consult an expert directly.
                </p>
                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-black text-xs hover:bg-indigo-50 transition-colors uppercase tracking-widest shadow-lg">
                  Chat Now
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4 space-y-20">
            {filteredData.length === 0 ? (
              <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                  <Search className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No results found</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-10 text-lg">
                  We couldn't find matches for "{searchTerm}". Try a different term or clear filters.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-base hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredData.map(group => (
                <div key={group.category} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="mb-12 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                        {CATEGORY_ICONS[group.category]}
                      </div>
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight">{group.category}</h2>
                    </div>
                    <p className="text-slate-500 text-xl leading-relaxed max-w-3xl font-medium">{group.description}</p>
                  </div>

                  {group.category === ServiceCategory.LICENSES_GOVT && (searchTerm === '' || activeCategory === ServiceCategory.LICENSES_GOVT) && (
                    <div className="mb-16 bg-white border-2 border-dashed border-indigo-200 p-10 md:p-14 rounded-[3rem] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
                      <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
                        <ClipboardCheck className="w-8 h-8 text-indigo-600" />
                        Operational Permits
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
                        {featuredLicenses.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4 text-slate-700 group/item">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border border-slate-100 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all shadow-sm group-hover/item:-rotate-3">
                              {item.icon}
                            </div>
                            <div className="pt-1">
                              <span className="text-base font-black tracking-tight text-slate-800 block group-hover/item:text-indigo-600 transition-colors">{item.name}</span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Available</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                          <Check className="w-5 h-5 text-green-500" />
                          <span>Standardized Government Forms</span>
                        </div>
                        <button
                          onClick={() => handleSelectPlan('Operational Checklist', 'Consultation (Free)')}
                          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-sm flex items-center gap-3 hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
                        >
                          Request Full Checklist <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {group.category === ServiceCategory.STARTUP_SUPPORT && (searchTerm === '' || activeCategory === ServiceCategory.STARTUP_SUPPORT) && (
                    <div className="mb-16 bg-slate-900 p-1 rounded-[3rem] shadow-2xl overflow-hidden group">
                      <div className="bg-slate-900 p-12 rounded-[2.9rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
                          <Rocket className="w-8 h-8 text-indigo-400" />
                          Founder Success Suite
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                          {startupFeatures.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-5 text-slate-300 bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all cursor-default group/feat">
                              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-xl group-hover/feat:scale-110 transition-transform">
                                {item.icon}
                              </div>
                              <span className="text-lg font-black tracking-tight text-white">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {group.services.map((service, idx) => (
                      <ServiceCard key={idx} service={service} onSelect={handleSelectPlan} />
                    ))}
                  </div>
                </div>
              ))
            )}

            <EntityComparison />

            <div className="bg-indigo-600 text-white rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-3xl">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
                <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">Scaling beyond standard plans?</h3>
                <p className="text-indigo-100 text-xl font-medium leading-relaxed">
                  Get a tailored enterprise-grade compliance roadmap designed by our senior partners for your unique business needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <button
                    onClick={() => handleSelectPlan('Enterprise Custom Quote', 'Tailored Pricing')}
                    className="w-full sm:w-auto px-12 py-6 bg-white text-indigo-600 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-2xl"
                  >
                    Request Custom Quote
                  </button>
                  <button className="w-full sm:w-auto px-12 py-6 bg-transparent hover:bg-white/10 text-white rounded-[2rem] font-black text-xl transition-all border-2 border-white/30 backdrop-blur-sm">
                    View Enterprise Case Studies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <PlanDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </div>
  );
};

export default Services;
