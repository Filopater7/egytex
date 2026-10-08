import type { Metadata } from "next";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — EgyTex",
  description:
    "Get in touch with the EgyTex team. We're here to help with your orders and questions.",
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#1C1400]">Contact Us</h1>
        <p className="mt-2 text-gray-500">We&apos;re here to help with your orders and questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-amber-100 shadow-sm p-6 sm:p-8">
          <ContactForm />
        </div>

        {/* Contact info */}
        <div className="space-y-5">
          {[
            {
              icon: "📧",
              title: "Email",
              lines: ["info@egytex.com", "We reply within a few hours"],
            },
            {
              icon: "📞",
              title: "Phone",
              lines: ["+20 100 000 0000", "Sat–Thu, 10 am–10 pm"],
            },
            {
              icon: "📍",
              title: "Address",
              lines: ["Cairo, Egypt"],
            },
            {
              icon: "🕑",
              title: "Business Hours",
              lines: ["Saturday–Thursday: 10 am–10 pm", "Friday: 12 pm–10 pm"],
            },
          ].map(({ icon, title, lines }) => (
            <div key={title} className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{icon}</span>
                <h2 className="font-semibold text-gray-900">{title}</h2>
              </div>
              {lines.map((line) => (
                <p key={line} className="text-sm text-gray-500 ml-9">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
