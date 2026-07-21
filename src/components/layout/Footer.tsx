import { site } from "@/content/config/site";

const external = { target: "_blank" as const, rel: "noopener noreferrer" };

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="footer-links">
          <a href={site.links.github} {...external}>
            GitHub ↗
          </a>
          <a href={site.links.linkedin} {...external}>
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
