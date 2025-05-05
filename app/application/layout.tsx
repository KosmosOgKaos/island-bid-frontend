'use client'

import { ReactNode, Suspense } from 'react'

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode
}) {
  return <Suspense>{children}</Suspense>
}
