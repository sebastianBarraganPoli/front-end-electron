/**
 * Componente Footer
 *
 * Implementa el pie de página de la aplicación con:
 * - Logo de la marca
 * - Descripción breve de la empresa
 * - Enlaces rápidos a secciones principales
 * - Información de contacto
 * - Enlaces a redes sociales
 * - Copyright y derechos reservados
 *
 * El diseño es responsivo y se adapta a diferentes tamaños de pantalla.
 */
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Image
              src="/images/Logo.png"
              alt="Electron Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-sm text-gray-300">
              Más que tecnología una experiencia. Ofrecemos los mejores electrodomésticos con garantía y servicio de
              calidad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-purple-400">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/historia" className="text-sm text-gray-300 hover:text-purple-400">
                  Historia
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-sm text-gray-300 hover:text-purple-400">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-gray-300 hover:text-purple-400">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-purple-400" />
                +123 456 7890
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-purple-400" />
                info@electron.com
              </li>
              <li className="flex items-start text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-purple-400 mt-1" />
                <span>Av. Principal 123, Ciudad, País</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-purple-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Electron. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

