/**
 * Módulo de autenticación para la aplicación.
 *
 * Este archivo define un contexto de autenticación (`AuthContext`) que maneja el inicio de sesión,
 * registro, cierre de sesión y actualización de datos del usuario. Además, incluye hooks y componentes
 * útiles para proteger rutas y verificar roles de usuario.
 *
 * Funcionalidades principales:
 * - Proporciona un `AuthProvider` para envolver la aplicación y mantener el estado de sesión.
 * - Usa `localStorage` para persistir la sesión entre recargas del navegador.
 * - Simula una base de datos con una lista de usuarios (`MOCK_USERS`).
 * - Incluye funciones para:
 *   - login: Verifica usuario y contraseña.
 *   - register: Registra nuevos usuarios.
 *   - logout: Cierra la sesión.
 *   - updateUser: Actualiza los datos del usuario autenticado.
 * - Proporciona el hook `useAuth` para acceder fácilmente al contexto desde cualquier componente.
 * - Incluye `useHasRole` para verificar si el usuario autenticado posee uno o más roles.
 * - `RoleGuard`: componente que permite renderizar condicionalmente contenido basado en roles.
 *
 * ⚠ Nota: En este ejemplo los datos están simulados en memoria con `MOCK_USERS`, 
 * en una aplicación real, estas operaciones deben hacerse a través de una API con backend.
 */
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, UserRole, UserSession } from "./auth-types"

// Contexto de autenticación
const AuthContext = createContext<{
  session: UserSession
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}>({
  session: { user: null, isLoggedIn: false },
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateUser: () => {},
})

// Mock de base de datos de usuarios (en una aplicación real, esto vendría de una base de datos)
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin Usuario",
    email: "admin@electron.com",
    password: "admin123", // En una aplicación real, las contraseñas estarían hasheadas
    role: "admin" as UserRole,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Usuario Visualizador",
    email: "viewer@electron.com",
    password: "viewer123",
    role: "viewer" as UserRole,
    createdAt: new Date(),
  },
]

// Proveedor de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserSession>({
    user: null,
    isLoggedIn: false,
  })

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const savedSession = localStorage.getItem("userSession")
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession)
        setSession({
          user: parsedSession.user,
          isLoggedIn: true,
        })
      } catch (error) {
        console.error("Error parsing saved session:", error)
        localStorage.removeItem("userSession")
      }
    }
  }, [])

  // Función de inicio de sesión
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulando una llamada a API
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user
      const newSession = {
        user: userWithoutPassword,
        isLoggedIn: true,
      }
      setSession(newSession)
      localStorage.setItem("userSession", JSON.stringify(newSession))
      return true
    }
    return false
  }

  // Función de registro
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Verificar si el correo ya existe
    if (MOCK_USERS.some((u) => u.email === email)) {
      return false
    }

    // En una aplicación real, aquí se haría una llamada a API para crear el usuario
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      password,
      role: "viewer" as UserRole, // Por defecto, los nuevos usuarios son visualizadores
      createdAt: new Date(),
    }

    MOCK_USERS.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    const newSession = {
      user: userWithoutPassword,
      isLoggedIn: true,
    }
    setSession(newSession)
    localStorage.setItem("userSession", JSON.stringify(newSession))
    return true
  }

  // Función de cierre de sesión
  const logout = () => {
    setSession({ user: null, isLoggedIn: false })
    localStorage.removeItem("userSession")
  }

  // Función para actualizar datos del usuario
  const updateUser = (userData: Partial<User>) => {
    if (session.user) {
      const updatedUser = { ...session.user, ...userData }
      const newSession = {
        user: updatedUser,
        isLoggedIn: true,
      }
      setSession(newSession)
      localStorage.setItem("userSession", JSON.stringify(newSession))

      // Actualizar en la "base de datos"
      const userIndex = MOCK_USERS.findIndex((u) => u.id === session.user?.id)
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = {
          ...MOCK_USERS[userIndex],
          ...userData,
        }
      }
    }
  }

  return (
    <AuthContext.Provider value={{ session, login, register, logout, updateUser }}>{children}</AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext)

// Hook para verificar si el usuario tiene un rol específico
export function useHasRole(role: UserRole | UserRole[]) {
  const { session } = useAuth()
  const roles = Array.isArray(role) ? role : [role]

  if (!session.isLoggedIn || !session.user) {
    return false
  }

  return roles.includes(session.user.role)
}

// Componente para proteger rutas basadas en roles
export function RoleGuard({
  children,
  allowedRoles,
  fallback,
}: {
  children: ReactNode
  allowedRoles: UserRole | UserRole[]
  fallback?: ReactNode
}) {
  const hasRole = useHasRole(allowedRoles)
  const { session } = useAuth()

  if (!session.isLoggedIn) {
    return fallback || null
  }

  return hasRole ? <>{children}</> : fallback || null
}

