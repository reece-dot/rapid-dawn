import { Link } from 'react-router-dom'

import Logo from './Logo'
import Icon from './Icon'
import { BUSINESS, NAV_LINKS, SERVICES } from '../lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line bg-void-2">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo gradientId="rd-foot" />
            <p className="lede mt-5 max-w-sm text-[1rem]">{BUSINESS.tagline}</p>

            <div className="mt-7 flex flex-col gap-3 text-[0.95rem]">
              <a
                href={BUSINESS.emailHref}
                className="inline-flex items-center gap-2.5 text-chalk-soft transition-colors hover:text-cyan"
              >
                <Icon name="mail" size={17} />
                {BUSINESS.email}
              </a>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-2.5 text-chalk-soft transition-colors hover:text-cyan"
              >
                <Icon name="phone" size={17} />
                {BUSINESS.phoneDisplay}
              </a>
              <span className="inline-flex items-center gap-2.5 text-chalk-mute">
                <Icon name="pin" size={17} />
                {BUSINESS.region}
              </span>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-chalk-mute">
              Navigate
            </h2>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[0.95rem] text-chalk-soft transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-chalk-mute">
              Capabilities
            </h2>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services#${s.slug}`}
                    className="text-[0.95rem] text-chalk-soft transition-colors hover:text-chalk"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-fade my-12" />

        <div className="flex flex-col gap-4 text-[0.85rem] text-chalk-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-[0.8rem]">
            Demo site — contact details are placeholders pending client confirmation.
          </p>
        </div>
      </div>
    </footer>
  )
}
