
import { useEffect } from "react";

export default function PrivacyPage() {
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
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.date}>Effective date: 2026</p>
        </div>

        <article style={styles.card}>
          <Section title="1. Information We Collect">
            <p>
              We may collect information you provide when creating an account,
              using certain features, purchasing a subscription, or contacting
              us.
            </p>
          </Section>

          <Section title="2. How We Use Information">
            <p>
              Information may be used to provide and maintain the service,
              process subscriptions and payments, provide support, improve the
              game library, and maintain security.
            </p>
          </Section>

          <Section title="3. Payments">
            <p>
              Paid subscriptions may be processed by third-party providers
              such as Stripe. Payment information is handled according to the
              applicable provider's privacy and security practices.
            </p>
          </Section>

          <Section title="4. Cookies and Similar Technologies">
            <p>
              Aura Maze or its service providers may use cookies or similar
              technologies for authentication, functionality, security, and
              other site operations.
            </p>
          </Section>

          <Section title="5. Sharing of Information">
            <p>
              We do not sell your personal information. Information may be
              shared with service providers when necessary to operate the
              platform, process payments, provide infrastructure, maintain
              security, or comply with legal obligations.
            </p>
          </Section>

          <Section title="6. Data Security">
            <p>
              We use reasonable measures designed to protect information
              against unauthorized access, loss, misuse, or alteration. No
              online service can guarantee absolute security.
            </p>
          </Section>

          <Section title="7. Third-Party Services">
            <p>
              Aura Maze may use third-party services for authentication,
              payments, hosting, analytics, or other functionality. Those
              services may process information according to their own policies.
            </p>
          </Section>

          <Section title="8. Your Choices">
            <p>
              Depending on your location and applicable law, you may have
              rights regarding access, correction, deletion, or other handling
              of your personal information.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              This Privacy Policy may be updated from time to time. Changes
              will be posted on this page with an updated effective date where
              appropriate.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              Privacy questions or requests can be sent through the{" "}
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
    left: -120,
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
