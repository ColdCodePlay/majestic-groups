
import React from 'react';
import { Target, Eye, Users, ShieldCheck, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/legal/1920/1080')] opacity-20 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Empowering Entrepreneurs Since 2015</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Majestic Group was founded with a single mission: to make legal and tax compliance simple, accessible, and affordable for every Indian business owner.
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
                To bridge the gap between complex legal requirements and enthusiastic entrepreneurs by providing technology-driven, human-supported compliance solutions that foster business growth.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be India's most trusted partner for end-to-end business services, known for integrity, transparency, and a customer-first approach in everything we do.
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

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Led by Experts</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Our leadership brings decades of experience from legal, financial, and technology backgrounds.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Rahul Sharma", role: "Founder & CEO", img: "https://picsum.photos/seed/man1/400/500" },
              { name: "Priya Mehta", role: "Head of Legal", img: "https://picsum.photos/seed/woman1/400/500" },
              { name: "Vikram Singh", role: "Chief Financial Officer", img: "https://picsum.photos/seed/man2/400/500" },
              { name: "Ananya Iyer", role: "Head of Operations", img: "https://picsum.photos/seed/woman2/400/500" }
            ].map((m, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{m.name}</h4>
                <p className="text-indigo-600 font-medium text-sm">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
