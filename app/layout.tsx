import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Teen Health Literacy Hub',
  description: 'Interactive health literacy tools and prescription visual guides for teens.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}