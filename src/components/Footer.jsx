
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav className="site-footer-menu">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </nav>

        <div className="site-footer-copy">
          © {new Date().getFullYear()} Aura Maze. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
