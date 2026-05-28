'use client';
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/Display';
import { useToast } from '@/hooks';
import { MapPin, Phone, Mail, Clock, CheckCircle, MessageSquare, Users, Building2 } from 'lucide-react';

const offices = [
  {
    name: 'Toronto — King West (HQ)',
    address: '100 King Street West, Suite 5600',
    city: 'Toronto, ON M5X 1C9',
    phone: '+1 (416) 555-0100',
    email: 'toronto@propvault.ca',
    hours: 'Mon–Fri 9am–6pm · Sat–Sun 10am–4pm',
    mapUrl: 'https://maps.google.com/?q=100+King+Street+West+Toronto',
  },
  {
    name: 'Mississauga — Port Credit',
    address: '220 Lakeshore Road West, Suite 201',
    city: 'Mississauga, ON L5H 1G5',
    phone: '+1 (905) 555-0200',
    email: 'mississauga@propvault.ca',
    hours: 'Mon–Fri 9am–6pm · Sat 10am–3pm',
    mapUrl: 'https://maps.google.com/?q=220+Lakeshore+Road+West+Mississauga',
  },
  {
    name: 'Oakville — Downtown',
    address: '150 Lakeshore Road East, Suite 105',
    city: 'Oakville, ON L6J 1H4',
    phone: '+1 (905) 555-0300',
    email: 'oakville@propvault.ca',
    hours: 'Mon–Fri 9am–5pm · Sat 10am–2pm',
    mapUrl: 'https://maps.google.com/?q=150+Lakeshore+Road+East+Oakville',
  },
];

const contactReasons = [
  { icon: Building2,    title: 'Buy a Property',     desc: 'Looking for your dream home or investment property in the GTA?' },
  { icon: MessageSquare,title: 'Sell with PropVault', desc: 'Get a free market valuation and sell with GTA\'s top brokerage.' },
  { icon: Users,        title: 'Connect with an Agent',desc: 'Talk to a specialist in your target city or property type.' },
  { icon: CheckCircle,  title: 'General Inquiry',     desc: 'Press, partnerships, careers, or anything else.' },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    subject: 'buying',
    preferredOffice: '',
    bestTime: '',
    message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    toast('Message received! Your agent will reach out within 2 hours.', 'success');
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-slate-900 to-brand-dark">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs tracking-widest text-brand-gold uppercase">Get In Touch</span>
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
            We're Here to Help
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Our team responds within 2 hours on business days, and within 4 hours on weekends.
            No question is too small.
          </p>
        </div>
      </section>

      <main className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Contact reason cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {contactReasons.map((r, i) => (
            <button key={i} onClick={() => setForm(f => ({ ...f, subject: ['buying','selling','agent','general'][i] }))}
              className={`p-5 rounded-xl border text-left transition-all ${
                form.subject === ['buying','selling','agent','general'][i]
                  ? 'bg-brand-gold/10 border-brand-gold/50 text-brand-gold'
                  : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
              }`}>
              <r.icon className={`w-5 h-5 mb-3 ${form.subject === ['buying','selling','agent','general'][i] ? 'text-brand-gold' : 'text-slate-400'}`} />
              <p className="font-semibold text-white text-sm mb-1">{r.title}</p>
              <p className="text-xs text-slate-400 leading-snug">{r.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-slate-800/40 border border-emerald-500/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="font-playfair text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-slate-400 mb-2">Thank you, <strong className="text-white">{form.name}</strong>. We've received your message.</p>
                <p className="text-slate-500 text-sm">A PropVault agent will contact you at <strong className="text-slate-300">{form.email}</strong> within 2 hours.</p>
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8">
                <h2 className="font-semibold text-white mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Jane Smith" />
                    <Input label="Email *" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="jane@example.com" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Phone (optional)" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (416) 000-0000" />
                    <Select label="Preferred Office" options={[
                      { value: 'toronto', label: 'Toronto — King West HQ' },
                      { value: 'mississauga', label: 'Mississauga — Port Credit' },
                      { value: 'oakville', label: 'Oakville — Downtown' },
                      { value: 'any', label: 'No preference' },
                    ]} value={form.preferredOffice} onChange={e => setForm(f => ({ ...f, preferredOffice: e.target.value }))} placeholder="Select office" />
                  </div>
                  <Select label="Best Time to Reach You" options={[
                    { value: 'morning', label: 'Morning (9am – 12pm)' },
                    { value: 'afternoon', label: 'Afternoon (12pm – 5pm)' },
                    { value: 'evening', label: 'Evening (5pm – 7pm)' },
                    { value: 'anytime', label: 'Anytime' },
                  ]} value={form.bestTime} onChange={e => setForm(f => ({ ...f, bestTime: e.target.value }))} placeholder="Select time" />
                  <Textarea label="How can we help? *" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={5} placeholder="Tell us what you're looking for, your budget, preferred areas, timeline, or any questions..." required />
                  <Button type="submit" variant="gold" fullWidth loading={loading} size="lg">
                    Send Message — We Respond Within 2 Hours
                  </Button>
                  <p className="text-xs text-slate-500 text-center">No spam, no pressure. Your information is kept private and never shared.</p>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Urgent line */}
            <div className="p-5 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl">
              <p className="text-xs font-semibold text-brand-gold uppercase tracking-wide mb-2">Same-Day Assistance</p>
              <p className="text-sm text-slate-300 mb-3">Need to speak with someone urgently? Our main line is answered live during business hours.</p>
              <a href="tel:+14165550100" className="flex items-center gap-2 text-white font-bold text-lg hover:text-brand-gold transition-colors">
                <Phone className="w-5 h-5 text-brand-gold" /> +1 (416) 555-0100
              </a>
            </div>

            {/* Offices */}
            <div className="space-y-4">
              {offices.map((office, i) => (
                <div key={i} className="p-5 bg-slate-800/40 border border-slate-700 rounded-xl">
                  <h3 className="font-semibold text-white text-sm mb-3">{office.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                      <div>{office.address}<br />{office.city}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-white transition-colors">{office.phone}</a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-white transition-colors">{office.email}</a>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      {office.hours}
                    </div>
                  </div>
                  <a href={office.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs text-brand-gold hover:text-amber-400 transition-colors">
                    Get Directions →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
