'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { NFLGame } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  formatTimeUntilStart,
  getGameStatusColor,
  arePicksLocked,
} from '@/lib/utils/game-utils'
import { Clock, Lock, TrendingUp } from 'lucide-react'

interface GameCardProps {
  game: NFLGame
  selectedTeamId?: string
  onSelectTeam: (teamId: string) => void
  disabled?: boolean
}

export function GameCard({
  game,
  selectedTeamId,
  onSelectTeam,
  disabled = false,
}: GameCardProps) {
  const [timeUntilStart, setTimeUntilStart] = useState(formatTimeUntilStart(game))
  const isLocked = arePicksLocked(game)
  const isDisabled = disabled || isLocked

  // Update countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilStart(formatTimeUntilStart(game))
    }, 60000)

    return () => clearInterval(interval)
  }, [game])

  const TeamButton = ({ isHome }: { isHome: boolean }) => {
    const team = isHome ? game.homeTeam : game.awayTeam
    const isSelected = selectedTeamId === team.id
    const canSelect = !isDisabled
    const pickPercentage = isHome ? game.homePickPercentage : game.awayPickPercentage
    const isFavorite = pickPercentage && pickPercentage > 50

    // Format W-L-T record
    const record = team.wins !== undefined 
      ? `${team.wins}-${team.losses || 0}${team.ties ? `-${team.ties}` : ''}`
      : ''

    return (
      <button
        onClick={() => canSelect && onSelectTeam(team.id)}
        disabled={isDisabled}
        className={cn(
          'flex-1 flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all',
          'hover:shadow-md relative',
          isSelected
            ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary ring-offset-2'
            : 'border-border bg-card',
          isDisabled
            ? 'opacity-60 cursor-not-allowed'
            : 'cursor-pointer hover:border-primary/50'
        )}
      >
        {/* Selection Checkmark */}
        {isSelected && (
          <div className="absolute top-2 right-2">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <svg
                className="w-3 h-3 text-primary-foreground"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}

        {/* Team Logo - Smaller */}
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={team.logo || '/svg/default-team.svg'}
            alt={`${team.city} ${team.name}`}
            fill
            className="object-contain"
          />
        </div>

        {/* Team Info - More Compact */}
        <div className="text-center w-full">
          <div className="font-bold text-xs leading-tight">{team.city}</div>
          <div className="text-xs text-muted-foreground">{team.name}</div>
          {record && (
            <div className="text-xs text-muted-foreground mt-0.5 font-medium">
              {record}
            </div>
          )}
        </div>

        {/* Pick Percentage - More Compact */}
        {pickPercentage !== undefined && (
          <div className="w-full mt-0.5 pt-0.5 border-t">
            <div className="flex items-center justify-center gap-0.5 text-xs">
              {isFavorite && <TrendingUp className="w-3 h-3 text-primary" />}
              <span className={cn(
                'font-semibold text-xs',
                isFavorite ? 'text-primary' : 'text-muted-foreground'
              )}>
                {pickPercentage}%
              </span>
            </div>
          </div>
        )}
      </button>
    )
  }

  return (
    <div className="w-full">
      {/* Game Header - Compact */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {/* Lock Status */}
          {isLocked && (
            <Badge variant="destructive" className="text-xs">
              <Lock className="w-3 h-3 mr-1" />
              Locked
            </Badge>
          )}
        </div>
      </div>

      {/* Teams - Side by Side - More Horizontal */}
      <div className="flex items-center gap-2">
        <TeamButton isHome={false} />
        
        <div className="flex flex-col items-center gap-0.5 text-muted-foreground flex-shrink-0">
          <div className="text-xs">VS</div>
        </div>

        <TeamButton isHome={true} />
      </div>
    </div>
  )
}
