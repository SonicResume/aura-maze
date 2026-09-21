
import { useEffect } from "react";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={styles.page}>
      <div style={styles.backgroundGlow} />

      <div style={styles.container}>
        <a href="/" style={styles.back}>
          ← Back to Home
        </a>

        <div style={styles.heading}>
          <p style={styles.eyebrow}>AURA MAZE</p>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.date}>Effective date: 2026</p>
        </div>

        <article style={styles.card}>
          <Section title="1. Use of the Service">
            <p>
              Aura Maze provides access to browser-based games and related
              features. You agree to use the service only for lawful purposes
              and not to interfere with, damage, abuse, scrape, reverse
              engineer, or disrupt the service or its systems.
            </p>
          </Section>

          <Section title="2. Accounts">
            <p>
              Some features may require an account. You are responsible for
              keeping your account information secure and for activity carried
              out through your account.
            </p>
          </Section>

          <Section title="3. Free and Paid Plans">
            <p>
              Aura Maze may offer free and paid plans. Features, access,
              pricing, and limitations may vary by plan and are described on
              the applicable pricing page or during checkout.
            </p>
          </Section>

          <Section title="4. Payments">
            <p>
              Paid subscriptions may be processed through Stripe or another
              payment provider shown during checkout. Subscription and refund
              terms may be subject to applicable law.
            </p>
          </Section>

          <Section title="5. Games and Content">
            <p>
              Games and other content available through Aura Maze may be
              provided by Aura Maze or third parties. Individual games may have
              separate rules, licenses, or restrictions.
            </p>
          </Section>

          <Section title="6. Prohibited Conduct">
            <p>
              You may not use the service to distribute malicious code, attempt
              unauthorized access, exploit vulnerabilities, interfere with
              other users, or otherwise damage the service.
            </p>
          </Section>

          <Section title="7. Availability">
            <p>
              We may modify, suspend, remove, or discontinue games, features,
              or other parts of the service. Availability may change without
              notice.
            </p>
          </Section>

          <Section title="8. Disclaimer">
            <p>
              The service is provided on an “as-is” and “as-available” basis
              to the extent permitted by applicable law.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Aura Maze and
              its operators are not responsible for indirect, incidental,
              special, or consequential losses arising from use of the service.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              Access may be suspended or terminated when reasonably necessary,
              including for violations of these Terms, abuse of the service, or
              security concerns.
            </p>
          </Section>

          <Section title="11. Changes">
            <p>
              These Terms may be updated from time to time. Updated terms will
              be posted on this page with a revised effective date where
              appropriate.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              Questions about these Terms can be sent through the{" "}
              <a href="/contact" style={styles.inlineLink}>
                Contact page
              </a>
              .
            </p>
          </Section>
        </article>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.text}>{children}</div>
    </section>
  );
}

const styles = {
  page: {
    position: "relative" as const,
    minHeight: "100vh",
    background: "#0a0809",
    color: "#eee8e3",
    padding: "64px 20px 90px",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    overflow: "hidden" as const,
  },

  backgroundGlow: {
    position: "absolute" as const,
    width: 420,
    height: 420,
    top: -180,
    right: -120,
    borderRadius: "50%",
    background: "rgba(109, 40, 217, 0.12)",
    filter: "blur(100px)",
    pointerEvents: "none" as const,
  },

  container: {
    position: "relative" as const,
    zIndex: 1,
    width: "100%",
    maxWidth: 900,
    margin: "0 auto",
  },

  back: {
    display: "inline-block",
    marginBottom: 36,
    color: "#b88aff",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
  },

  heading: {
    marginBottom: 34,
  },

  eyebrow: {
    margin: "0 0 10px",
    color: "#a36d47",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.16em",
  },

  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: "clamp(38px, 6vw, 58px)",
    lineHeight: 1.05,
    fontWeight: 800,
    letterSpacing: "-0.04em",
  },

  date: {
    margin: "14px 0 0",
    color: "#817772",
    fontSize: 14,
  },

  card: {
    background: "#151012",
    border: "1px solid #3a2922",
    borderRadius: 18,
    padding: "34px 34px 14px",
    boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
  },

  section: {
    padding: "0 0 26px",
    marginBottom: 26,
    borderBottom: "1px solid #2b201c",
  },

  sectionTitle: {
    margin: "0 0 10px",
    color: "#d2a06f",
    fontSize: 19,
    fontWeight: 700,
  },

  text: {
    color: "#bdb3ad",
    fontSize: 16,
    lineHeight: 1.75,
  },

  inlineLink: {
    color: "#b88aff",
    textDecoration: "none",
    fontWeight: 600,
  },
};
