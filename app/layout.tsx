/**
 * Layout principal de la aplicación
 *
 * Este componente define la estructura base que se aplicará a todas las páginas.
 * Incluye:
 * - Configuración de fuentes
 * - Metadatos para SEO
 * - ThemeProvider para gestionar el tema claro/oscuro
 * - Estructura básica con header, main content y footer
 */
import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth" // Corregido: sin extensión
import { Toaster } from "@/components/ui/toaster" // Añadido: componente Toaster
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Electron - Más que tecnología una experiencia",
  description: "Tienda de electrodomésticos Electron",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster /> {/* Añadido: componente Toaster */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}