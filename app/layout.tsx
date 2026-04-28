//  import "./globals.css";
// import Providers from "./Providers";
// import { ReactNode } from "react";

// export default function RootLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body suppressHydrationWarning>
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import Providers from "./Providers";
import { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-body"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}