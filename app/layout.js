
import { Montserrat } from "next/font/google";
import "./globals.css";
import Head from "next/head"; 
const montserrat = Montserrat({ subsets: ["latin"] });
import ClientLayout from "./ClientLayout";
import PageTransitionWrapper from '../app/components/PageTransitionWrapper';

export const metadata = {
  title: {
    template: '%s | Prashna AI',
    default: 'Prashna AI', 
  },
  description: 'Your AI-powered learning companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
          <link rel="icon" href="/favicon.ico" /> 
        </Head>
        <ClientLayout>
        <body suppressHydrationWarning>
        {/* <PageTransitionWrapper> */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* </PageTransitionWrapper> */}
      </body>
        </ClientLayout>
      
    </html>
  );
}