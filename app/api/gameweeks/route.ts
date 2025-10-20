// app/api/gameweeks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, gameweeks, seasons, leagues } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const gameweeksData = await db
      .select({
        id: gameweeks.id,
        weekNumber: gameweeks.weekNumber,
        name: gameweeks.name,
        startDate: gameweeks.startDate,
        endDate: gameweeks.endDate,
        registrationDeadline: gameweeks.registrationDeadline,
        isActive: gameweeks.isActive,
        isClosed: gameweeks.isClosed,
        isFinished: gameweeks.isFinished,
        seasonName: seasons.name,
        leagueName: leagues.name,
      })
      .from(gameweeks)
      .leftJoin(seasons, eq(gameweeks.seasonId, seasons.id))
      .leftJoin(leagues, eq(seasons.leagueId, leagues.id));

    return NextResponse.json(gameweeksData);
  } catch (error) {
    console.error('Error fetching gameweeks:', error);
    return NextResponse.json({ error: 'Failed to fetch gameweeks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      seasonId, 
      weekNumber, 
      name, 
      startDate, 
      endDate, 
      registrationDeadline 
    } = body;

    if (!seasonId || !weekNumber || !name || !startDate || !endDate || !registrationDeadline) {
      return NextResponse.json({ 
        error: 'seasonId, weekNumber, name, startDate, endDate, and registrationDeadline are required' 
      }, { status: 400 });
    }

    const newGameweek = await db.insert(gameweeks).values({
      seasonId,
      weekNumber,
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      registrationDeadline: new Date(registrationDeadline),
      createdBy: 1, // TODO: Get from auth context
      updatedBy: 1,
    }).returning();

    return NextResponse.json(newGameweek[0], { status: 201 });
  } catch (error) {
    console.error('Error creating gameweek:', error);
    return NextResponse.json({ error: 'Failed to create gameweek' }, { status: 500 });
  }
}
