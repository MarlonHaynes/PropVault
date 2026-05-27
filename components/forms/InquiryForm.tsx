'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
<<<<<<< HEAD
<<<<<<< HEAD
import { saveInquiry } from '@/lib/store';
import { useToast } from '@/hooks';

interface Props {
  listingId: string;
  listingTitle: string;
  agentName: string;
  agentEmail: string;
}

export function InquiryForm({ listingId, listingTitle, agentName, agentEmail }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    inquiryType: 'info',
    message: `Hi ${agentName},\n\nI'm interested in ${listingTitle}. Could you please send me more information?`,
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks';
import { createInquiry } from '@/firebase/firestore';
import type { Listing } from '@/types';

export function InquiryForm({ listing }: { listing: Listing }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    inquiryType: 'info' as 'viewing' | 'info' | 'question' | 'consultation' | 'agent',
    message: `I'm interested in ${listing.title}. Please contact me with more information.`,
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
<<<<<<< HEAD
<<<<<<< HEAD
    await new Promise(r => setTimeout(r, 800));
    saveInquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      listingId,
      listingTitle,
      inquiryType: form.inquiryType,
      message: form.message,
      status: 'new',
    });
    toast('Inquiry sent! The agent will contact you within 2 hours.', 'success');
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center py-4">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
          <span className="text-emerald-400 text-lg">✓</span>
        </div>
        <p className="text-sm font-semibold text-white">Inquiry Sent!</p>
        <p className="text-xs text-slate-400 mt-1">{agentName} will be in touch shortly.</p>
        <button onClick={() => setSent(false)} className="text-xs text-brand-gold mt-3 hover:text-amber-400 transition-colors">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      <Input type="email" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
      <Input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
      <Select
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    try {
      await createInquiry({
        listingId: listing.id,
        listingTitle: listing.title,
        listingSlug: listing.id,
        userId: user?.uid || 'guest',
        agentId: listing.agentId,
        agentName: listing.agentId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        inquiryType: form.inquiryType,
        message: form.message,
        financingStatus: 'not-started',
        status: 'new',
      });
      toast('Inquiry sent! The agent will contact you soon.', 'success');
      setForm(f => ({ ...f, message: '' }));
    } catch {
      toast('Failed to send inquiry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      <Input label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
      <Input label="Phone (optional)" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (416) 000-0000" />
      <Select
        label="Inquiry Type"
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
        options={[
          { value: 'info', label: 'General Info' },
          { value: 'viewing', label: 'Request a Viewing' },
          { value: 'question', label: 'Ask a Question' },
<<<<<<< HEAD
<<<<<<< HEAD
          { value: 'offer', label: 'Make an Offer' },
        ]}
        value={form.inquiryType}
        onChange={e => setForm(f => ({ ...f, inquiryType: e.target.value }))}
      />
      <Textarea
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        rows={3}
        required
      />
      <Button type="submit" variant="gold" fullWidth loading={loading}>Send Message</Button>
      <p className="text-xs text-slate-500 text-center">No spam. Your info stays private.</p>
=======
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
          { value: 'consultation', label: 'Book Consultation' },
        ]}
        value={form.inquiryType}
        onChange={e => setForm(f => ({ ...f, inquiryType: e.target.value as typeof form.inquiryType }))}
      />
      <Textarea
        label="Message"
        value={form.message}
        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
        rows={4}
        required
      />
      <Button type="submit" variant="gold" fullWidth loading={loading}>Send Inquiry</Button>
      <p className="text-xs text-slate-500 text-center">By submitting, you agree to our privacy policy</p>
<<<<<<< HEAD
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
=======
>>>>>>> d789c691ffb31c07fedbb5394b08ef636370b508
    </form>
  );
}
