import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ForkCast - Compras inteligentes para restaurantes | AI Purchasing Copilot",
  description:
    "ForkCast analiza ventas históricas, stock actual y recetas para prever necesidades, evitar sobrecompras y armar órdenes de compra por proveedor. Para restaurantes independientes en Argentina y Uruguay.",
  keywords:
    "restaurante, compras, inventario, AI, inteligencia artificial, Argentina, Uruguay, proveedores, órdenes de compra",
  authors: [{ name: "ForkCast" }],
  creator: "ForkCast",
  publisher: "ForkCast",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["es_UY", "en_US"],
    url: "https://forkcast.app",
    siteName: "ForkCast",
    title: "ForkCast - Compras inteligentes para restaurantes",
    description:
      "AI-powered purchasing copilot para restaurantes independientes. Analiza ventas, stock y recetas para optimizar compras.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ForkCast - Compras inteligentes para restaurantes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ForkCast - Compras inteligentes para restaurantes",
    description: "AI-powered purchasing copilot para restaurantes independientes",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://forkcast.app",
    languages: {
      "es-AR": "https://forkcast.app/es",
      "es-UY": "https://forkcast.app/es",
      "en-US": "https://forkcast.app/en",
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ForkCast",
              url: "https://forkcast.app",
              logo: "https://forkcast.app/logo.png",
              description: "AI-powered purchasing copilot for independent restaurants in Argentina & Uruguay",
              address: {
                "@type": "PostalAddress",
                addressCountry: ["AR", "UY"],
              },
              sameAs: ["https://twitter.com/forkcast", "https://linkedin.com/company/forkcast"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "ForkCast Software Plans",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "SoftwareApplication",
                      name: "ForkCast Pro",
                      applicationCategory: "BusinessApplication",
                      operatingSystem: "Web Browser",
                    },
                    price: "49",
                    priceCurrency: "USD",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
