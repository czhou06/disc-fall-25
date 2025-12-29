function Footer(){
    return (
    <footer>
      <div className="footer-logo">
        <div className="logo-circle">CC</div>
      </div>
      <nav className="footer-nav">
        <ul>
          <li><a class="nav_foot_link" href="#">Home</a></li>
          <li><a class="nav_foot_link" href="#">Contact Us</a></li>
          <li><a class="nav_foot_link" href="#">Our Team</a></li>
        </ul>
      </nav>
      <nav className="footer-socials">
        <a class="nav_foot_link" className="link" href="#">X</a>
        <a class="nav_foot_link" className="link" href="#">Instagram</a>
        <a class="nav_foot_link" className="link" href="#">Facebook</a>
      </nav>
    </footer>);
}

export default Footer;