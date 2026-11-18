import type { Metadata } from "next";
import "./globals.css";
import "./catalog.css";
import { QuoteProvider } from "@/context/QuoteContext";
import { AppContextProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "ICS Fire Systems | Fire Protection Equipment",
  description: "Browse ICS fire protection equipment, check prices and download an itemized quotation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            document.documentElement.classList.toggle('dark', localStorage.getItem('ics-theme') === 'dark');
            var lang = localStorage.getItem('ics-lang') === 'ar' ? 'ar' : 'en';
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
          } catch {}
        ` }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <AppContextProvider><QuoteProvider>{children}</QuoteProvider></AppContextProvider>
      </body>
    </html>
  );
}
