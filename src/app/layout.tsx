
import AuthProvider from "@/components/SessionProvider";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>

        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
