import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Navbar from '@/components/navbar';
import Footer from "@/components/footer";
import BackgroundAnimations from '../components/BackgroundAnimations';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Happy Flow',
  description: 'Track your cycle with ease.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-pink-50`}>
        <AuthContextProvider>
          <div className="relative flex flex-col min-h-screen">
            <BackgroundAnimations />
            <Navbar />
            <main className="flex-grow relative z-10">
              <div className="fade-in">{children}</div>
            </main>
            <Footer />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}