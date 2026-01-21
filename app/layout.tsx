import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo: Housing Price Analysis',
  description: 'Housing price analysis and visualization tool',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white font-sans">{children}</body>
    </html>
  );
}
