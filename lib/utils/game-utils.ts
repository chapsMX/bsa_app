import type { NFLGame, GameStatus } from '../types'

/**
 * Check if a game has started (is live or final)
 */
export function hasGameStarted(game: NFLGame): boolean {
  return game.status === 'live' || game.status === 'final'
}

/**
 * Check if picks are locked for a game
 */
export function arePicksLocked(game: NFLGame): boolean {
  return hasGameStarted(game)
}

/**
 * Get time until game starts (in milliseconds)
 */
export function getTimeUntilStart(game: NFLGame): number {
  const gameTime = new Date(game.scheduledTime).getTime()
  const now = Date.now()
  return Math.max(0, gameTime - now)
}

/**
 * Format time until game starts as human-readable string
 */
export function formatTimeUntilStart(game: NFLGame): string {
  const ms = getTimeUntilStart(game)
  
  if (ms === 0 || hasGameStarted(game)) {
    return game.status === 'live' ? 'Live Now' : 'Final'
  }
  
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return `${days}d ${hours % 24}h`
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  
  return `${minutes}m`
}

/**
 * Get game status badge color
 */
export function getGameStatusColor(status: GameStatus): string {
  switch (status) {
    case 'upcoming':
      return 'bg-muted text-muted-foreground'
    case 'live':
      return 'bg-destructive text-destructive-foreground'
    case 'final':
      return 'bg-primary text-primary-foreground'
  }
}

/**
 * Sort games by scheduled time
 */
export function sortGamesByTime(games: NFLGame[]): NFLGame[] {
  return [...games].sort((a, b) => {
    const timeA = new Date(a.scheduledTime).getTime()
    const timeB = new Date(b.scheduledTime).getTime()
    return timeA - timeB
  })
}

/**
 * Get the earliest game time from a list of games
 */
export function getEarliestGameTime(games: NFLGame[]): Date | null {
  if (games.length === 0) return null
  
  const sorted = sortGamesByTime(games)
  return new Date(sorted[0].scheduledTime)
}

/**
 * Check if all games have started
 */
export function haveAllGamesStarted(games: NFLGame[]): boolean {
  return games.every(hasGameStarted)
}

/**
 * Get completion percentage of games
 */
export function getGamesCompletionPercentage(games: NFLGame[]): number {
  if (games.length === 0) return 0
  
  const completedGames = games.filter((g) => g.status === 'final').length
  return Math.round((completedGames / games.length) * 100)
}

/**
 * Group games by day of the week
 */
export function groupGamesByDay(games: NFLGame[]): Record<string, NFLGame[]> {
  const groups: Record<string, NFLGame[]> = {
    'Thursday': [],
    'Sunday': [],
    'Monday': []
  }

  games.forEach(game => {
    const date = new Date(game.scheduledTime)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
    
    if (groups[dayOfWeek]) {
      groups[dayOfWeek].push(game)
    }
  })

  return groups
}
