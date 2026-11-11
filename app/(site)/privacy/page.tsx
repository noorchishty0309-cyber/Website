import type { Metadata } from 'next';
import Link from 'next/link';
import { Legal } from '@/components/Legal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How NOORLUME collects, uses and protects personal information submitted through this website.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  const contact = site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Link href="/contact">our contact page</Link>;
  return (
    <Legal title="Privacy policy" updated="November 2026">
      <p>
        This policy explains how NOORLUME Energy &amp; Engineering (“NOORLUME”, “we”) handles personal information collected
        through this website.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Enquiry form:</strong> name, company, email address, contact number, country, project location and the project
          details you choose to provide.
        </li>
        <li>
          <strong>Engineering Assistant (chatbot):</strong> the messages you type. Contact and project details are saved to our
          enquiry records only after you agree in the conversation.
        </li>
        <li>
          <strong>Technical data:</strong> your IP address is processed briefly to limit abuse of our forms and chatbot. It is not
          stored with your enquiry.
        </li>
      </ul>

      <h2>How we use it</h2>
      <p>
        We use your information to respond to your enquiry, prepare proposals and manage our relationship with you. We do not
        sell personal information, and we do not use it for unrelated marketing without your agreement.
      </p>

      <h2>AI assistant</h2>
      <p>
        The Engineering Assistant is an automated AI system. Messages you send are processed by our AI service provider,
        Anthropic, to generate replies. Please do not enter confidential or sensitive personal information in the chat. Chat
        history is held in your browser for the current session and is cleared when you close the tab or choose “New”.
      </p>

      <h2>Service providers</h2>
      <p>We rely on the following processors to run this website:</p>
      <ul>
        <li>Netlify: website hosting and storage of enquiry form submissions.</li>
        <li>Supabase: secure storage of enquiry records, where enabled.</li>
        <li>Anthropic: AI processing of chatbot messages.</li>
        <li>Resend: delivery of enquiry notification emails to our team.</li>
      </ul>
      <p>These providers may process data outside your country of residence.</p>

      <h2>Cookies and browser storage</h2>
      <p>
        This website does not use advertising or analytics cookies. The chatbot uses your browser’s session storage to keep the
        current conversation. Administrator sign-in uses essential authentication cookies. If the contact page shows an
        embedded Google Map, Google may set its own cookies when the map loads.
      </p>

      <h2>Retention</h2>
      <p>
        Enquiry records are kept for as long as needed to respond and to manage any resulting business relationship, and are
        then deleted or anonymised.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask us for a copy of the personal information we hold about you, ask us to correct or delete it, or withdraw
        your consent at any time. To do so, contact us through {contact}.
      </p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The date at the top of the page shows when it was last revised.</p>
    </Legal>
  );
}
