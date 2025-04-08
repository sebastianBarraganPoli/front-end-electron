/**
 * Página de Historia
 *
 * Esta página muestra la historia y valores de la empresa Electron:
 * - Sección de introducción con título y descripción
 * - Sección "Quiénes Somos" con texto e imagen
 * - Timeline interactivo con la trayectoria de la empresa
 * - Sección de valores corporativos
 * - Equipo directivo
 *
 * El diseño incluye elementos visuales como líneas de tiempo, tarjetas y efectos
 * para mejorar la experiencia del usuario.
 */
import Image from "next/image"

export default function HistoriaPage() {
  // Timeline data
  const timeline = [
    {
      year: "1995",
      title: "Fundación",
      description: "Electron nace como una pequeña tienda de electrodomésticos en el centro de la ciudad.",
    },
    {
      year: "2000",
      title: "Expansión",
      description: "Abrimos nuestra segunda tienda y comenzamos a distribuir productos a nivel nacional.",
    },
    {
      year: "2008",
      title: "Innovación",
      description: "Lanzamos nuestra primera línea de productos exclusivos con tecnología de vanguardia.",
    },
    {
      year: "2015",
      title: "Presencia Internacional",
      description: "Expandimos nuestras operaciones a países vecinos, consolidando nuestra marca en la región.",
    },
    {
      year: "2020",
      title: "Transformación Digital",
      description: "Lanzamos nuestra plataforma de e-commerce y renovamos nuestra imagen corporativa.",
    },
    {
      year: "Hoy",
      title: "Líderes del Mercado",
      description:
        "Somos reconocidos como líderes en el mercado de electrodomésticos, con presencia en múltiples países.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Nuestra Historia</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Desde nuestros humildes inicios hasta convertirnos en líderes del mercado, descubre la historia de Electron y
          nuestra pasión por la tecnología.
        </p>
      </div>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Quiénes Somos</h2>
          <p className="text-gray-700 mb-4">
            En Electron, nos dedicamos a ofrecer los mejores electrodomésticos del mercado, combinando calidad,
            innovación y servicio excepcional. Nuestra misión es mejorar la vida cotidiana de nuestros clientes a través
            de productos que faciliten sus tareas diarias.
          </p>
          <p className="text-gray-700 mb-4">
            Fundada en 1995, nuestra empresa ha crecido de ser una pequeña tienda local a convertirse en un referente en
            la industria de electrodomésticos, manteniendo siempre nuestros valores de excelencia, integridad y
            compromiso con el cliente.
          </p>
          <p className="text-gray-700">
            Hoy, con más de 25 años de experiencia, seguimos innovando y adaptándonos a las necesidades cambiantes del
            mercado, ofreciendo productos de última generación y soluciones inteligentes para el hogar moderno.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image src="/placeholder.svg?height=400&width=600" alt="Tienda Electron" fill className="object-cover" />
        </div>
      </div>

      {/* Timeline Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Nuestra Trayectoria</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                {/* Circle marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full bg-purple-600 z-10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>

                {/* Content */}
                <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="md:w-1/2"></div>
                  <div
                    className={`bg-white p-6 rounded-lg shadow-md md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                  >
                    <div className="bg-purple-100 text-purple-800 font-bold py-1 px-3 rounded-full inline-block mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Nuestros Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Calidad</h3>
            <p className="text-gray-700">
              Nos comprometemos a ofrecer productos de la más alta calidad, seleccionados cuidadosamente para garantizar
              durabilidad y rendimiento.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Innovación</h3>
            <p className="text-gray-700">
              Buscamos constantemente nuevas tecnologías y soluciones para ofrecer productos que mejoren la vida
              cotidiana de nuestros clientes.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Servicio al Cliente</h3>
            <p className="text-gray-700">
              Ponemos a nuestros clientes en el centro de todo lo que hacemos, ofreciendo un servicio personalizado y
              atención excepcional.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold mb-12 text-center">Nuestro Equipo Directivo</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="aspect-square relative">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt={`Director ${item}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Nombre Apellido</h3>
                <p className="text-purple-600 mb-4">Cargo Directivo</p>
                <p className="text-gray-700">
                  Profesional con amplia experiencia en el sector de electrodomésticos y tecnología, comprometido con la
                  visión de Electron.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

