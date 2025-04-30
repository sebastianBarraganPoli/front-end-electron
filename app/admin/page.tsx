/**
 * Página de Administración
 *
 * Esta página implementa un panel de administración completo con:
 * - Dashboard con estadísticas clave
 * - Gestión de productos (CRUD)
 * - Listado de pedidos
 * - Sección de analíticas
 * - Diálogos para añadir/editar/eliminar productos
 *
 * El componente es client-side para manejar los estados de los diálogos
 * y la interacción con los productos.
 */
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Box,
  DollarSign,
  Edit,
  MoreHorizontal,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  Users,
} from "lucide-react"
import { useAuth, useHasRole } from "@/lib/auth" // Corregido: sin extensión
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { session } = useAuth()
  const isAdmin = useHasRole("admin")
  const [mounted, setMounted] = useState(false)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)

  // Verificar si el usuario está autenticado y es administrador
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (!session.isLoggedIn) {
        router.push("/login")
        toast({
          title: "Acceso denegado",
          description: "Debes iniciar sesión para acceder al panel de administración",
          variant: "destructive",
        })
      } else if (!isAdmin) {
        router.push("/")
        toast({
          title: "Acceso denegado",
          description: "No tienes permisos de administrador",
          variant: "destructive",
        })
      }
    }
  }, [mounted, session.isLoggedIn, isAdmin, router, toast])

  if (!mounted || !session.isLoggedIn || !isAdmin) {
    return null
  }

  // Mock data for dashboard
  const dashboardStats = [
    {
      title: "Ventas Totales",
      value: "$12,345",
      change: "+12%",
      icon: <DollarSign className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Pedidos",
      value: "156",
      change: "+8%",
      icon: <ShoppingCart className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Productos",
      value: "48",
      change: "+2",
      icon: <Package className="h-8 w-8 text-purple-600" />,
    },
    {
      title: "Clientes",
      value: "2,345",
      change: "+15%",
      icon: <Users className="h-8 w-8 text-purple-600" />,
    },
  ]

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Smart TV 55"',
      category: "Televisores",
      price: 699.99,
      stock: 15,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      name: "Refrigerador Dúplex",
      category: "Refrigeración",
      price: 1299.99,
      stock: 8,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      name: "Lavadora Automática",
      category: "Lavado",
      price: 549.99,
      stock: 12,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      name: "Microondas Digital",
      category: "Cocina",
      price: 149.99,
      stock: 20,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 5,
      name: "Licuadora de Alta Potencia",
      category: "Cocina",
      price: 89.99,
      stock: 25,
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  // Mock orders data
  const orders = [
    {
      id: "#ORD-001",
      customer: "Juan Pérez",
      date: "2023-06-15",
      status: "Entregado",
      total: "$749.99",
    },
    {
      id: "#ORD-002",
      customer: "María García",
      date: "2023-06-14",
      status: "En proceso",
      total: "$1,349.99",
    },
    {
      id: "#ORD-003",
      customer: "Carlos Rodríguez",
      date: "2023-06-13",
      status: "Pendiente",
      total: "$249.99",
    },
    {
      id: "#ORD-004",
      customer: "Ana Martínez",
      date: "2023-06-12",
      status: "Entregado",
      total: "$599.99",
    },
    {
      id: "#ORD-005",
      customer: "Roberto López",
      date: "2023-06-11",
      status: "Cancelado",
      total: "$89.99",
    },
  ]

  // Mock users data
  const users = [
    {
      id: "1",
      name: "Admin Usuario",
      email: "admin@electron.com",
      role: "admin",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "Usuario Visualizador",
      email: "viewer@electron.com",
      role: "viewer",
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "viewer",
      createdAt: "2023-03-10",
    },
    {
      id: "4",
      name: "María García",
      email: "maria@example.com",
      role: "viewer",
      createdAt: "2023-04-05",
    },
  ]

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setIsAddProductOpen(true)
  }

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsAddProductOpen(true)
  }

  const handleSaveProduct = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el producto
    console.log("Saving product:", selectedProduct || "new product")
    setIsAddProductOpen(false)

    toast({
      title: selectedProduct ? "Producto actualizado" : "Producto añadido",
      description: selectedProduct
        ? "El producto ha sido actualizado correctamente"
        : "El producto ha sido añadido correctamente",
    })
  }

  const handleDeleteConfirm = () => {
    // Aquí iría la lógica para eliminar el producto
    console.log("Deleting product:", selectedProduct)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado correctamente",
    })
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setIsAddUserOpen(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsAddUserOpen(true)
  }

  const handleDeleteUser = (user) => {
    setSelectedUser(user)
    setIsDeleteUserDialogOpen(true)
  }

  const handleSaveUser = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el usuario
    console.log("Saving user:", selectedUser || "new user")
    setIsAddUserOpen(false)

    toast({
      title: selectedUser ? "Usuario actualizado" : "Usuario añadido",
      description: selectedUser
        ? "El usuario ha sido actualizado correctamente"
        : "El usuario ha sido añadido correctamente",
    })
  }

  const handleDeleteUserConfirm = () => {
    // Aquí iría la lógica para eliminar el usuario
    console.log("Deleting user:", selectedUser)
    setIsDeleteUserDialogOpen(false)

    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado correctamente",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona tus productos, pedidos, usuarios y más</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="font-semibold text-purple-600">{session.user?.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-sm text-gray-600">{session.user?.email}</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Ir a la Tienda</Link>
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-green-600">{stat.change} vs. mes anterior</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">{stat.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            Productos
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analíticas
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Gestión de Productos</CardTitle>
              <Button onClick={handleAddProduct} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Producto
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Acciones</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteProduct(product)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Entregado"
                              ? "bg-green-100 text-green-800"
                              : order.status === "En proceso"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Pendiente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{order.total}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Gestión de Usuarios</CardTitle>
              <Button onClick={handleAddUser} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Usuario
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo Electrónico</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role === "admin" ? "Administrador" : "Visualizador"}
                        </span>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Acciones</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analíticas de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">Gráficos de analíticas irían aquí</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Editar Producto" : "Añadir Nuevo Producto"}</DialogTitle>
            <DialogDescription>
              Complete los detalles del producto a continuación. Haga clic en guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveProduct}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product-name" className="text-right">
                  Nombre
                </Label>
                <Input id="product-name" defaultValue={selectedProduct?.name || ""} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product-category" className="text-right">
                  Categoría
                </Label>
                <Input
                  id="product-category"
                  defaultValue={selectedProduct?.category || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product-price" className="text-right">
                  Precio
                </Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  defaultValue={selectedProduct?.price || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product-stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="product-stock"
                  type="number"
                  defaultValue={selectedProduct?.stock || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="product-description" className="text-right pt-2">
                  Descripción
                </Label>
                <Textarea id="product-description" className="col-span-3" rows={4} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product-image" className="text-right">
                  Imagen
                </Label>
                <Input id="product-image" type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddProductOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea eliminar el producto &quot;{selectedProduct?.name}&quot;? Esta acción no se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Editar Usuario" : "Añadir Nuevo Usuario"}</DialogTitle>
            <DialogDescription>
              Complete los detalles del usuario a continuación. Haga clic en guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-name" className="text-right">
                  Nombre
                </Label>
                <Input id="user-name" defaultValue={selectedUser?.name || ""} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-email" className="text-right">
                  Correo Electrónico
                </Label>
                <Input
                  id="user-email"
                  type="email"
                  defaultValue={selectedUser?.email || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="user-role" className="text-right">
                  Rol
                </Label>
                <Select defaultValue={selectedUser?.role || "viewer"}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {!selectedUser && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-password" className="text-right">
                    Contraseña
                  </Label>
                  <Input id="user-password" type="password" className="col-span-3" required={!selectedUser} />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteUserDialogOpen} onOpenChange={setIsDeleteUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea eliminar el usuario &quot;{selectedProduct?.name}&quot;? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteUserDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteUserConfirm}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

