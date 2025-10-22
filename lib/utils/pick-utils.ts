import type { Pick, Entry, NFLGame } from '../types'

/**
 * Calculate the number of correct picks in an entry
 */
export function calculateCorrectPicks(
  entry: Entry,
  games: NFLGame[]
): number {
  let correct = 0
  
  for (const pick of entry.picks) {
    const game = games.find((g) => g.id === pick.gameId)
    
    if (!game || game.status !== 'final') {
      // Game not final yet, skip
      continue
    }
    
    // Determine winner
    const winner = getGameWinner(game)
    
    if (winner && winner === pick.selectedTeamId) {
      correct++
    }
  }
  
  return correct
}

/**
 * Get the winner of a game (if final)
 */
export function getGameWinner(game: NFLGame): string | null {
  if (game.status !== 'final' || game.homeScore === undefined || game.awayScore === undefined) {
    return null
  }
  
  if (game.homeScore > game.awayScore) {
    return game.homeTeam.id
  }
  
  if (game.awayScore > game.homeScore) {
    return game.awayTeam.id
  }
  
  // Tie (unlikely in NFL, but possible)
  return null
}

/**
 * Validate picks before submission
 */
export function validatePicks(
  picks: Pick[],
  games: NFLGame[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check if all games have picks
  if (picks.length < games.length) {
    errors.push(`You must make picks for all ${games.length} games`)
  }
  
  // Check for duplicate game picks
  const gameIds = picks.map((p) => p.gameId)
  const uniqueGameIds = new Set(gameIds)
  
  if (gameIds.length !== uniqueGameIds.size) {
    errors.push('Duplicate picks detected')
  }
  
  // Check if picks are for valid games
  for (const pick of picks) {
    const game = games.find((g) => g.id === pick.gameId)
    
    if (!game) {
      errors.push(`Invalid game ID: ${pick.gameId}`)
      continue
    }
    
    // Check if game has started
    if (game.status !== 'upcoming') {
      errors.push(`Game ${game.homeTeam.name} vs ${game.awayTeam.name} has already started`)
    }
    
    // Check if selected team is valid
    const isValidTeam =
      pick.selectedTeamId === game.homeTeam.id ||
      pick.selectedTeamId === game.awayTeam.id
    
    if (!isValidTeam) {
      errors.push(`Invalid team selection for game: ${pick.gameId}`)
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Generate a unique entry ID
 */
export function generateEntryId(
  walletAddress: string,
  week: number,
  season: number
): string {
  const timestamp = Date.now()
  return `entry-${season}-w${week}-${walletAddress.slice(2, 8)}-${timestamp}`
}

/**
 * Calculate pick accuracy percentage
 */
export function calculatePickAccuracy(correctPicks: number, totalPicks: number): number {
  if (totalPicks === 0) return 0
  return Math.round((correctPicks / totalPicks) * 100)
}

/**
 * Get pick status color
 */
export function getPickStatusColor(
  pick: Pick,
  game: NFLGame
): 'correct' | 'incorrect' | 'pending' {
  if (game.status !== 'final') {
    return 'pending'
  }
  
  const winner = getGameWinner(game)
  
  if (!winner) {
    return 'pending'
  }
  
  return winner === pick.selectedTeamId ? 'correct' : 'incorrect'
}
