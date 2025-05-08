'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

interface SsnContextType {
  ssn: string | null
  setSsn: (ssn: string) => void
}

const SsnContext = createContext<SsnContextType | undefined>(undefined)

export function SsnProvider({ children }: { children: ReactNode }) {
  const [ssn, setSsnState] = useState<string | null>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ssn')
    }
    return null
  })

  // Update localStorage when ssn changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (ssn) {
        localStorage.setItem('ssn', ssn)
      } else {
        localStorage.removeItem('ssn')
      }
    }
  }, [ssn])

  const setSsn = (newSsn: string) => {
    setSsnState(newSsn)
  }

  return (
    <SsnContext.Provider value={{ ssn, setSsn }}>
      {children}
    </SsnContext.Provider>
  )
}

export function useSsn() {
  const context = useContext(SsnContext)
  if (context === undefined) {
    throw new Error('useSsn must be used within a SsnProvider')
  }
  return context
}
