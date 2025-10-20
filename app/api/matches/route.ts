// app/api/matches/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, matches, teams } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      gameweekId, 
      homeTeamId, 
      awayTeamId, 
      scheduledAt,
      status = 'scheduled'
    } = body;

    if (!gameweekId || !homeTeamId || !awayTeamId || !scheduledAt) {
      return NextResponse.json({ 
        error: 'gameweekId, homeTeamId, awayTeamId, and scheduledAt are required' 
      }, { status: 400 });
    }

    const newMatch = await db.insert(matches).values({
      gameweekId,
      homeTeamId,
      awayTeamId,
      scheduledAt: new Date(scheduledAt),
      status,
      createdBy: 1, // TODO: Get from auth context
      updatedBy: 1,
    }).returning();

    return NextResponse.json(newMatch[0], { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gameweekId = searchParams.get('gameweekId');

    if (gameweekId) {
      const matchesData = await db
        .select({
          id: matches.id,
          gameweekId: matches.gameweekId,
          scheduledAt: matches.scheduledAt,
          status: matches.status,
          homeScore: matches.homeScore,
          awayScore: matches.awayScore,
          isDraw: matches.isDraw,
          homeTeam: {
            id: teams.id,
            name: teams.name,
            shortName: teams.shortName,
          },
          awayTeam: {
            id: teams.id,
            name: teams.name,
            shortName: teams.shortName,
          },
        })
        .from(matches)
        .leftJoin(teams, eq(matches.homeTeamId, teams.id))
        .where(eq(matches.gameweekId, parseInt(gameweekId)));

      return NextResponse.json(matchesData);
    }

    return NextResponse.json({ error: 'gameweekId parameter is required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}
