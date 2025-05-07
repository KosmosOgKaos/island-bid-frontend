'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SsnContextType {
  ssn: string | null
  setSsn: (ssn: string) => void
}

const SsnContext = createContext<SsnContextType | undefined>(undefined)

export function SsnProvider({ children }: { children: ReactNode }) {
  const [ssn, setSsn] = useState<string | null>(null)

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
