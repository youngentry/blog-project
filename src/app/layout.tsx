import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import NavHead from '@/containers/NavHead/NavHead';
import NavSide from '@/containers/NavSide/NavSide';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import '@/styles/animations.scss';
import '@/styles/zIndex.scss';
import type { Metadata } from 'next';
import Footer from '@/containers/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Youngentry's Blog`,
  description: `Youngentry's Blog`,
  icons: {
    icon: './images/logo.png',
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='kr'>
      <body className={inter.className}>
        <NavHead />
        <NavSide />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
