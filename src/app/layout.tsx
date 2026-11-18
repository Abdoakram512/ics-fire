import type { Metadata } from "next";
import "./globals.css";
import "./catalog.css";
import { QuoteProvider } from "@/context/QuoteContext";
import { AppContextProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "ICS | أنظمة مكافحة الحريق ومعدات السلامة المعتمدة",
  description: "استعرض مواصفات وأسعار معدات مكافحة الحريق والإنذار المعتمدة من الدفاع المدني، ونزّل عرض سعر PDF رسمي فوري.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            document.documentElement.classList.toggle('dark', localStorage.getItem('ics-theme') === 'dark');
            var saved = localStorage.getItem('ics-lang');
            var lang = saved === 'en' ? 'en' : 'ar';
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
