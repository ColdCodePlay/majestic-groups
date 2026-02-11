
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Bot,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Launchpad from './pages/Launchpad';
import Compliance from './pages/Compliance';
import VaultPage from './pages/Vault';
import NameGeneratorPage from './pages/NameGeneratorPage';
import EquityCalculatorPage from './pages/EquityCalculatorPage';
import EntitySelectorPage from './pages/EntitySelectorPage';
import InvoiceGeneratorPage from './pages/InvoiceGeneratorPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminPricing from './pages/admin/AdminPricing';
import AdminCRM from './pages/admin/AdminCRM';
import AdminAgents from './pages/admin/AdminAgents';
import AdminSettings from './pages/admin/AdminSettings';
import DigitalSolutions from './pages/DigitalSolutions';
import TMSearch from './pages/TMSearch';
import TMStatus from './pages/TMStatus';
import TMClasses from './pages/TMClasses';
import { DataProvider } from './context/DataContext';
import AIAssistant from './components/AIAssistant';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Track active dropdown
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null); // Track mobile sub-dropdowns
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Compliance', path: '/compliance' },
    { name: 'Digital Solutions', path: '/digital-solutions' },
    {
      name: 'IPR',
      path: '#',
      children: [
        {
          name: 'Trademark',
          path: '#',
          children: [
            { name: 'TM Search', path: '/tm-search' },
            { name: 'TM Status', path: '/tm-status' },
            { name: 'TM Classes', path: '/tm-classes' },
          ]
        },
        { name: 'Patent Search', path: 'https://iprsearch.ipindia.gov.in/PublicSearch/', external: true },
        { name: 'Copyright Search', path: 'https://copyright.gov.in/SearchRoc.aspx', external: true },
      ]
    },
    {
      name: 'Tools',
      path: '#',
      children: [
        { name: 'Name Generator', path: '/name-generator' },
        { name: 'Equity Calculator', path: '/equity-calculator' },
        { name: 'Entity Selector', path: '/entity-selector' },
        { name: 'Invoice Generator', path: '/invoice-generator' },
        { name: 'Launchpad', path: '/launchpad' },
      ]
    },
    { name: 'Pricing', path: '/pricing' },
    // { name: 'Contact', path: '/contact' }, // Moved Contact to CTA
  ];

  const isDarkHeroPage = location.pathname === '/' || location.pathname === '/services' || location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/compliance';
  const shouldShowDarkNav = scrolled || isOpen || !isDarkHeroPage;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${shouldShowDarkNav ? 'bg-white/70 backdrop-blur-2xl border-b border-white/20 shadow-lg shadow-indigo-100/10 py-2' : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-center md:justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="/logo_main.png?v=2"
                alt="Majestic Group"
                className="h-16 sm:h-20 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.children ? (
                  <button
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-1 group
                        ${shouldShowDarkNav ? 'text-slate-600 hover:text-indigo-600 hover:bg-white/50' : 'text-white/80 hover:text-white hover:bg-white/10'}
                      `}
                  >
                    {link.name} <ChevronDown className="w-4 h-4" />
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                      {link.children.map(child => (
                        child.children ? (
                          <div key={child.name} className="relative group/sub">
                            <button className="w-full flex items-center justify-between px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-bold text-sm transition-colors text-left">
                              {child.name} <ChevronRight className="w-4 h-4" />
                            </button>
                            <div className="absolute top-0 left-full ml-px w-56 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 transform origin-top-left">
                              {child.children.map(subChild => (
                                <Link
                                  key={subChild.path}
                                  to={subChild.path}
                                  className="block px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-bold text-sm transition-colors"
                                >
                                  {subChild.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : child.disabled ? (
                          <div
                            key={child.name}
                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50/50"
                          >
                            {child.name}
                          </div>
                        ) : child.external ? (
                          <a
                            key={child.path}
                            href={child.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-bold text-sm transition-colors pl-6"
                          >
                            {child.name}
                          </a>
                        ) : (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-bold text-sm transition-colors pl-6"
                          >
                            {child.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${location.pathname === link.path
                      ? 'text-indigo-600 bg-indigo-50/80 shadow-inner'
                      : (shouldShowDarkNav ? 'text-slate-600 hover:text-indigo-600 hover:bg-white/50' : 'text-white/80 hover:text-white hover:bg-white/10')
                      }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              className="ml-4 relative overflow-hidden bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
            </Link>
          </div>

          <div className="absolute right-0 md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-all ${shouldShowDarkNav ? 'bg-slate-100 text-slate-800' : 'bg-white/10 text-white'
                }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, idx) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="space-y-1">
                      <div className="px-4 py-4 text-lg font-black text-slate-800 opacity-60 flex items-center gap-2">
                        {link.name} <ChevronDown className="w-4 h-4" />
                      </div>
                      <div className="pl-4 border-l-2 border-slate-100 ml-4 space-y-1">
                        {link.children.map(child => (
                          child.children ? (
                            <div key={child.name} className="space-y-1">
                              <button
                                onClick={() => setExpandedSubMenu(expandedSubMenu === child.name ? null : child.name)}
                                className="w-full flex items-center justify-between px-4 py-3 text-slate-600 font-bold hover:text-indigo-600 pl-6"
                              >
                                {child.name} <ChevronDown className={`w-4 h-4 transition-transform ${expandedSubMenu === child.name ? 'rotate-180' : ''}`} />
                              </button>
                              {expandedSubMenu === child.name && (
                                <div className="pl-6 space-y-1 bg-slate-50/50 rounded-xl">
                                  {child.children.map(subChild => (
                                    <Link
                                      key={subChild.path}
                                      to={subChild.path}
                                      onClick={() => setIsOpen(false)}
                                      className="block px-4 py-3 text-slate-500 font-bold hover:text-indigo-600"
                                    >
                                      {subChild.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : child.disabled ? (
                            <div
                              key={child.name}
                              className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-indigo-600"
                            >
                              {child.name}
                            </div>
                          ) : child.external ? (
                            <a
                              key={child.path}
                              href={child.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-3 text-slate-600 font-bold hover:text-indigo-600 pl-6"
                            >
                              {child.name}
                            </a>
                          ) : (
                            <Link
                              key={child.path}
                              to={child.path}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-3 text-slate-600 font-bold hover:text-indigo-600 pl-6"
                            >
                              {child.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-4 py-4 text-lg font-black rounded-2xl transition-all ${location.pathname === link.path ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 active:bg-gray-50'
                          }`}
                      >
                        {link.name}
                        <ArrowRight className={`w-5 h-5 ${location.pathname === link.path ? 'opacity-100' : 'opacity-20'}`} />
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-4 py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20 active:scale-95 transition-transform"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 gap-2 pt-6">
                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:01244152516" className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-slate-600 font-bold text-xs border border-slate-100">
                    <Phone className="w-3.5 h-3.5 text-indigo-500" /> Sales
                  </a>
                  <a href="tel:01244606264" className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-slate-600 font-bold text-xs border border-slate-100">
                    <Phone className="w-3.5 h-3.5 text-indigo-500" /> Support
                  </a>
                </div>
                <a href="mailto:support@majesticgroups.org" className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-xl text-slate-600 font-bold text-sm border border-slate-100">
                  <Mail className="w-4 h-4 text-indigo-500" /> support@majesticgroups.org
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Majestic Group</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's leading platform for business registration, taxation, and legal compliance. We simplify complexity so you can focus on growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/services" className="hover:text-indigo-400 transition-colors">Business Registration</Link></li>
              <li><Link to="/services" className="hover:text-indigo-400 transition-colors">Tax & GST Filings</Link></li>
              <li><Link to="/services" className="hover:text-indigo-400 transition-colors">Intellectual Property</Link></li>
              <li><Link to="/services" className="hover:text-indigo-400 transition-colors">Startup Support</Link></li>
              <li><Link to="/services" className="hover:text-indigo-400 transition-colors">Annual Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-indigo-400 transition-colors">Pricing Plans</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Support</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><Link to="/admin" className="hover:text-indigo-400 transition-colors border-t border-slate-800 pt-3 block mt-4">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <span>Sales: 0124 - 4152516, 9899977311</span>
                  <span>Support: 0124 - 4606264, 98999919071</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span>support@majesticgroups.org</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-indigo-400 flex-shrink-0 flex justify-center">📍</div>
                <span>Ram Nagar Park, 396/1/16, First, Main, Basai Rd, near Bank of Baroda, Gurugram, Haryana 122001, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Majestic Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import DataSeeder from './components/DataSeeder';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/entity-selector" element={<EntitySelectorPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/name-generator" element={<NameGeneratorPage />} />
          <Route path="/equity-calculator" element={<EquityCalculatorPage />} />
          <Route path="/invoice-generator" element={<InvoiceGeneratorPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/launchpad" element={<Launchpad />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/seed" element={<DataSeeder />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/pricing" element={<AdminPricing />} />
            <Route path="/admin/crm" element={<AdminCRM />} />
            <Route path="/admin/agents" element={<AdminAgents />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>

          {/* New Public Routes */}
          <Route path="/digital-solutions" element={<DigitalSolutions />} />
          <Route path="/tm-search" element={<TMSearch />} />
          <Route path="/tm-status" element={<TMStatus />} />
          <Route path="/tm-classes" element={<TMClasses />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <AIAssistant />}
    </div>
  );
};

export default App;
