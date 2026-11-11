import type { Metadata } from 'next';
import { Legal } from '@/components/Legal';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms governing the use of the NOORLUME website and its content.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <Legal title="Terms and conditions" updated="November 2026">
      <p>
        These terms govern your use of the NOORLUME Energy &amp; Engineering website. By using the website you accept them.
      </p>

      <h2>Information on this website</h2>
      <p>
        The content of this website, including articles in the knowledge centre, is general information. It is not engineering
        advice for any specific project and must not be relied on for design, procurement, construction or safety decisions.
        Engineering services are provided only under a written agreement with NOORLUME.
      </p>

      <h2>Engineering Assistant</h2>
      <p>
        The Engineering Assistant is an automated AI tool that provides general information about our services. Its replies
        may be incomplete or inaccurate. They are not approved designs, calculations, quotations or commitments on behalf of
        NOORLUME. Safety-critical decisions must be reviewed by a qualified engineer.
      </p>

      <h2>Enquiries and proposals</h2>
      <p>
        Submitting an enquiry does not create a contract. Scope, fees, deliverables and programme are confirmed only in a
        written proposal or agreement issued by NOORLUME.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The NOORLUME name, logo, text, drawings and graphics on this website belong to NOORLUME or its licensors. You may view
        and share links to the content. You may not reproduce it for commercial purposes without written permission.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse the website, attempt to gain unauthorised access to it, submit false or unlawful information,
        or use automated means to send enquiries or chatbot messages.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, NOORLUME is not liable for any loss arising from use of, or reliance on, this website
        or the Engineering Assistant. Nothing in these terms limits liability that cannot be limited by law.
      </p>

      <h2>External links</h2>
      <p>Links to third-party websites are provided for convenience. We are not responsible for their content.</p>

      <h2>Changes to these terms</h2>
      <p>We may revise these terms. Continued use of the website after a revision means you accept the updated terms.</p>
    </Legal>
  );
}
