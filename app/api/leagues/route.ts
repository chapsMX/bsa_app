// app/api/leagues/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db, leagues } from '@/lib/db';

export async function GET() {
  try {
    const leaguesData = await db.select().from(leagues);
    return NextResponse.json(leaguesData);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    return NextResponse.json({ error: 'Failed to fetch leagues' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, allowsDraws = false, isActive = true } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const newLeague = await db.insert(leagues).values({
      name,
      slug,
      allowsDraws,
      isActive,
      createdBy: 1, // TODO: Get from auth context
      updatedBy: 1,
    }).returning();

    return NextResponse.json(newLeague[0], { status: 201 });
  } catch (error) {
    console.error('Error creating league:', error);
    return NextResponse.json({ error: 'Failed to create league' }, { status: 500 });
  }
}
