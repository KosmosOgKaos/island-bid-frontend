'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface NameContextType {
  name: string | null
  setName: (name: string) => void
}

const NameContext = createContext<NameContextType | undefined>(undefined)

export function NameProvider({ children }: { children: ReactNode }) {
  const [name, setNameState] = useState<string | null>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('name')
    }
    return null
  })

  // Update localStorage when name changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (name) {
        localStorage.setItem('name', name)
      } else {
        localStorage.removeItem('name')
      }
    }
  }, [name])

  const setName = (newName: string) => {
    setNameState(newName)
  }

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  )
}

export function useName() {
  const context = useContext(NameContext)
  if (context === undefined) {
    throw new Error('useName must be used within a NameProvider')
  }
  return context
} 