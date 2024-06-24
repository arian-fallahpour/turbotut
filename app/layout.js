import "@/sass/globals.scss";

import { Open_Sans } from "next/font/google";
import { Providers } from "./providers";
import business from "@/app/data/business";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata = {
  title: {
    template: `${business.name} | %s`,
    default: business.name,
  },
  description: business.description,
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// TODO: Add billing limits for AWS and vercel
