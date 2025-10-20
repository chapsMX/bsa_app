// app/api/teams/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, teams } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leagueId = searchParams.get('leagueId');

    let teamsData;
    if (leagueId) {
      teamsData = await db
        .select()
        .from(teams)
        .where(eq(teams.leagueId, parseInt(leagueId)));
    } else {
      teamsData = await db.select().from(teams);
    }

    return NextResponse.json(teamsData);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leagueId, name, shortName, city } = body;

    if (!leagueId || !name) {
      return NextResponse.json({ error: 'leagueId and name are required' }, { status: 400 });
    }

    const newTeam = await db.insert(teams).values({
      leagueId,
      name,
      shortName,
      city,
      createdBy: 1, // TODO: Get from auth context
      updatedBy: 1,
    }).returning();

    return NextResponse.json(newTeam[0], { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
