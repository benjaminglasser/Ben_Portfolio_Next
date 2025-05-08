import "./globals.css";
import "./assets/fonts/index.css";
import Navbar from "./common/navbar";
import { Suspense } from "react";
import Loader from "./common/Loader";
import GlobalCursor from "./common/GlobalCursor";
import ClientLayout from "./ClientLayout";
import BackgroundTransition from "./common/BackgroundTransition";
import { Inter, Lato } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter'
});

const lato = Lato({ 
  subsets: ["latin"],
  weight: ['400', '700', '900'],
  variable: '--font-lato'
});

export const metadata = {
  title: "Benjamin Glasser",
  description: "Benjamin Glasser's Portfolio",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon2-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Benjamin Glasser</title>
        {/* <link rel="stylesheet" href="styles.css" /> */}
        <link rel="icon" type="image/png" href="/favicon2-32x32.png" />
      </head>
      <body className={`${inter.variable} ${lato.variable} px-5 pt-3 pb-36 md:px-10 md:pt-0 md:pb-10 relative`}>
        <ClientLayout>
          <BackgroundTransition />
          <GlobalCursor />
          <Suspense fallback={<Loader />}>
            <Navbar />
            {children}
          </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
