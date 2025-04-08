"use client"

import type React from "react"

// Adapted from shadcn/ui toast component
import { useState, useEffect, useCallback } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

const listeners: ((state: ToasterToast[]) => void)[] = []

let memoryState: ToasterToast[] = []

function dispatch(action: any) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

interface Action {
  type: keyof typeof actionTypes
  toast?: ToasterToast
  toastId?: string
}

function reducer(state: ToasterToast[], action: Action): ToasterToast[] {
  switch (action.type) {
    case "ADD_TOAST":
      return [
        ...state,
        {
          id: action.toast!.id,
          title: action.toast!.title,
          description: action.toast!.description,
          action: action.toast!.action,
          variant: action.toast!.variant,
        },
      ].slice(0, TOAST_LIMIT)

    case "UPDATE_TOAST":
      return state.map((t) =>
        t.id === action.toast!.id
          ? {
              ...t,
              title: action.toast!.title,
              description: action.toast!.description,
              action: action.toast!.action,
              variant: action.toast!.variant,
            }
          : t,
      )

    case "DISMISS_TOAST": {
      const toastId = action.toastId!

      // First mark as dismissed
      if (toastId) {
        return state.map((t) =>
          t.id === toastId
            ? {
                ...t,
              }
            : t,
        )
      }
      return state
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return []
      }
      return state.filter((t) => t.id !== action.toastId)
  }
}

function useToast() {
  const [state, setState] = useState<ToasterToast[]>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  const toast = useCallback(
    ({ ...props }: Omit<ToasterToast, "id">) => {
      const id = genId()

      const update = (props: ToasterToast) =>
        dispatch({
          type: "UPDATE_TOAST",
          toast: { ...props, id },
        })
      const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id,
          title: props.title,
          description: props.description,
          action: props.action,
          variant: props.variant,
        },
      })

      return {
        id,
        dismiss,
        update,
      }
    },
    [dispatch],
  )

  return {
    toast,
    toasts: state,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast }

