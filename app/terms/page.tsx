import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ArchiKEK',
  description: 'Terms of Service for ArchiKEK - Site analysis map generator for architects',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ArchiKEK" width={32} height={32} className="rounded-lg" />
            <span className="text-white font-semibold">ArchiKEK</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/create" className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 rounded-lg text-sm font-medium transition">
              Create Map
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: December 10, 2024</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using ArchiKEK ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-300 leading-relaxed">
              ArchiKEK is a web-based tool that generates site analysis maps from OpenStreetMap data. The Service allows users to create figure ground maps, urban analysis diagrams, and export them in SVG and DXF formats for use in architecture and urban planning projects.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. User Accounts</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              To access certain features of the Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Credits and Payments</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              ArchiKEK operates on a credit-based system:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>New users receive 1 free credit upon registration</li>
              <li>Additional credits can be purchased through our pricing page</li>
              <li>Credits are non-refundable and non-transferable</li>
              <li>Credits do not expire</li>
              <li>Pro subscriptions provide unlimited access during the subscription period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Acceptable Use</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to reverse engineer or extract source code</li>
              <li>Overload or disrupt the Service infrastructure</li>
              <li>Resell or redistribute generated maps commercially without proper licensing</li>
              <li>Create multiple accounts to abuse free credits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">Map Data:</strong> The underlying map data comes from OpenStreetMap and is licensed under the Open Database License (ODbL). You must comply with OSM's attribution requirements when using generated maps.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">Generated Maps:</strong> Maps you generate using ArchiKEK may be used for personal and commercial projects, subject to OSM's licensing terms. You retain ownership of your projects that incorporate our generated maps.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">7. Educational Access</h2>
            <p className="text-gray-300 leading-relaxed">
              Students from partner educational institutions (such as Yaşar University) may receive complimentary Pro access. This access is limited to verified educational email addresses and is intended for academic use. Abuse of educational access may result in account termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-300 leading-relaxed">
              The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or that generated maps will be suitable for any specific purpose. Map accuracy depends on OpenStreetMap data quality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              ArchiKEK shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid for the Service in the past 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">10. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violation of these terms. You may also delete your account at any time. Upon termination, your right to use the Service ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">11. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update these Terms of Service from time to time. We will notify users of significant changes via email or through the Service. Continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">12. Contact</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at{' '}
              <Link href="/contact" className="text-amber-500 hover:text-amber-400">our contact page</Link>.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2024 ArchiKEK</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
