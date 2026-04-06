'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/FormElements';
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
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
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
        options={[
          { value: 'info', label: 'General Info' },
          { value: 'viewing', label: 'Request a Viewing' },
          { value: 'question', label: 'Ask a Question' },
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
    </form>
  );
}
