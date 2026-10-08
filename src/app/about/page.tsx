import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — EgyTex",
  description:
    "Learn about EgyTex Food & Desserts — our passion for authentic Egyptian food, fresh ingredients, and the best flavors.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1C1400] to-[#3D2B00] text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            About EgyTex
          </h1>
          <p className="text-lg text-amber-100 leading-relaxed">
            We believe everyone deserves fresh, authentic Egyptian food and desserts —
            made with love and craft every single day.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              EgyTex was founded with a passion for authentic Egyptian flavors. From
              flaky kunafa and rich baklava to hearty kofta meals and crispy falafel,
              we craft every item fresh daily using traditional recipes passed down
              through generations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our kitchen team has decades of combined experience in Egyptian cuisine.
              Whether you&apos;re craving a quick snack, a full meal, or a custom
              celebration cake, EgyTex has you covered.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "1000+", label: "Happy Customers" },
              { value: "30+", label: "Menu Items" },
              { value: "2", label: "Categories" },
              { value: "100%", label: "Fresh Daily" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-amber-50 rounded-2xl p-5 text-center">
                <p className="text-3xl font-extrabold text-amber-700">{value}</p>
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
              { icon: "🏆", title: "Quality First", desc: "Every item is handcrafted with care. We only serve what we'd eat ourselves." },
              { icon: "🌿", title: "Fresh Ingredients", desc: "We use natural, locally sourced ingredients. No artificial preservatives." },
              { icon: "🤝", title: "Fair Pricing", desc: "Great food at honest prices. No hidden fees or markups." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-amber-100 p-6 text-center">
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
            Ready to taste EgyTex?
          </h2>
          <p className="text-gray-500 mb-6">
            Browse our full menu of sweet and savory Egyptian favorites.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
