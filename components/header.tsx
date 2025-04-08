/**
 * Componente Header
 *
 * Implementa la barra de navegación principal de la aplicación con:
 * - Logo de la marca
 * - Navegación principal
 * - Botones de acción (carrito, login)
 * - Menú móvil responsivo
 *
 * El componente es client-side para manejar el estado del menú móvil
 * y detectar la ruta actual para resaltar el enlace activo.
 */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useAuth, useHasRole } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  // State to control mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useAuth()
  const isAdmin = useHasRole("admin")

  // Evitar errores de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Navigation links
  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Historia", href: "/historia" },
    { name: "Productos", href: "/productos" },
    { name: "Contacto", href: "/contacto" },
  ]

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Logo.png"
              alt="Electron Logo"
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                  pathname === link.href ? "text-purple-400" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="text-white hover:text-purple-400">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>

            {session.isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-900">
                    <User className="h-4 w-4 mr-2" />
                    {session.user?.name.split(" ")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil">Perfil</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Panel de Administración</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="border-purple-500 text-black hover:bg-purple-900">
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-white hover:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-700 flex justify-between">
              <Link href="/carrito" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="text-white hover:text-purple-400">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Carrito
                </Button>
              </Link>

              {session.isLoggedIn ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">Hola, {session.user?.name.split(" ")[0]}</p>
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-purple-500 text-white hover:bg-purple-900"
                      >
                        Panel Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-red-500 text-white hover:bg-red-900"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-900">
                    <User className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

