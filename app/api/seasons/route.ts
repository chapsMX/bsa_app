// app/api/seasons/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, seasons, leagues } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const seasonsData = await db
      .select({
        id: seasons.id,
        leagueId: seasons.leagueId,
        name: seasons.name,
        year: seasons.year,
        startDate: seasons.startDate,
        endDate: seasons.endDate,
        isActive: seasons.isActive,
        createdAt: seasons.createdAt,
        updatedAt: seasons.updatedAt,
        leagueName: leagues.name,
      })
      .from(seasons)
      .leftJoin(leagues, eq(seasons.leagueId, leagues.id));

    return NextResponse.json(seasonsData);
  } catch (error) {
    console.error('Error fetching seasons:', error);
    return NextResponse.json({ error: 'Failed to fetch seasons' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leagueId, name, year, startDate, endDate } = body;

    if (!leagueId || !name || !year) {
      return NextResponse.json({ 
        error: 'leagueId, name, and year are required' 
      }, { status: 400 });
    }

    const newSeason = await db.insert(seasons).values({
      leagueId,
      name,
      year,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      createdBy: 1, // TODO: Get from auth context
      updatedBy: 1,
    }).returning();

    return NextResponse.json(newSeason[0], { status: 201 });
  } catch (error) {
    console.error('Error creating season:', error);
    return NextResponse.json({ error: 'Failed to create season' }, { status: 500 });
  }
}
