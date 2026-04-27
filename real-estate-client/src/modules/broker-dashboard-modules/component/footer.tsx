import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Buy a Home", href: "/buy" },
    { label: "Rent a Property", href: "/rent" },
    { label: "Sell Your Home", href: "/sell" },
    { label: "New Developments", href: "/new-developments" },
    { label: "Commercial", href: "/commercial" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Agents", href: "/agents" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Market Reports", href: "/reports" },
    { label: "Mortgage Calculator", href: "/calculator" },
    { label: "Neighborhood Guide", href: "/neighborhoods" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
};

// const socials = [
//   { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
//   { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
//   { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
//   { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
// ];

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">

          {/* Brand + contact */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                <Building2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                GharBazar
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Helping people find their perfect home since 2010. Trusted by over
              50,000 buyers, sellers, and renters nationwide.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+11234567890"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                +1 (123) 456-7890
              </a>
              <a
                href="mailto:hello@nestify.com"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                hello@nestify.com
              </a>
              <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                123 Realty Ave, New York, NY 10001
              </span>
            </div>

            {/* Socials */}
            {/* <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  asChild
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                </Button>
              ))}
            </div> */}
          </div>

          {/* Nav link columns */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  {group}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        to={href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Newsletter
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get the latest listings and market insights delivered to your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="h-9 text-sm"
              />
              <Button size="sm" className="gap-1.5 w-full">
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <Separator />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nestify Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <Link
              key={item}
              to="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;