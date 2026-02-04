
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
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Launchpad from './pages/Launchpad';
import Compliance from './pages/Compliance';
import EntitySelectorPage from './pages/EntitySelectorPage';
import VaultPage from './pages/Vault';
import NameGeneratorPage from './pages/NameGeneratorPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminPricing from './pages/admin/AdminPricing';
import AdminCRM from './pages/admin/AdminCRM';
import AdminSettings from './pages/admin/AdminSettings';
import { DataProvider } from './context/DataContext';
import AIAssistant from './components/AIAssistant';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    { name: 'Pricing', path: '/pricing' },
    { name: 'Launchpad', path: '/launchpad' },
    { name: 'Vault', path: '/vault' },
    { name: 'Contact', path: '/contact' },
  ];

  const isDarkHeroPage = location.pathname === '/' || location.pathname === '/services' || location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/compliance';
  const shouldShowDarkNav = scrolled || isOpen || !isDarkHeroPage;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${shouldShowDarkNav ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm py-2' : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="/logo_main.png"
                alt="Majestic Groups"
                className="h-16 sm:h-20 w-auto object-contain transition-all hover:scale-105"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${location.pathname === link.path
                  ? 'text-indigo-600 bg-indigo-50'
                  : (shouldShowDarkNav ? 'text-slate-600 hover:text-indigo-600 hover:bg-gray-50' : 'text-white/80 hover:text-white hover:bg-white/10')
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden flex items-center">
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
                <motion.div
                  key={link.path}
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

              <div className="grid grid-cols-2 gap-3 pt-6">
                <a href="tel:+919899977311" className="flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl text-slate-600 font-bold text-sm border border-slate-100 italic">
                  <Phone className="w-4 h-4 text-indigo-500" /> Call Sales
                </a>
                <a href="mailto:support@majesticgroups.com" className="flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl text-slate-600 font-bold text-sm border border-slate-100">
                  <Mail className="w-4 h-4 text-indigo-500" /> Email Us
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
              <span className="text-xl font-bold tracking-tight">Majestic Groups</span>
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
                <span>+91 9899977311</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span>support@majesticgroups.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 text-indigo-400 flex-shrink-0 flex justify-center">📍</div>
                <span>Ram Nagar Park, 396/1/16, First, Main, Basai Rd, near Bank of Baroda, Gurugram, Haryana 122001, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} Majestic Groups. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/pricing" element={<AdminPricing />} />
          <Route path="/admin/crm" element={<AdminCRM />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <AIAssistant />}
    </div>
  );
};

export default App;
