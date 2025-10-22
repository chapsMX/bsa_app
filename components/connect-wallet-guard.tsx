'use client'

import { type ReactNode } from 'react'
import { useWallet } from '@/hooks/use-wallet'
import { WalletButton } from './wallet-button'
import { AlertCircle } from 'lucide-react'

interface ConnectWalletGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Component that requires wallet connection to render children
 * Shows a connection prompt if wallet is not connected
 */
export function ConnectWalletGuard({
  children,
  fallback,
}: ConnectWalletGuardProps) {
  const { isConnected, isConnecting } = useWallet()

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Connecting wallet...</p>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md text-center space-y-6 p-8">
          <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
            <p className="text-muted-foreground">
              You need to connect your wallet to access this feature. Connect your Coinbase Smart Wallet or any supported wallet to get started.
            </p>
          </div>

          <div className="pt-4">
            <WalletButton />
          </div>

          <div className="pt-4 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium">Why connect a wallet?</p>
            <ul className="space-y-1 text-left list-disc list-inside">
              <li>Make your NFL picks for Week 7</li>
              <li>Enter the weekly pool with USDC</li>
              <li>Track your performance and winnings</li>
              <li>Compete on the leaderboard</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

