
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Award,
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  Percent,
  Timer,
  Rocket,
  Scale,
  BadgePercent,
  Phone,
  Mail,
  ShieldCheck,
  TrendingUp,
  Gavel,
  FileText,
  Lightbulb,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SERVICE_GROUPS,
  CATEGORY_ICONS,
  TESTIMONIALS,
  COMPANY_LOGOS
} from '../constants';

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
    offerTitle: "Launch Your Dream Startup",
    discount: "Flat 30% Off",
    description: "End-to-end Private Limited Incorporation starting at just ₹1,999. Get free MSME & GST registration included.",
    cta: "Start Incorporation",
    link: "/services?q=private%20limited",
    badge: "Startup Special"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000",
    offerTitle: "Hassle-Free Tax Filing",
    discount: "Expert Support @ ₹499",
    description: "Personal and Business ITR filing made easy. Maximize your refunds with our certified tax professionals.",
    cta: "File Returns Now",
    link: "/services?q=itr",
    badge: "Tax Season"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000",
    offerTitle: "Protect Your Identity",
    discount: "Trademark @ Lowest Fees",
    description: "Secure your brand name, logo, and ideas. Expert trademark search and filing with guaranteed application tracking.",
    cta: "Register Trademark",
    link: "/services?q=trademark",
    badge: "IP Protection"
  }
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const navigate = useNavigate();

  const nextHeroSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevHeroSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isHeroPaused) {
      const interval = setInterval(nextHeroSlide, 6000);
      return () => clearInterval(interval);
    }
  }, [isHeroPaused, nextHeroSlide]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Image Slider Section */}
      <section
        className="relative h-[750px] md:h-[800px] w-full overflow-hidden bg-slate-900"
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
      >
        {/* Slides */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
              src={slide.image}
              alt={slide.offerTitle}
              className="w-full h-full object-cover transform scale-105"
            />

            {/* Content Container - Increased bottom padding to avoid overlap with search bar */}
            <div className="absolute inset-0 z-20 flex items-center pt-32 md:pt-40 pb-48 md:pb-64">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={index === activeSlide ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="max-w-3xl space-y-6 md:space-y-8"
                >
                  <div className="inline-flex items-center gap-2 bg-indigo-600/90 text-white px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest backdrop-blur-md">
                    <BadgePercent className="w-3 h-3 md:w-4 h-4" />
                    {slide.badge}
                  </div>

                  <div className="space-y-2 md:space-y-4">
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] md:leading-tight drop-shadow-lg">
                      {slide.offerTitle} <br />
                      <span className="text-indigo-400">{slide.discount}</span>
                    </h2>
                    <p className="text-slate-200 text-base md:text-xl max-w-xl leading-relaxed drop-shadow font-medium">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 md:pt-2">
                    <Link
                      to={slide.link}
                      className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-indigo-600 text-white rounded-2xl font-black text-base md:text-lg hover:bg-indigo-700 transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-3 active:scale-95"
                    >
                      {slide.cta} <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/contact"
                      className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-indigo-600 rounded-2xl font-black text-base md:text-lg hover:bg-slate-50 transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-3 active:scale-95"
                    >
                      Legal Consultation
                    </Link>
                    <Link
                      to="/launchpad"
                      className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-indigo-500/20 backdrop-blur-md border border-white/30 text-white rounded-2xl font-black text-base md:text-lg hover:bg-indigo-500/30 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                    >
                      <Rocket className="w-5 h-5 text-indigo-400 group-hover:animate-bounce" /> Startup Launchpad
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}

        {/* Global Hero Search Bar Overlay - Adjusted bottom and refined style */}
        <div className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-40">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-3xl p-2 rounded-[2.2rem] border border-white/20 shadow-2xl"
          >
            <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-[1.8rem] p-1 shadow-inner">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for services..."
                className="w-full pl-12 pr-28 md:pr-44 py-4 md:py-6 rounded-2xl text-slate-900 text-sm md:text-xl focus:outline-none placeholder-slate-400 font-medium"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-indigo-600 text-white px-6 md:px-12 rounded-[1.4rem] font-black text-xs md:text-lg hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>

        {/* Mobile Quick Contact Bottom Bar */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-[80] flex gap-3">
          <a href="tel:01244152516" className="flex-1 bg-white text-slate-900 h-14 rounded-2xl flex items-center justify-center gap-2 font-black shadow-2xl border border-slate-100">
            <Phone className="w-5 h-5 text-indigo-600" /> Call
          </a>
          <Link to="/contact" className="flex-[2] bg-indigo-600 text-white h-14 rounded-2xl flex items-center justify-center gap-2 font-black shadow-2xl shadow-indigo-600/30">
            <Rocket className="w-5 h-5" /> Start Project
          </Link>
        </div>

        {/* Navigation Dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-3 rounded-full transition-all duration-500 ${activeSlide === idx ? 'w-10 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Side Controls */}
        <button
          onClick={prevHeroSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-30 hidden lg:flex border border-white/10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextHeroSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-30 hidden lg:flex border border-white/10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </section>

      {/* Trust & Recognition Badges */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-60">
            <div className="flex items-center gap-2 group hover:opacity-100 transition-opacity">
              <Award className="w-8 h-8 text-indigo-600" />
              <div className="flex flex-col leading-none">
                <span className="text-slate-900 font-black text-xl tracking-tight">ISO</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Certified 9001:2015</span>
              </div>
            </div>
            <div className="flex items-center gap-2 group hover:opacity-100 transition-opacity">
              <CheckCircle2 className="w-8 h-8 text-indigo-600" />
              <div className="flex flex-col leading-none">
                <span className="text-slate-900 font-black text-xl tracking-tight">MCA</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Verified Registrar</span>
              </div>
            </div>
            <div className="flex items-center gap-2 group hover:opacity-100 transition-opacity">
              <Shield className="w-8 h-8 text-indigo-600" />
              <div className="flex flex-col leading-none">
                <span className="text-slate-900 font-black text-xl tracking-tight">Secure</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">SSL Encrypted Portal</span>
              </div>
            </div>
            <div className="flex items-center gap-2 group hover:opacity-100 transition-opacity">
              <Rocket className="w-8 h-8 text-indigo-600" />
              <div className="flex flex-col leading-none">
                <span className="text-slate-900 font-black text-xl tracking-tight">DPIIT</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Startup India Mentor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Service Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Professional Ecosystem</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Tailored Business <br />Solutions for Growth</h3>
            </div>
            <p className="text-slate-500 max-w-md text-lg leading-relaxed">
              From the first spark of an idea to becoming a market leader, we manage your legal, tax, and compliance roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_GROUPS.slice(0, 6).map((group, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 flex flex-col h-full">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  {CATEGORY_ICONS[group.category]}
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">{group.category}</h4>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed flex-grow">{group.description}</p>
                <div className="space-y-3 mb-8">
                  {group.services.slice(0, 3).map((s, si) => (
                    <div key={si} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      {s.name}
                    </div>
                  ))}
                </div>
                <Link to={`/services?q=${encodeURIComponent(group.category)}`} className="inline-flex items-center justify-center py-4 bg-slate-50 text-indigo-600 font-black text-sm rounded-xl hover:bg-indigo-600 hover:text-white transition-all group-hover:shadow-lg">
                  Explore {group.category} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Startup Tools Section */}
      <section className="py-24 bg-slate-900 overflow-hidden relative border-t border-slate-800">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md">
              <Rocket className="w-4 h-4" />
              For Founders
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Free Startup Utilities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Powerful tools to help you plan, structure, and launch your business. No signup required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tool 1: Name Generator */}
            <Link to="/name-generator" className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">AI Name Generator</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Generate unique, memorable business names tailored to your industry and keywords using advanced AI.
              </p>
              <span className="text-indigo-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Try Generator <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Tool 2: Equity Calculator */}
            <Link to="/equity-calculator" className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Equity Split Calculator</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Fairly distribute co-founder equity based on contributions like ideas, capital, and commitment.
              </p>
              <span className="text-pink-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Calculate Split <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Tool 3: Entity Selector */}
            <Link to="/entity-selector" className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Entity Selector</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Not sure if you need a Pvt Ltd or LLP? Take our quiz to find the perfect legal structure for your startup.
              </p>
              <span className="text-emerald-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Take Quiz <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with Iconography */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
            <div className="space-y-8 md:col-span-1">
              <h3 className="text-4xl font-black leading-tight">Numbers that <br />Define our Trust</h3>
              <p className="text-slate-400 text-lg">We take pride in our precision and the success of our clients across the nation.</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-bold">100% Data Confidentiality</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-bold">Real-time Status Updates</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <div className="text-5xl font-black text-indigo-400 mb-2">40,000+</div>
                <div className="text-white font-bold text-xl mb-2">Active Clients</div>
                <p className="text-slate-500 text-sm">Managing ongoing monthly compliances for diverse industries.</p>
              </div>
              <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <div className="text-5xl font-black text-indigo-400 mb-2">45,000+</div>
                <div className="text-white font-bold text-xl mb-2">IPR Applications</div>
                <p className="text-slate-500 text-sm">Expertly filed and tracked trademarks, copyrights, and patents across India.</p>
              </div>
              <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <div className="text-5xl font-black text-indigo-400 mb-2">680</div>
                <div className="text-white font-bold text-xl mb-2">In-house Experts</div>
                <p className="text-slate-500 text-sm">A dedicated team of CAs, CS, Lawyers, and Financial Advisors.</p>
              </div>
              <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                <div className="text-5xl font-black text-indigo-400 mb-2">4.9/5</div>
                <div className="text-white font-bold text-xl mb-2">Google Rating</div>
                <p className="text-slate-500 text-sm">Consistent top-tier service recognized by our growing community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entity Comparison CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-slate-100 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

            <div className="md:w-1/2 relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                Strategic Choice
              </div>
              <h3 className="text-4xl font-black text-slate-900 leading-tight">Pvt Ltd, LLP, or OPC? Choose the right foundation.</h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Don't guess your legal structure. Use our expert comparison matrix to understand tax implications, liability, and funding readiness.
              </p>
              <Link
                to="/services?anchor=compare-entities"
                className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group"
              >
                Launch Comparison Tool
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex flex-col items-center text-center">
                    <TrendingUp className="w-8 h-8 text-indigo-600 mb-3" />
                    <span className="font-black text-slate-900 text-sm">Scalability</span>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex flex-col items-center text-center">
                    <Users className="w-8 h-8 text-emerald-600 mb-3" />
                    <span className="font-black text-slate-900 text-sm">Partnership</span>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex flex-col items-center text-center">
                    <Gavel className="w-8 h-8 text-amber-600 mb-3" />
                    <span className="font-black text-slate-900 text-sm">Liability</span>
                  </div>
                  <div className="bg-violet-50 p-6 rounded-3xl border border-violet-100 flex flex-col items-center text-center">
                    <FileText className="w-8 h-8 text-violet-600 mb-3" />
                    <span className="font-black text-slate-900 text-sm">Taxation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Infinite Marquee */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <p className="text-center text-slate-400 font-black uppercase tracking-widest text-xs">Trusted by 40,000+ Companies</p>
        </div>

        <div className="relative flex overflow-x-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-4">
            {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, idx) => (
              <div key={idx} className="mx-8 flex items-center gap-2 group">
                <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-xl ${logo.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  {logo.name[0]}
                </div>
                <span className="text-2xl font-black text-slate-300 group-hover:text-slate-900 transition-colors tracking-tighter">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap py-4">
            {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, idx) => (
              <div key={idx} className="mx-8 flex items-center gap-2 group">
                <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-xl ${logo.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  {logo.name[0]}
                </div>
                <span className="text-2xl font-black text-slate-300 group-hover:text-slate-900 transition-colors tracking-tighter">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CSS for Infinite Marquee */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes marquee2 {
            0% { transform: translateX(100%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee2 {
            animation: marquee2 30s linear infinite;
          }
        `}} />
      </section>

      {/* Testimonials Slider */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Success Stories</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Loved by Thousands of Founders</h3>
          </div>

          <div className="relative">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Testimonial Content */}
                    <div className="space-y-8">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(TESTIMONIALS[activeSlide % TESTIMONIALS.length].rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-current" />
                        ))}
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight italic">
                        "{TESTIMONIALS[activeSlide % TESTIMONIALS.length].content}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                          <img
                            src={TESTIMONIALS[activeSlide % TESTIMONIALS.length].image}
                            alt={TESTIMONIALS[activeSlide % TESTIMONIALS.length].author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-black text-slate-900 text-xl">{TESTIMONIALS[activeSlide % TESTIMONIALS.length].author}</div>
                          <div className="text-sm text-indigo-600 font-bold uppercase tracking-widest">{TESTIMONIALS[activeSlide % TESTIMONIALS.length].role}</div>
                        </div>
                      </div>
                    </div>

                    {/* Visual Asset / Logo Shadow */}
                    <div className="hidden md:flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-indigo-600/10 blur-[80px] rounded-full"></div>
                        <div className="relative bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 rotate-3 hover:rotate-0 transition-transform duration-500">
                          <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 mx-auto" />
                          <div className="text-center">
                            <div className="font-black text-3xl text-slate-900 mb-2">Verified</div>
                            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Client Satisfaction</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-center gap-6 mt-16">
              <button
                onClick={() => setActiveSlide(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center active:scale-90"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ${activeSlide % TESTIMONIALS.length === idx ? 'w-10 bg-indigo-600' : 'w-2 bg-slate-200'
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveSlide(prev => (prev + 1))}
                className="w-14 h-14 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center active:scale-90"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final High-Impact CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-900 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest">
                <Scale className="w-5 h-5" />
                Your Growth Partner
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">Ready to Build Something Majestic?</h2>
              <p className="text-indigo-100 text-xl md:text-2xl leading-relaxed font-medium">
                Join 40,000+ entrepreneurs who trust us with their legal and compliance foundations. Let's start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <Link to="/contact" className="w-full sm:w-auto px-12 py-6 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-2xl hover:scale-105 active:scale-95">
                  Book a Free Specialist Call
                </Link>
                <Link to="/pricing" className="w-full sm:w-auto px-12 py-6 bg-transparent hover:bg-white/10 text-white rounded-2xl font-black text-xl transition-all border-2 border-white/30 backdrop-blur-sm">
                  Explore All Plans
                </Link>
              </div>
              <p className="text-indigo-200 text-sm font-bold">No hidden fees. Full transparency. Expert guidance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
