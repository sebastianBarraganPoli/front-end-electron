/**
 * Combina múltiples clases CSS condicionales usando `clsx` 
 * y luego las fusiona inteligentemente con `tailwind-merge`
 * para evitar clases conflictivas en Tailwind CSS.
 *
 * Ejemplo:
 * cn("px-2", "py-2", "px-4") devolverá "py-2 px-4"
 * (la clase px-2 es reemplazada por px-4 gracias a tailwind-merge).
 *
 * Ideal para manejar clases condicionales sin duplicaciones ni conflictos.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
