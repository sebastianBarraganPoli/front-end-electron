/**
 * Página de Inicio (Home Page)
 *
 * Esta es la página principal de la tienda que muestra:
 * - Hero section con imagen de fondo y llamadas a la acción
 * - Características destacadas de la tienda
 * - Productos destacados en un grid responsivo
 * - Categorías de productos
 * - Formulario de suscripción al boletín
 *
 * El diseño es completamente responsivo y se adapta a diferentes tamaños de pantalla.
 */
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Truck, Shield, Clock, Check } from "lucide-react"

export default function HomePage() {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Smart TV 55"',
      description: "Televisor LED 4K Ultra HD con sistema operativo inteligente",
      price: 699.99,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      name: "Refrigerador Dúplex",
      description: "Refrigerador de dos puertas con dispensador de agua",
      price: 1299.99,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      name: "Lavadora Automática",
      description: "Lavadora de carga frontal con múltiples programas",
      price: 549.99,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  // Categories data
  const categories = [
    { name: "Televisores", image: "/placeholder.svg?height=200&width=200", href: "/productos?categoria=televisores" },
    {
      name: "Refrigeración",
      image: "/placeholder.svg?height=200&width=200",
      href: "/productos?categoria=refrigeracion",
    },
    { name: "Lavado", image: "/placeholder.svg?height=200&width=200", href: "/productos?categoria=lavado" },
    { name: "Cocina", image: "/placeholder.svg?height=200&width=200", href: "/productos?categoria=cocina" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">Más que tecnología, una experiencia</h1>
            <p className="text-lg md:text-xl">
              Descubre nuestra amplia gama de electrodomésticos de alta calidad para hacer tu vida más cómoda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/productos">Ver Productos</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white/10">
                <Link href="/historia">Conoce Nuestra Historia</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Objetivo del Aplicativo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro Objetivo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En Electron, nos dedicamos a ofrecer la mejor experiencia de compra de electrodomésticos, combinando
              tecnología de vanguardia, calidad superior y servicio excepcional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Objetivo de Electron"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Productos de Calidad</h3>
                  <p className="text-gray-600">
                    Seleccionamos cuidadosamente cada producto para garantizar la más alta calidad y durabilidad,
                    trabajando con las mejores marcas del mercado.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Asesoramiento Personalizado</h3>
                  <p className="text-gray-600">
                    Nuestro equipo de expertos está disponible para ayudarte a encontrar el electrodoméstico perfecto
                    para tus necesidades y presupuesto.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Servicio Post-Venta</h3>
                  <p className="text-gray-600">
                    Ofrecemos garantía extendida, instalación profesional y soporte técnico para asegurar tu
                    satisfacción a largo plazo.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Check className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Experiencia Digital</h3>
                  <p className="text-gray-600">
                    Nuestra plataforma en línea te permite explorar, comparar y comprar productos de manera fácil y
                    segura, con información detallada y opiniones de otros clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <Truck className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Envío Gratis</h3>
              <p className="text-gray-600">En compras superiores a $500</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <Shield className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Garantía Extendida</h3>
              <p className="text-gray-600">Hasta 3 años en todos nuestros productos</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <Clock className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-gray-600">Atención al cliente en todo momento</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Productos Destacados</h2>
            <Button asChild variant="ghost" className="text-purple-600 hover:text-purple-700">
              <Link href="/productos" className="flex items-center">
                Ver todos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link href={`/productos/${product.id}`}>Ver Detalles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explora por Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-105">
                  <div className="aspect-square relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold group-hover:text-purple-600">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Suscríbete a Nuestro Boletín</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Recibe las últimas novedades, ofertas exclusivas y consejos sobre nuestros productos.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-md text-white"
              required
            />
            <Button className="bg-black hover:bg-gray-800">Suscribirse</Button>
          </form>
        </div>
      </section>
    </div>
  )
}

