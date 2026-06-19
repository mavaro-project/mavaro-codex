import Link from "next/link";
import Image from "next/image";

const product = [
  { label: "For employers", href: "/for-employers" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Start a pilot", href: "/admin/request-access" },
  { label: "Admin login", href: "/admin/login" },
];

const employees = [
  { label: "Employee login", href: "/employee/login" },
  { label: "Join with invite", href: "/employee/signup" },
  { label: "Complete your profile", href: "/employee/onboarding" },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-espresso/8">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/brand/mavaro-icon-transparent.png"
                alt="Mavaro"
                width={48}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-espresso/58">
              Recurring employee circles that make workplace belonging intentional and measurable.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-espresso/40">
              Built for People teams
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-espresso/45">Product</p>
            <ul className="space-y-3">
              {product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-espresso/65 transition hover:text-espresso">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-espresso/45">Employees</p>
            <ul className="space-y-3">
              {employees.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-espresso/65 transition hover:text-espresso">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-espresso/45">Company</p>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-espresso/65 transition hover:text-espresso">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-espresso/8 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-espresso/40">© {new Date().getFullYear()} Mavaro. All rights reserved.</p>
          <p className="text-xs text-espresso/36">
            Employee connection programs for modern companies.
          </p>
        </div>
      </div>
    </footer>
  );
}
