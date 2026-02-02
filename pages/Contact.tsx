
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Check, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Business Registration',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', service: 'Business Registration', message: '' });
    }, 1000);
  };

  const officeAddress = "Ram Nagar Park, 396/1/16, First, Main, Basai Rd, near Bank of Baroda, Gurugram, Haryana 122001, India";
  const googleMapsUrl = "https://maps.app.goo.gl/gh84tvbtHY193EJEA";
  const latitude = "28.457067";
  const longitude = "77.021435";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Let's Talk Business</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have questions about registrations or compliance? Our experts are ready to guide you through every step.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-indigo-600 text-white p-10 rounded-3xl shadow-xl space-y-10">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-indigo-200 mt-1" />
                  <div>
                    <div className="font-bold">Call Us</div>
                    <div className="text-indigo-100">+91 9899977311</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-indigo-200 mt-1" />
                  <div>
                    <div className="font-bold">Email Us</div>
                    <div className="text-indigo-100">hello@majesticgroups.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-indigo-200 mt-1" />
                  <div>
                    <div className="font-bold">Visit Us</div>
                    <div className="text-indigo-100">{officeAddress}</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-indigo-500/50 space-y-4">
                <h4 className="font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5" /> Working Hours
                </h4>
                <div className="text-sm text-indigo-100">
                  <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center space-y-4">
              <MessageCircle className="w-12 h-12 text-green-500 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900">Chat with us on WhatsApp</h4>
              <p className="text-slate-500 text-sm">Get instant answers for your quick queries.</p>
              <button className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all">
                Open WhatsApp
              </button>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. One of our experts will call you back within the next 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        placeholder="+91 9899977311"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Interested Service</label>
                      <select 
                        value={formState.service}
                        onChange={(e) => setFormState({...formState, service: e.target.value})}
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all"
                      >
                        <option>Business Registration</option>
                        <option>Tax & Accounting</option>
                        <option>Legal Compliance</option>
                        <option>Intellectual Property</option>
                        <option>Licenses & Govt Permits</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Your Message</label>
                    <textarea 
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      placeholder="Tell us about your requirements..."
                      className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="relative h-[500px] w-full bg-slate-100">
        <iframe 
          title="Office Location"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
        ></iframe>
        
        <div className="absolute bottom-8 left-8 z-10">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-6 group hover:scale-105 transition-transform"
          >
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <div className="font-black text-slate-900 text-lg">Majestic Groups HQ</div>
              <div className="text-slate-500 text-sm mb-2 max-w-[240px]">Basai Rd, near Bank of Baroda, Gurugram</div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
