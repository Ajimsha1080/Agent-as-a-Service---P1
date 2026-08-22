import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Hospitality Agent Cloud | Enterprise Agent-as-a-Service',
  description: 'Enterprise AI Agent Platform for Resorts, Hotels, Hostels & Hospitality Groups',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/inter-ui@3.19.3/inter.css" />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
