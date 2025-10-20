// app/api/gameweeks/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, gameweeks, matches, teams, pools } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameweekId = parseInt(id);

    // Get gameweek details
    const gameweek = await db
      .select()
      .from(gameweeks)
      .where(eq(gameweeks.id, gameweekId))
      .limit(1);

    if (!gameweek[0]) {
      return NextResponse.json({ error: 'Gameweek not found' }, { status: 404 });
    }

    // Get matches for this gameweek
    const matchesData = await db
      .select({
        id: matches.id,
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
      .where(eq(matches.gameweekId, gameweekId));

    // Get pool for this gameweek
    const pool = await db
      .select()
      .from(pools)
      .where(eq(pools.gameweekId, gameweekId))
      .limit(1);

    return NextResponse.json({
      gameweek: gameweek[0],
      matches: matchesData,
      pool: pool[0] || null,
    });
  } catch (error) {
    console.error('Error fetching gameweek:', error);
    return NextResponse.json({ error: 'Failed to fetch gameweek' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const gameweekId = parseInt(id);
    const body = await request.json();

    const updatedGameweek = await db
      .update(gameweeks)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(gameweeks.id, gameweekId))
      .returning();

    if (!updatedGameweek[0]) {
      return NextResponse.json({ error: 'Gameweek not found' }, { status: 404 });
    }

    return NextResponse.json(updatedGameweek[0]);
  } catch (error) {
    console.error('Error updating gameweek:', error);
    return NextResponse.json({ error: 'Failed to update gameweek' }, { status: 500 });
  }
}
