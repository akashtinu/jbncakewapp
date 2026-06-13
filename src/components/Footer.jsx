export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__brand">🎂 Sweetly Yours</span>
        <p className="footer__tagline">Made with love in Tiruppur · Fresh every day</p>
        <p className="footer__copy">© {new Date().getFullYear()} Sweetly Yours. All rights reserved.</p>
      </div>
    </footer>
  );
}
