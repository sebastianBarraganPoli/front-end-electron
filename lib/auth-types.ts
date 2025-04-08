// Definición de tipos para autenticación y usuarios

export type UserRole = "admin" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

export interface UserSession {
  user: User | null
  isLoggedIn: boolean
}

