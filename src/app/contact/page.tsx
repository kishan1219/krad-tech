import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact KRAD Technology | Call, WhatsApp & Inquiries',
  description:
    'Get in touch with KRAD Technology. Direct phone: +91 91110 21438, instant WhatsApp support, and online project consultations.',
};

export default function ContactPage() {
  return <ContactClient />;
}
