'use client'

import { useAccount } from 'wagmi'

/**
 * Hook to access wallet connection state
 */
export function useWallet() {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
  }
}
