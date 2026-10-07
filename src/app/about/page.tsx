import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — EgyTex",
  description:
    "Learn about EgyTex — our passion for authentic Egyptian food and desserts, crafted fresh daily with quality ingredients.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 to-teal-500 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            About EgyTex
          </h1>
          <p className="text-lg text-teal-100 leading-relaxed">
            We believe everyone deserves fresh, authentic Egyptian food and desserts — made with love, delivered to your door.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              EgyTex was founded with a passion for authentic Egyptian flavors. From flaky pastries to rich kunafa, hearty meals to celebration cakes, we craft every item fresh daily using traditional recipes and quality ingredients.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our kitchen team has decades of combined experience. Whether you&apos;re craving a quick snack, a full meal, or a custom birthday cake, EgyTex has you covered.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "1000+", label: "Happy Customers" },
              { value: "50+", label: "Menu Items" },
              { value: "7", label: "Categories" },
              { value: "100%", label: "Fresh Daily" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-teal-50 rounded-2xl p-5 text-center">
                <p className="text-3xl font-extrabold text-teal-700">{value}</p>
                <p className="text-sm text-gray-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🏆", title: "Quality First", desc: "Every item is handcrafted with care. We only serve what we&apos;d eat ourselves." },
              { icon: "🌿", title: "Fresh Ingredients", desc: "We use natural, locally sourced ingredients. No artificial preservatives." },
              { icon: "🤝", title: "Fair Pricing", desc: "Great food at honest prices. No hidden fees or markups." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <span className="text-4xl">{icon}</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to try EgyTex?
          </h2>
          <p className="text-gray-500 mb-6">
            Browse our full menu of desserts, cakes, meals, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
