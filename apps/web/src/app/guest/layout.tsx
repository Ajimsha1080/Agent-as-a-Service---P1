import React from 'react';

export const metadata = {
  title: 'Azure Palm Resort - Digital AI Concierge',
  description: 'Instant 24/7 guest support for room bookings, pool hours, dining, and local activities.',
};

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
