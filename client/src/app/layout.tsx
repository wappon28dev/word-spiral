import { type ReactElement } from "react";
import { styled as p } from "panda/jsx";
import PageInit from "@/components/PageInit";
import "./global.css";

// Zen Maru Gothic
import "@fontsource/zen-maru-gothic/500.css";
import "@fontsource/zen-maru-gothic/700.css";
import "@fontsource/zen-maru-gothic/900.css";
import { siteName, description, url } from "@/assets/info";

export const metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="ja" suppressHydrationWarning>
      <p.body
        fontFamily="Zen Maru Gothic"
        h={["100vh", "100dvh"]}
        wordBreak="keep-all"
      >
        <PageInit>{children}</PageInit>
      </p.body>
    </html>
  );
}
