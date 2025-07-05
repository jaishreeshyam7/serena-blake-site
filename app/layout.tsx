import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ReactQueryProvider } from "@/components/providers/react-query-provider"
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dr. Serena Blake - Clinical Psychologist',
  description: 'Licensed clinical psychologist in Los Angeles, CA. Specializing in anxiety, relationship counseling, and trauma recovery. 8+ years experience with evidence-based therapy approaches.',
  keywords: 'psychologist, therapy, anxiety, trauma, relationships, Los Angeles, clinical psychology, mental health',
  authors: [{ name: 'Dr. Serena Blake' }],
  openGraph: {
    title: 'Dr. Serena Blake - Clinical Psychologist',
    description: 'Licensed clinical psychologist in Los Angeles, CA. Specializing in anxiety, relationship counseling, and trauma recovery.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}