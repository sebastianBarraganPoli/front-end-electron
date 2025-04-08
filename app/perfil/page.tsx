"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth" // Corregido: sin extensión
import { useToast } from "@/hooks/use-toast"
import { User, Settings, ShoppingBag, CreditCard } from "lucide-react"

export default function PerfilPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { session, updateUser, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Cargar datos del usuario
  useEffect(() => {
    setMounted(true)
    if (session.user) {
      setName(session.user.name)
      setEmail(session.user.email)
    }
  }, [session.user])

  // Redirigir si no hay sesión
  useEffect(() => {
    if (mounted && !session.isLoggedIn) {
      router.push("/login")
    }
  }, [mounted, session.isLoggedIn, router])

  if (!mounted || !session.isLoggedIn) {
    return null
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()

    updateUser({ name })

    toast({
      title: "Perfil actualizado",
      description: "Tu información ha sido actualizada correctamente",
    })
  }

  const handleChangePassword = (e) => {
    e.preventDefault()

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    // En una aplicación real, aquí se verificaría la contraseña actual
    // y se actualizaría la nueva contraseña en la base de datos

    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido actualizada correctamente",
    })

    // Limpiar campos
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold">{session.user?.name}</h2>
                <p className="text-gray-500">{session.user?.email}</p>
                <p className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {session.user?.role === "admin" ? "Administrador" : "Visualizador"}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="hidden md:block">
            <h3 className="font-medium mb-3 text-gray-500 uppercase text-sm">Menú</h3>
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#profile">
                  <User className="mr-2 h-4 w-4" />
                  Información Personal
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#security">
                  <Settings className="mr-2 h-4 w-4" />
                  Seguridad
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#orders">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Mis Pedidos
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#payment">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Métodos de Pago
                </a>
              </Button>
            </nav>
          </div>

          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              logout()
              router.push("/")
            }}
          >
            Cerrar Sesión
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card id="profile">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tu información personal y cómo aparecerá en el sitio</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" value={email} disabled className="bg-gray-100" />
                        <p className="text-sm text-gray-500">El correo electrónico no se puede cambiar</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Rol</Label>
                        <Input
                          id="role"
                          value={session.user?.role === "admin" ? "Administrador" : "Visualizador"}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                        Guardar Cambios
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card id="security">
                <CardHeader>
                  <CardTitle>Seguridad</CardTitle>
                  <CardDescription>Actualiza tu contraseña y configura la seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Contraseña Actual</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva Contraseña</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                        Cambiar Contraseña
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card id="orders">
                <CardHeader>
                  <CardTitle>Mis Pedidos</CardTitle>
                  <CardDescription>Historial de tus compras y estado de tus pedidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tienes pedidos aún</h3>
                    <p className="text-gray-500 mb-6">Cuando realices una compra, tus pedidos aparecerán aquí</p>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <a href="/productos">Explorar Productos</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

