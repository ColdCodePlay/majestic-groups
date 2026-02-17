
import React from 'react';
import { Target, Eye, Users, ShieldCheck, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/legal/1920/1080')] opacity-20 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">India's Largest Business Consulting Firm</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Provides of your business requirements on a national basis incorporated in December 2014. We provide an end-to-end solution for your business - helping and developing the company you have without leading to panic.
            <br /><br />
            We are your one-stop solution for all your business needs. Our team of experts has a deep understanding of the Indian market and its dynamics. We provide customized solutions to help you grow and sustain your business in this competitive environment.
            <br /><br />
            We have a Pan-India presence, operating through 10+ branches and serving more than 20,000 happy customers. Please let us explore the services we offer and their details, we hope you'll find our assistance valuable to your business's growth.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To provide reliable, timely & value added solutions that will be helps our clients achieve their objective. Our aim is to exceed the expectations in everything what we do.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                Our vision is to be a leading consulting firm operating world wide. Our success is measured by the values, we deliver to clients, the quality of the staff we employ, and our strength & spirit as a firm. We nurture our core values and they shape the culture of our business and define the character of our firm. They guide our decision making, our relationship with each other. Our people adopt, own and apply our value in their work.
              </p>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/office/800/800" alt="Majestic Office" className="rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-xs">
              <p className="text-indigo-600 font-bold text-4xl mb-2">10+</p>
              <p className="text-slate-800 font-bold">Years of Excellence</p>
              <p className="text-slate-500 text-sm mt-2">Serving the Indian startup ecosystem with dedication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Integrity", desc: "We adhere to the highest ethical standards, ensuring every filing is precise and legally sound." },
              { icon: <Users className="w-8 h-8" />, title: "Customer Centricity", desc: "Your success is our success. We go the extra mile to simplify your business journey." },
              { icon: <Heart className="w-8 h-8" />, title: "Empowerment", desc: "We educate our clients, helping them understand the 'why' behind compliance requirements." }
            ].map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
