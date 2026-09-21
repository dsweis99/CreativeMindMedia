import React from 'react';

const externalLinkClass = 'text-[var(--color-accent)] underline underline-offset-4 hover:opacity-80 transition-opacity';

export function TermsAndConditions() {
  return (
    <section className="bg-[var(--color-bg-primary)] py-20 md:py-28">
      <article className="max-w-4xl mx-auto px-6 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-5">Legal</p>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight mb-12">Terms &amp; Conditions</h1>

        <div className="space-y-10 text-[var(--color-text-muted)] leading-relaxed">
          <p>Welcome to Creative Minds Media. These Terms and Conditions (“Terms”) govern your use of our website and services at <a className={externalLinkClass} href="https://www.creatvemindsmedia.com" target="_blank" rel="noopener noreferrer">www.creatvemindsmedia.com</a>. By accessing or using our site, you agree to these Terms.</p>
          <LegalSection title="1. General"><p>Creative Minds Media is a creative services agency that also sells branded merchandise and creative products. By using our site or placing an order, you agree to these Terms.</p></LegalSection>
          <LegalSection title="2. Intellectual Property"><p>All content on our website, including graphics, branding, text, and designs, is the property of Creative Minds Media and may not be copied or reused without permission.</p></LegalSection>
          <LegalSection title="3. Products and Services"><p>Products listed on our shop are fulfilled and shipped by <strong className="text-[var(--color-text-primary)]">Printify</strong>, a third-party print-on-demand provider. Printify’s fulfillment, return, and shipping policies apply to all product orders.</p><p className="mt-4">Review Printify’s terms here: <a className={externalLinkClass} href="https://printify.com/terms-of-service" target="_blank" rel="noopener noreferrer">printify.com/terms-of-service</a></p></LegalSection>
          <LegalSection title="4. Returns and Refunds"><p>Because our products are made to order through Printify, we cannot accept returns or exchanges unless the item is defective or incorrect. If you encounter a problem with your order, contact us at <a className={externalLinkClass} href="mailto:support@creativeminds-media.com">support@creativeminds-media.com</a> and we’ll assist you.</p></LegalSection>
          <LegalSection title="5. User Conduct"><p>You agree not to misuse our services, engage in unlawful activity, or attempt to damage or interfere with our website or business operations.</p></LegalSection>
          <LegalSection title="6. Limitation of Liability"><p>Creative Minds Media is not liable for any indirect, incidental, or consequential damages resulting from the use of our services or products. Use our website and products at your own risk.</p></LegalSection>
          <LegalSection title="7. Modifications"><p>We reserve the right to update or modify these Terms at any time. Continued use of our site constitutes acceptance of any changes.</p></LegalSection>
          <LegalSection title="8. Contact"><p>If you have any questions or concerns about these Terms, please reach out to:</p><p className="mt-4 text-[var(--color-text-primary)]"><strong>Creative Minds Media</strong><br />Portland, OR 97209<br /><strong>Email:</strong> <a className={externalLinkClass} href="mailto:support@creativeminds-media.com">support@creativeminds-media.com</a></p></LegalSection>
        </div>
      </article>
    </section>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="font-display text-2xl md:text-3xl text-[var(--color-text-primary)] tracking-wide mb-4">{title}</h2>{children}</section>;
}
