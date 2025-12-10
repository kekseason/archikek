import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ArchiKEK team. Questions about site analysis maps, technical support, or partnership inquiries.',
  openGraph: {
    title: 'Contact | ArchiKEK',
    description: 'Get in touch with the ArchiKEK team.',
    url: 'https://archikek.com/contact',
  },
  alternates: {
    canonical: 'https://archikek.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
