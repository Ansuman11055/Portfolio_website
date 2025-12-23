
"use client";
import { Loader } from '@react-three/drei';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Loader
          containerStyles={{
            backgroundColor: '#000',
            color: '#00FFFF',
            zIndex: 9999,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          barStyles={{
            height: '2px',
            background: '#00FFFF',
            borderRadius: 0,
          }}
          dataStyles={{
            fontSize: '12px',
            fontFamily: 'sans-serif',
            color: '#00FFFF',
            marginTop: '1.5rem',
          }}
          innerStyles={{ background: 'transparent' }}
        />
      </body>
    </html>
  );
}
