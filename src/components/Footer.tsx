import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1400] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 rounded-full overflow-hidden border border-amber-700/40">
                <Image
                  src="/egytex-logo.png"
                  alt="EgyTex"
                  fill
                  className="object-cover object-top scale-110"
                />
              </div>
              <span className="text-base font-bold tracking-tight leading-none">
                <span className="text-amber-400">EGY</span>
                <span className="text-white">TEX</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              أجمل الأكلات المصرية — Authentic Egyptian Food &amp; Desserts
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/products", label: "All Products" },
                { href: "/categories", label: "Categories" },
                { href: "/products?filter=new", label: "New Arrivals" },
                { href: "/products?filter=featured", label: "Featured" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-amber-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/category/sweet-food", label: "Sweet Food" },
                { href: "/category/savory-food", label: "Savory Food" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-amber-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-amber-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {year} EgyTex Food &amp; Desserts. All rights reserved.</p>
          <p>أجمل الأكلات المصرية</p>
        </div>
      </div>
    </footer>
  );
}
