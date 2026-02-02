
import React, { useState } from 'react';
import { Check, Info, AlertCircle } from 'lucide-react';
import PricingCalculator from '../components/PricingCalculator';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import PlanDetailsModal from '../components/PlanDetailsModal';

const Pricing: React.FC = () => {
  const { pricingPlans } = useData();
  const [selectedPlan, setSelectedPlan] = useState<{ name: string, price: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <header className="py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your business stage. No hidden costs, just professional service.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${plan.recommended
                ? 'border-indigo-600 shadow-xl scale-105 z-10'
                : 'border-white shadow-sm hover:shadow-lg'
                }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                  Best Value
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  {plan.subtitle && <span className="text-slate-500 text-sm font-medium">{plan.subtitle}</span>}
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSelectPlan(plan.name, plan.price)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${plan.recommended
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}>
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Dynamic Pricing Calculator Section */}
        <PricingCalculator />

        <div className="mt-16 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2 flex-grow">
              <h4 className="text-xl font-bold text-slate-900">Important Information Regarding Government Fees</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Most prices shown are professional service fees. Government fees vary based on factors like authorized share capital, number of partners, and state of registration. We provide a detailed estimate of actual government fees before you start.
              </p>
            </div>
            <button className="flex items-center gap-2 text-indigo-600 font-bold whitespace-nowrap">
              Fee Structure Details <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-24 max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-slate-900 mb-2">Are there any hidden charges?</h4>
              <p className="text-slate-600 text-sm">No, we believe in complete transparency. Our professional fee is fixed. We help you calculate exact government fees as per current MCA/GST norms.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-slate-900 mb-2">Can I upgrade my plan later?</h4>
              <p className="text-slate-600 text-sm">Absolutely! You can start with our Basic plan and upgrade to Standard or Premium as your business grows and compliance needs increase.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-slate-900 mb-2">How do payments work?</h4>
              <p className="text-slate-600 text-sm">We accept all major credit/debit cards, UPI, and net banking. You can pay in milestones for larger registration projects.</p>
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

export default Pricing;
