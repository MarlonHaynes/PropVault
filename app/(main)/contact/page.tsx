'use client';
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/Display';
import { useToast } from '@/hooks';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000)); // simulate
    toast('Message sent! We\'ll be in touch within 24 hours.', 'success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionHeader label="Get In Touch" title="Contact PropVault" center subtitle="Have a question or ready to start your property journey? We're here to help." />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Office', lines: ['100 King St W, Suite 5600', 'Toronto, ON M5X 1C9'] },
                { icon: Phone, title: 'Phone', lines: ['+1 (416) 555-0100', 'Mon–Fri, 9am–6pm EST'] },
                { icon: Mail, title: 'Email', lines: ['hello@propvault.ca', 'support@propvault.ca'] },
                { icon: Clock, title: 'Hours', lines: ['Mon–Fri: 9:00 – 18:00', 'Sat–Sun: 10:00 – 16:00'] },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-slate-800/40 border border-slate-700 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                    {item.lines.map((l, j) => <p key={j} className="text-sm text-slate-400">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Jane Smith" />
                    <Input label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="jane@example.com" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Phone (optional)" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (416) 000-0000" />
                    <Select label="Subject" options={[
                      { value: 'buying', label: 'Buying a Property' },
                      { value: 'selling', label: 'Selling a Property' },
                      { value: 'renting', label: 'Renting' },
                      { value: 'agent', label: 'Connect with an Agent' },
                      { value: 'other', label: 'General Inquiry' },
                    ]} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Select a subject" />
                  </div>
                  <Textarea label="Message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} required placeholder="Tell us how we can help..." />
                  <Button type="submit" variant="gold" fullWidth loading={loading}>Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
