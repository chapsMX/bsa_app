// NFL Team Types
export type NFLTeam = {
    id: string
    name: string
    city: string
    abbreviation: string
    logo?: string // Optional logo URL or emoji
    wins?: number
    losses?: number
    ties?: number
  }
  
  // Game Status
  export type GameStatus = 'upcoming' | 'live' | 'final'
  
  // NFL Game
  export type NFLGame = {
    id: string
    week: number
    season: number
    homeTeam: NFLTeam
    awayTeam: NFLTeam
    scheduledTime: string // ISO 8601 date string
    status: GameStatus
    homeScore?: number
    awayScore?: number
    stadium?: string
    network?: string
    // Simulated pick percentages (for UI only)
    homePickPercentage?: number
    awayPickPercentage?: number
  }
  
  // User's Pick for a game
  export type Pick = {
    gameId: string
    selectedTeamId: string
    confidence?: number // Optional confidence points
  }
  
  // User's Entry (collection of picks)
  export type Entry = {
    id: string
    walletAddress: string
    week: number
    season: number
    picks: Pick[]
    submittedAt: string // ISO 8601 date string
    transactionHash?: string // For simulation
    entryFee: number // In USDC
    status: 'pending' | 'submitted' | 'scored'
    correctPicks?: number
    totalPicks: number
  }
  
  // Pool Statistics
  export type PoolStats = {
    week: number
    season: number
    totalParticipants: number
    totalPrizePool: number // In USDC
    entryFee: number // In USDC
    gamesCount: number
    lockTime?: string // ISO 8601 date string
    firstPlacePrize: number // In USDC
    secondPlacePrize: number // In USDC
    thirdPlacePrize: number // In USDC
    remainingPrize: number // In USDC (protocol incentives, referral fees, etc.)
  }
  
  // Leaderboard Entry
  export type LeaderboardEntry = {
    rank: number
    walletAddress: string
    basename?: string
    correctPicks: number
    totalPicks: number
    potentialWinnings: number // In USDC
  }
  