export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__left">
          <div className="nav__logo">Visto</div>
        </div>

        <nav className="nav__links" aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#products">Products</a>
          <a href="#solutions">Solutions</a>
          <a href="#news">News</a>
        </nav>

        <div className="nav__right">
          <a className="nav__ghost" href="#login">Log in</a>
          <a className="nav__cta" href="#get-started">Get started</a>
        </div>
      </div>
    </header>
  );
}
