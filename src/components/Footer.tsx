export default function Footer() {
  return (
    <footer>
      <section className="topfooter">
        <p className="label">Get News & Updates</p>
        <p className="descLabel">Get latest developments and exciting news on how we are shaping the future! </p>
        <div className="input">
          <input type="email" placeholder="Your email address" />
        </div>
      </section>

      <div className="footer">
        <nav className="links">
          <p>Shop Home Collection</p>
          <p>Wynn Stories</p>
          <p>Wynn Slots App</p>
          <p>Shop Home Collection</p>
        </nav>

        <nav className="links">
          <p>About Us</p>
          <p>Careers</p>
          <p>Investor Relations</p>
          <p>Privacy Notice</p>
        </nav>

        <nav className="links">
          <p>Wynn Palace Cotai</p>
          <p>Encore Boston Harbor</p>
          <p>Wynn Macau</p>
        </nav>

        <nav className="links">
          <p>Wynn and Encore Las Vegas</p>
          <p>3131 Las Vegas Blvd. Las Vegas, NV 89109</p>
          <p>+1 (702) 770-7000 </p>
        </nav>
      </div>
    </footer>
  );
}
