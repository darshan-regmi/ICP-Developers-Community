import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { site, siteUrl } from "@/data/site";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Informatics College Pokhara`,
    template: `%s · ${site.shortName}`,
  },
  description: site.descriptionShort,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  publisher: site.author.name,
  category: "education",
  classification: "Developer community",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Informatics College Pokhara`,
    description: site.descriptionShort,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — a student-led developer movement at Informatics College, Pokhara`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Informatics College Pokhara`,
    description: site.descriptionShort,
    images: ["/twitter-image.png"],
    ...(site.social.twitterHandle && {
      creator: site.social.twitterHandle,
      site: site.social.twitterHandle,
    }),
  },

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },

  manifest: "/manifest.webmanifest",

  ...(site.verification.google ||
  site.verification.yandex ||
  site.verification.bing
    ? {
        verification: {
          ...(site.verification.google && { google: site.verification.google }),
          ...(site.verification.yandex && { yandex: site.verification.yandex }),
          ...(site.verification.bing && {
            other: { "msvalidate.01": site.verification.bing },
          }),
        },
      }
    : {}),

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: site.themeColor.dark },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD: tells Google what this site is and who runs it. Drives sitelinks,
// the knowledge panel, and rich-result eligibility.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      legalName: site.organization.legalName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/apple-icon.png`,
        width: 180,
        height: 180,
      },
      image: `${siteUrl}/opengraph-image.png`,
      description: site.description,
      foundingDate: site.organization.foundingDate,
      parentOrganization: {
        "@type": "EducationalOrganization",
        name: site.organization.parentOrganization,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.organization.address.locality,
        addressRegion: site.organization.address.region,
        addressCountry: site.organization.address.countryCode,
      },
      sameAs: [
        site.social.github,
        site.social.discord,
        site.social.instagram,
        site.social.linkedin,
        site.social.twitter,
      ].filter(Boolean),
      ...(site.contact.email && {
        contactPoint: {
          "@type": "ContactPoint",
          email: site.contact.email,
          contactType: "general inquiry",
          availableLanguage: ["English", "Nepali"],
        },
      }),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={site.language}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (t === 'dark' || (!t && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
