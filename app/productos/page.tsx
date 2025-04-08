/**
 * Página de Productos (Catálogo)
 *
 * Esta página muestra el catálogo completo de productos con:
 * - Barra de búsqueda para filtrar productos
 * - Filtros por categoría y rango de precio
 * - Opciones de ordenamiento
 * - Grid responsivo de productos
 *
 * El componente es client-side para manejar los estados de filtrado
 * y ordenamiento sin necesidad de recargar la página.
 */
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, Star, X } from "lucide-react"

export default function ProductosPage() {
  // Mock product data
  const allProducts = [
    {
      id: 1,
      name: 'Smart TV 55"',
      description: "Televisor LED 4K Ultra HD con sistema operativo inteligente",
      price: 699.99,
      category: "Televisores",
      brand: "Electron",
      rating: 4.5,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      name: "Refrigerador Dúplex",
      description: "Refrigerador de dos puertas con dispensador de agua",
      price: 1299.99,
      category: "Refrigeración",
      brand: "Electron",
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      name: "Lavadora Automática",
      description: "Lavadora de carga frontal con múltiples programas",
      price: 549.99,
      category: "Lavado",
      brand: "Electron",
      rating: 4.2,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      name: "Microondas Digital",
      description: "Microondas con panel digital y múltiples funciones",
      price: 149.99,
      category: "Cocina",
      brand: "Electron",
      rating: 4.0,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      name: "Licuadora de Alta Potencia",
      description: "Licuadora con motor de alta potencia y varias velocidades",
      price: 89.99,
      category: "Cocina",
      brand: "Electron",
      rating: 4.3,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      name: "Aspiradora Robot",
      description: "Aspiradora inteligente con programación automática",
      price: 299.99,
      category: "Limpieza",
      brand: "Electron",
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 7,
      name: "Cafetera Programable",
      description: "Cafetera con temporizador y múltiples opciones de preparación",
      price: 79.99,
      category: "Cocina",
      brand: "Electron",
      rating: 4.1,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 8,
      name: "Aire Acondicionado Split",
      description: "Aire acondicionado con tecnología inverter y bajo consumo",
      price: 499.99,
      category: "Climatización",
      brand: "Electron",
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  // Available categories
  const categories = ["Televisores", "Refrigeración", "Lavado", "Cocina", "Limpieza", "Climatización"]

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Filter products
  const filteredProducts = allProducts
    .filter((product) => {
      // Search term filter
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nuestros Productos</h1>
        <p className="text-gray-600">Descubre nuestra amplia selección de electrodomésticos de alta calidad</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="rating">Mejor Valorados</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-64 bg-white p-6 rounded-lg shadow-sm sticky top-4 h-fit`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filtros</h2>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowFilters(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Categorías</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="ml-2 text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Rango de Precio</h3>
            <Slider
              defaultValue={[0, 1500]}
              max={1500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">${priceRange[0]}</span>
              <span className="text-sm">${priceRange[1]}</span>
            </div>
          </div>

          {/* Reset Filters */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSelectedCategories([])
              setPriceRange([0, 1500])
              setSearchTerm("")
            }}
          >
            Limpiar Filtros
          </Button>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-gray-600 mb-6">Intenta con otros filtros o términos de búsqueda</p>
              <Button
                onClick={() => {
                  setSelectedCategories([])
                  setPriceRange([0, 1500])
                  setSearchTerm("")
                }}
              >
                Ver todos los productos
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
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
          )}
        </div>
      </div>
    </div>
  )
}

