import React from 'react';

const externalLinkClass = 'text-[var(--color-accent)] underline underline-offset-4 hover:opacity-80 transition-opacity';

export function PrivacyPolicy() {
  return (
    <section className="bg-[var(--color-bg-primary)] py-20 md:py-28">
      <article className="max-w-4xl mx-auto px-6 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-5">Legal</p>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight mb-12">Privacy Policy</h1>

        <div className="space-y-10 text-[var(--color-text-muted)] leading-relaxed">
          <p>
            Creative Minds Media (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website{' '}
            <a className={externalLinkClass} href="https://www.creatvemindsmedia.com" target="_blank" rel="noopener noreferrer">www.creatvemindsmedia.com</a>, use our services, or make purchases through our store.
          </p>

          <LegalSection title="1. Information We Collect">
            <p>We may collect personal information including, but not limited to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Name</li><li>Email address</li><li>Shipping/billing address</li><li>Payment details (processed securely via third-party services)</li><li>Any other information you voluntarily provide via contact forms, email, or social media</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. How We Use Your Information">
            <p>We use your data to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4"><li>Process and fulfill orders</li><li>Communicate updates, marketing, or promotions</li><li>Improve our services and website</li><li>Respond to inquiries or customer support requests</li></ul>
          </LegalSection>

          <LegalSection title="3. Order Fulfillment">
            <p>Orders made through our shop are fulfilled by <strong className="text-[var(--color-text-primary)]">Printify</strong>, a third-party print-on-demand service. By placing an order, you acknowledge that your information will be shared with Printify for the sole purpose of fulfilling your purchase.</p>
            <p className="mt-4">You can view Printify’s privacy policy here: <a className={externalLinkClass} href="https://printify.com/privacy-policy" target="_blank" rel="noopener noreferrer">printify.com/privacy-policy</a></p>
          </LegalSection>

          <LegalSection title="4. Cookies & Tracking"><p>We may use cookies to enhance your browsing experience, analyze traffic, and personalize content. You can manage or disable cookies in your browser settings.</p></LegalSection>
          <LegalSection title="5. Data Security"><p>We implement appropriate security measures to protect your data. However, no system is 100% secure. We cannot guarantee the absolute safety of your information.</p></LegalSection>
          <LegalSection title="6. Third-Party Links"><p>Our site may contain links to third-party sites (e.g., Printify, Instagram). We are not responsible for their privacy practices.</p></LegalSection>
          <LegalSection title="7. Your Rights"><p>Depending on your location, you may have rights to access, correct, or delete your personal information. Contact us at <a className={externalLinkClass} href="mailto:support@creativeminds-media.com">support@creativeminds-media.com</a> for assistance.</p></LegalSection>
          <LegalSection title="8. Contact"><p>If you have questions about this Privacy Policy, contact us at:</p><p className="mt-4 text-[var(--color-text-primary)]"><strong>Creative Minds Media</strong><br />Portland, OR 97209<br /><strong>Email:</strong> <a className={externalLinkClass} href="mailto:support@creativeminds-media.com">support@creativeminds-media.com</a></p></LegalSection>
        </div>
      </article>
    </section>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="font-display text-2xl md:text-3xl text-[var(--color-text-primary)] tracking-wide mb-4">{title}</h2>{children}</section>;
}
