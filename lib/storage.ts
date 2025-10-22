import type { Entry, LeaderboardEntry } from './types'

/**
 * Local Storage Keys
 */
const STORAGE_KEYS = {
  ENTRIES: 'basearena_entries',
  CURRENT_PICKS: 'basearena_current_picks',
  LEADERBOARD: 'basearena_leaderboard',
} as const

/**
 * Get all entries from local storage
 */
export function getEntries(): Entry[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ENTRIES)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error loading entries:', error)
    return []
  }
}

/**
 * Get entries for a specific wallet address
 */
export function getEntriesByWallet(walletAddress: string): Entry[] {
  return getEntries().filter(
    (entry) => entry.walletAddress.toLowerCase() === walletAddress.toLowerCase()
  )
}

/**
 * Get entry for a specific week and wallet
 */
export function getEntryByWeekAndWallet(
  week: number,
  season: number,
  walletAddress: string
): Entry | undefined {
  return getEntries().find(
    (entry) =>
      entry.week === week &&
      entry.season === season &&
      entry.walletAddress.toLowerCase() === walletAddress.toLowerCase()
  )
}

/**
 * Save an entry to local storage
 */
export function saveEntry(entry: Entry): void {
  if (typeof window === 'undefined') return
  
  try {
    const entries = getEntries()
    
    // Check if entry already exists (by id)
    const existingIndex = entries.findIndex((e) => e.id === entry.id)
    
    if (existingIndex >= 0) {
      // Update existing entry
      entries[existingIndex] = entry
    } else {
      // Add new entry
      entries.push(entry)
    }
    
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries))
  } catch (error) {
    console.error('Error saving entry:', error)
    throw new Error('Failed to save entry')
  }
}

/**
 * Delete an entry
 */
export function deleteEntry(entryId: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const entries = getEntries()
    const filtered = entries.filter((e) => e.id !== entryId)
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting entry:', error)
  }
}

/**
 * Get current picks (draft state before submission)
 */
export function getCurrentPicks(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_PICKS)
    return data ? JSON.parse(data) : {}
  } catch (error) {
    console.error('Error loading current picks:', error)
    return {}
  }
}

/**
 * Save current picks (draft state)
 */
export function saveCurrentPicks(picks: Record<string, string>): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_PICKS, JSON.stringify(picks))
  } catch (error) {
    console.error('Error saving current picks:', error)
  }
}

/**
 * Clear current picks (after submission)
 */
export function clearCurrentPicks(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_PICKS)
  } catch (error) {
    console.error('Error clearing current picks:', error)
  }
}

/**
 * Get simulated leaderboard data
 */
export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
    return data ? JSON.parse(data) : generateMockLeaderboard()
  } catch (error) {
    console.error('Error loading leaderboard:', error)
    return generateMockLeaderboard()
  }
}

/**
 * Generate mock leaderboard data
 */
function generateMockLeaderboard(): LeaderboardEntry[] {
  const mockData: LeaderboardEntry[] = [
    {
      rank: 1,
      walletAddress: '0x1234...5678',
      basename: 'sportsfan.base.eth',
      correctPicks: 14,
      totalPicks: 14,
      potentialWinnings: 2500,
    },
    {
      rank: 2,
      walletAddress: '0xabcd...ef01',
      basename: 'nflking.base.eth',
      correctPicks: 13,
      totalPicks: 14,
      potentialWinnings: 1500,
    },
    {
      rank: 3,
      walletAddress: '0x9876...5432',
      correctPicks: 13,
      totalPicks: 14,
      potentialWinnings: 1000,
    },
    {
      rank: 4,
      walletAddress: '0xdef0...1234',
      basename: 'pickmaster.base.eth',
      correctPicks: 12,
      totalPicks: 14,
      potentialWinnings: 500,
    },
    {
      rank: 5,
      walletAddress: '0x5555...9999',
      correctPicks: 12,
      totalPicks: 14,
      potentialWinnings: 250,
    },
  ]
  
  // Save to localStorage for consistency
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(mockData))
  }
  
  return mockData
}

/**
 * Clear all data (for testing)
 */
export function clearAllData(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(STORAGE_KEYS.ENTRIES)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_PICKS)
    localStorage.removeItem(STORAGE_KEYS.LEADERBOARD)
  } catch (error) {
    console.error('Error clearing data:', error)
  }
}
