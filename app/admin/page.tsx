// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface League {
  id: number;
  name: string;
  slug: string;
  allowsDraws: boolean;
  isActive: boolean;
}

interface Gameweek {
  id: number;
  weekNumber: number;
  name: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  isActive: boolean;
  isClosed: boolean;
  isFinished: boolean;
  seasonName?: string;
  leagueName?: string;
}

export default function AdminDashboard() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [gameweeks, setGameweeks] = useState<Gameweek[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leaguesRes, gameweeksRes] = await Promise.all([
        fetch('/api/leagues'),
        fetch('/api/gameweeks'),
      ]);

      const leaguesData = await leaguesRes.json();
      const gameweeksData = await gameweeksRes.json();

      setLeagues(leaguesData);
      setGameweeks(gameweeksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage leagues, gameweeks, and matches for the sports prediction platform.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/gameweeks/new"
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg shadow-sm transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Create New Gameweek</h3>
            <p className="text-blue-100">Add a new week of matches for users to predict</p>
          </Link>

          <Link
            href="/admin/leagues/new"
            className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg shadow-sm transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Manage Leagues</h3>
            <p className="text-green-100">Add or edit league configurations</p>
          </Link>

          <Link
            href="/admin/matches"
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg shadow-sm transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">Update Results</h3>
            <p className="text-purple-100">Enter match results and close gameweeks</p>
          </Link>
        </div>

        {/* Current Leagues */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Leagues</h2>
          </div>
          <div className="p-6">
            {leagues.length === 0 ? (
              <p className="text-gray-500">No leagues found. Create your first league.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leagues.map((league) => (
                  <div
                    key={league.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{league.name}</h3>
                        <p className="text-sm text-gray-500">Slug: {league.slug}</p>
                        <p className="text-sm text-gray-500">
                          Allows draws: {league.allowsDraws ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          league.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {league.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Gameweeks */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Gameweeks</h2>
          </div>
          <div className="p-6">
            {gameweeks.length === 0 ? (
              <p className="text-gray-500">No gameweeks found. Create your first gameweek.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Week
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        League
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {gameweeks.slice(0, 10).map((gameweek) => (
                      <tr key={gameweek.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {gameweek.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {gameweek.leagueName || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(gameweek.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {gameweek.isActive && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            )}
                            {gameweek.isClosed && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Closed
                              </span>
                            )}
                            {gameweek.isFinished && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                Finished
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            href={`/admin/gameweeks/${gameweek.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
