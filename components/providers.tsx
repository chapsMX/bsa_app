"use client"

import { RootProvider } from "../app/rootProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider>
      {children}
    </RootProvider>
  )
}