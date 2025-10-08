import Container from '@/components/container';
import { SITE } from '@/data/site';

const socialIcons: Record<string, JSX.Element> = {
  github: (
    <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.4.7-4.1-1.6-4.1-1.6-.5-1.1-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.7-1 .7-1 0-1.1-.6-1.7-.6-1.7-2.8-.3-4.4-1.4-4.4-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.9 1 .9-.3 1.9-.5 2.8-.5s1.9.2 2.8.5c2-1.3 2.9-1 2.9-1 .5 1.4.2 2.4.1 2.7.6.8 1 1.7 1 2.8 0 3.6-1.8 4.7-4.4 5 .3.3.6.9.6 1.8v2.7c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
    </svg>
  ),
  linkedin: (
    <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM.5 23.5h4.9V7.9H.5v15.6zM8 7.9h4.7v2.1h.1c.7-1.3 2.5-2.6 5.2-2.6 5.6 0 6.7 3.7 6.7 8.6v7.5h-4.9v-6.7c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5v6.8H8V7.9z" />
    </svg>
  ),
  twitter: (
    <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.9 7.5c.6-.4 1.1-1 1.5-1.6-.6.3-1.2.6-1.8.6a3.27 3.27 0 0 0 1.3-1.8 6.41 6.41 0 0 1-2 .8A3.21 3.21 0 0 0 12 7.6a9.14 9.14 0 0 1-6.6-3.4 3.21 3.21 0 0 0 1 4.3c-.5 0-1-.2-1.4-.4v.1a3.21 3.21 0 0 0 2.6 3.2 3.24 3.24 0 0 1-1.4.1 3.22 3.22 0 0 0 3 2.2 6.44 6.44 0 0 1-4 1.4c-.3 0-.6 0-.9-.1a9.13 9.13 0 0 0 14-7.7v-.4a6.41 6.41 0 0 0 1.6-1.6z" />
    </svg>
  ),
};

const Footer = () => {
  return (
    <footer className="border-t border-muted/20 py-10">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {SITE.name}. Crafted with care.
          </p>
          <ul className="flex items-center gap-4">
            {Object.entries(SITE.socials).map(([key, value]) =>
              value ? (
                <li key={key}>
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/40 text-muted transition hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-accent"
                    aria-label={`Visit ${SITE.name}'s ${key}`}
                  >
                    {socialIcons[key]}
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
