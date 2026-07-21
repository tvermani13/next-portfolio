import { site } from "@/content/config/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <a className="wordmark" href="#top" aria-label="Tejas Vermani, home">
          {site.name}
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-contact" href={`mailto:${site.links.email}`}>
          Contact
        </a>
      </div>
    </header>
  );
}
