"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function ContactoPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulando envío de formulario
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos a la brevedad.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Estamos aquí para ayudarte. Envíanos tus preguntas, comentarios o sugerencias y te responderemos a la
          brevedad.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Formulario de Contacto */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Asunto de tu mensaje"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Información de Contacto */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Teléfono</h3>
                  <p className="text-gray-600">+123 456 7890</p>
                  <p className="text-gray-600">+123 456 7891</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Correo Electrónico</h3>
                  <p className="text-gray-600">info@electron.com</p>
                  <p className="text-gray-600">soporte@electron.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Dirección</h3>
                  <p className="text-gray-600">Av. Principal 123</p>
                  <p className="text-gray-600">Ciudad, País, CP 12345</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Horario de Atención</h3>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sábados: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Encuéntranos</h2>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Mapa de ubicación"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                <p>Mapa de ubicación iría aquí</p>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Síguenos</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-purple-100 p-3 rounded-full text-purple-600 hover:bg-purple-200 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-purple-100 p-3 rounded-full text-purple-600 hover:bg-purple-200 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.5 5.5h-1.775c-.675 0-1.225.55-1.225 1.225v1.775h3l-.5 3h-2.5v7h-3v-7h-2.5v-3h2.5v-2.025c0-2.475 2.025-4.475 4.5-4.475h1.5v3.5z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-purple-100 p-3 rounded-full text-purple-600 hover:bg-purple-200 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.25 14.5h-2.5v-7.5h2.5v7.5zm-1.25-8.75c-.75 0-1.25-.5-1.25-1.25s.5-1.25 1.25-1.25 1.25.5 1.25 1.25-.5 1.25-1.25 1.25zm8.75 8.75h-2.5v-4c0-1-.75-1.75-1.75-1.75s-1.75.75-1.75 1.75v4h-2.5v-7.5h2.5v1c.5-.75 1.5-1.25 2.5-1.25 1.75 0 3.5 1.5 3.5 3.25v4.5z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-purple-100 p-3 rounded-full text-purple-600 hover:bg-purple-200 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm3.75 14.5c-1.5 0-2.75-1.25-2.75-2.75s1.25-2.75 2.75-2.75 2.75 1.25 2.75 2.75-1.25 2.75-2.75 2.75zm-7.5 0c-1.5 0-2.75-1.25-2.75-2.75s1.25-2.75 2.75-2.75 2.75 1.25 2.75 2.75-1.25 2.75-2.75 2.75z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Preguntas Frecuentes */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">¿Cómo puedo realizar un pedido?</h3>
                <p className="text-gray-600">
                  Para realizar un pedido, simplemente navega por nuestro catálogo, selecciona los productos que deseas
                  comprar, agrégalos al carrito y procede al pago. Puedes pagar con tarjeta de crédito, débito o
                  transferencia bancaria.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

