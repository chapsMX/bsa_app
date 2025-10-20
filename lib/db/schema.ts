// lib/db/schema.ts
import { pgTable, serial, varchar, timestamp, boolean, integer, decimal, jsonb, unique, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Leagues table
export const leagues = pgTable('leagues', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 50 }).unique().notNull(),
  logoImage: text('logo_image'), // Will store base64 or URL
  allowsDraws: boolean('allows_draws').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdBy: integer('created_by'),
  updatedBy: integer('updated_by'),
});

// 2. Seasons table
export const seasons = pgTable('seasons', {
  id: serial('id').primaryKey(),
  leagueId: integer('league_id').references(() => leagues.id),
  name: varchar('name', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdBy: integer('created_by'),
  updatedBy: integer('updated_by'),
});

// 3. Gameweeks table
export const gameweeks = pgTable('gameweeks', {
  id: serial('id').primaryKey(),
  seasonId: integer('season_id').references(() => seasons.id),
  weekNumber: integer('week_number').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  registrationDeadline: timestamp('registration_deadline').notNull(),
  isActive: boolean('is_active').default(false),
  isClosed: boolean('is_closed').default(false),
  isFinished: boolean('is_finished').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdBy: integer('created_by'),
  updatedBy: integer('updated_by'),
});

// 4. Teams table
export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  leagueId: integer('league_id').references(() => leagues.id),
  name: varchar('name', { length: 100 }).notNull(),
  shortName: varchar('short_name', { length: 10 }),
  logoImage: text('logo_image'), // Will store base64 or URL
  city: varchar('city', { length: 100 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdBy: integer('created_by'),
  updatedBy: integer('updated_by'),
});

// 5. Matches table
export const matches = pgTable('matches', {
  id: serial('id').primaryKey(),
  gameweekId: integer('gameweek_id').references(() => gameweeks.id),
  homeTeamId: integer('home_team_id').references(() => teams.id),
  awayTeamId: integer('away_team_id').references(() => teams.id),
  scheduledAt: timestamp('scheduled_at').notNull(),
  status: varchar('status', { length: 20 }).default('scheduled'),
  homeScore: integer('home_score'),
  awayScore: integer('away_score'),
  winnerTeamId: integer('winner_team_id').references(() => teams.id),
  isDraw: boolean('is_draw').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdBy: integer('created_by'),
  updatedBy: integer('updated_by'),
});

// 6. Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  walletAddress: varchar('wallet_address', { length: 42 }).unique().notNull(),
  username: varchar('username', { length: 50 }).unique(),
  avatarImage: text('avatar_image'), // Will store base64 or URL
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 7. Pools table
export const pools = pgTable('pools', {
  id: serial('id').primaryKey(),
  gameweekId: integer('gameweek_id').references(() => gameweeks.id),
  costUsdc: decimal('cost_usdc', { precision: 10, scale: 2 }).notNull(),
  prizeFundUsdc: decimal('prize_fund_usdc', { precision: 15, scale: 2 }).default('0'),
  participantsCount: integer('participants_count').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdBy: integer('created_by'),
  updatedBy: integer('updated_by'),
});

// 8. Participations table
export const participations = pgTable('participations', {
  id: serial('id').primaryKey(),
  poolId: integer('pool_id').references(() => pools.id),
  userId: integer('user_id').references(() => users.id),
  walletAddress: varchar('wallet_address', { length: 42 }).notNull(),
  picks: jsonb('picks').notNull(),
  picksTimestamp: timestamp('picks_timestamp').defaultNow(),
  txHash: varchar('tx_hash', { length: 66 }),
  paidUsdc: decimal('paid_usdc', { precision: 10, scale: 2 }).notNull(),
  paidEthFee: decimal('paid_eth_fee', { precision: 18, scale: 8 }).notNull(),
  isValidated: boolean('is_validated').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 9. Participation Results table
export const participationResults = pgTable('participation_results', {
  id: serial('id').primaryKey(),
  participationId: integer('participation_id').references(() => participations.id),
  correctPicks: integer('correct_picks').default(0),
  totalPicks: integer('total_picks').notNull(),
  accuracy: decimal('accuracy', { precision: 5, scale: 2 }),
  rankingPosition: integer('ranking_position'),
  prizeAmountUsdc: decimal('prize_amount_usdc', { precision: 15, scale: 2 }).default('0'),
  claimed: boolean('claimed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const leaguesRelations = relations(leagues, ({ many }) => ({
  seasons: many(seasons),
  teams: many(teams),
}));

export const seasonsRelations = relations(seasons, ({ one, many }) => ({
  league: one(leagues, {
    fields: [seasons.leagueId],
    references: [leagues.id],
  }),
  gameweeks: many(gameweeks),
}));

export const gameweeksRelations = relations(gameweeks, ({ one, many }) => ({
  season: one(seasons, {
    fields: [gameweeks.seasonId],
    references: [seasons.id],
  }),
  matches: many(matches),
  pools: many(pools),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  league: one(leagues, {
    fields: [teams.leagueId],
    references: [leagues.id],
  }),
  homeMatches: many(matches, { relationName: 'homeTeam' }),
  awayMatches: many(matches, { relationName: 'awayTeam' }),
  wonMatches: many(matches, { relationName: 'winnerTeam' }),
}));

export const matchesRelations = relations(matches, ({ one }) => ({
  gameweek: one(gameweeks, {
    fields: [matches.gameweekId],
    references: [gameweeks.id],
  }),
  homeTeam: one(teams, {
    fields: [matches.homeTeamId],
    references: [teams.id],
    relationName: 'homeTeam',
  }),
  awayTeam: one(teams, {
    fields: [matches.awayTeamId],
    references: [teams.id],
    relationName: 'awayTeam',
  }),
  winnerTeam: one(teams, {
    fields: [matches.winnerTeamId],
    references: [teams.id],
    relationName: 'winnerTeam',
  }),
}));

export const poolsRelations = relations(pools, ({ one, many }) => ({
  gameweek: one(gameweeks, {
    fields: [pools.gameweekId],
    references: [gameweeks.id],
  }),
  participations: many(participations),
}));

export const participationsRelations = relations(participations, ({ one }) => ({
  pool: one(pools, {
    fields: [participations.poolId],
    references: [pools.id],
  }),
  user: one(users, {
    fields: [participations.userId],
    references: [users.id],
  }),
  result: one(participationResults),
}));

export const participationResultsRelations = relations(participationResults, ({ one }) => ({
  participation: one(participations, {
    fields: [participationResults.participationId],
    references: [participations.id],
  }),
}));
