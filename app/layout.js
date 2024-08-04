import "@/sass/globals.scss";

import { Open_Sans } from "next/font/google";
import { Providers } from "./providers";
import business from "@/app/data/business";
import { join } from "@/utils/helper";
import { Analytics } from "@vercel/analytics/react";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata = {
  title: {
    template: `${business.name}${process.env.NODE_ENV === "development" ? " (DEV)" : ""} | %s`,
    default: business.name,
  },
  description: business.description,
  metadataBase: new URL("https://turbotut.com"),
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  twitter: {
    title: `${business.name} learning`,
    description: "Learn any high school subject at blazing speeds!.",
    images: ["/preview.png"],
  },
  openGraph: {
    title: `${business.name} learning`,
    description: "Learn any high school subject at blazing speeds!.",
    images: ["/preview.png"],
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <Analytics />
      <body className={join(openSans.className, "preload")} id="body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// TODO: Add billing limits for AWS and vercel
