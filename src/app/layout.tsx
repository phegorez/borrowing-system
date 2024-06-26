import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import StoreProdiver from "./StoreProdiver";
import CheckAuth from "./CheckAuth";

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Borrowing System",
  description: "Welcome to borrowing system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <StoreProdiver>
          <CheckAuth>
            {children}
          </CheckAuth>
          <ToastContainer />
        </StoreProdiver>
      </body>
    </html>
  );
}
