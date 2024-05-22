import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavigationMenu from "./_components/NavigationMenu";
import { ThemeProvider } from "@/providers/theme-provider";
import ThanksMenu from "./_components/ThanksMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kolay Eczane İzmir",
  description: "Generated by Ali Yorulmaz | With love and coffee.",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased flex flex-col",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="absolute inset-0 -z-10 h-full w-full dark:bg-[radial-gradient(#12192d_1px,transparent_1px)]  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="flex-grow">{children}</div>
          <footer className="w-full sticky bottom-14 pb-2 flex justify-center shadow-md">
            <ThanksMenu />
          </footer>
          <footer className="w-full sticky bottom-0 pb-2 flex justify-center shadow-md">
            <NavigationMenu />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
