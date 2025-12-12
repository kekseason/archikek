'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Send to Web3Forms (free form backend)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY', // Replace with your Web3Forms access key
          name: formData.name,
          email: formData.email,
          subject: `[ArchiKEK ${formData.subject}] Message from ${formData.name}`,
          message: formData.message,
          from_name: 'ArchiKEK Contact Form',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        setFormData({ name: '', email: '', subject: 'general', message: '' })
      } else {
        setError('Failed to send message. Please try again.')
      }
    } catch (err) {
      setError('Failed to send message. Please try again.')
    }

    setLoading(false)
  }

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
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-gray-400 mb-8">
              Have a question, feedback, or need help? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <p className="text-gray-400 text-sm">mehmetsozturk35@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Response Time</h3>
                  <p className="text-gray-400 text-sm">Usually within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Instagram</h3>
                  <a 
                    href="https://instagram.com/archikekapp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-400 text-sm hover:text-pink-300 transition"
                  >
                    @archikekapp
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="mt-10 p-4 bg-[#111] border border-[#222] rounded-xl">
              <h3 className="text-white font-medium mb-2">Common Questions</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• <span className="text-gray-300">How do credits work?</span> Each map download uses 1 credit.</li>
                <li>• <span className="text-gray-300">What formats are available?</span> SVG and DXF with organized layers.</li>
                <li>• <span className="text-gray-300">Can I use maps commercially?</span> Yes, with OSM attribution.</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            {success ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">Thanks for reaching out. We'll get back to you soon.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-amber-500 hover:text-amber-400 font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-xl text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                  >
                    <option value="general">General Question</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="partnership">Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-xl text-white placeholder-gray-500 focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-400 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our{' '}
                  <Link href="/privacy" className="text-amber-500/70 hover:text-amber-500">Privacy Policy</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>© 2025 ArchiKEK</span>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
