import 'bootstrap/dist/css/bootstrap.css'

import './globals.css'
import Script from 'next/script';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from './head';
import GlobalProvider from './GlobalProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BookMe - Hotel Booking',
  description: 'A hotel booking website, a one stop shop to book a perfect hotel for you and your loved ones.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
        </GlobalProvider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"></Script>
        <Script src="https://kit.fontawesome.com/5132990bdd.js"></Script>
      </body>
    </html>
  )
}
