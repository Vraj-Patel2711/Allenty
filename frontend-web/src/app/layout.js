"use client";
import './globals.css';
import Sidebar from '../components/Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/' || pathname === '/forgot-password';

  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">
        {!isLoginPage && <Sidebar />}
        <main className={`flex-1 ${!isLoginPage ? 'p-8 overflow-y-auto' : ''}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
