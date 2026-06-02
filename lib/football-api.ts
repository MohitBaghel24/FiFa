export interface TeamInfo {
  id: number;
  name: string;
  logo: string;
}

export interface Match {
  id: number;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  homeScore: number | null;
  awayScore: number | null;
  minute: number | string | null;
  status: string; // e.g., '1H', '2H', 'HT', 'FT', 'NS' (Not Started)
  competition: string;
  date: string;
}

export interface Group {
  group: string;
  rank: number;
  team: TeamInfo;
  points: number;
  goalsDiff: number;
  played: number;
  win: number;
  draw: number;
  lose: number;
}

export interface Stat {
  type: string; // e.g., 'Ball Possession', 'Total Shots'
  value: string | number | null;
}

export interface MatchStats {
  homeTeam: Stat[];
  awayTeam: Stat[];
}

export interface Player {
  id: number;
  name: string;
  photo: string;
  team: TeamInfo;
  goals: number;
  assists: number;
}

const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || process.env.FOOTBALL_API_KEY || '';
const BASE_URL = 'https://v3.football.api-sports.io';
const LEAGUE_ID = 1; // FIFA World Cup
const SEASON = 2026;

const HEADERS = {
  'x-apisports-key': API_KEY,
  'x-rapidapi-host': 'v3.football.api-sports.io',
};

// ==========================================
// MOCK FALLBACK DATA
// ==========================================

const MOCK_LIVE_MATCHES: Match[] = [
  {
    id: 1001,
    homeTeam: { id: 6, name: 'Brazil', logo: 'https://media.api-sports.io/football/teams/6.png' },
    awayTeam: { id: 26, name: 'Argentina', logo: 'https://media.api-sports.io/football/teams/26.png' },
    homeScore: 2,
    awayScore: 1,
    minute: 74,
    status: '2H',
    competition: 'FIFA World Cup 2026',
    date: new Date().toISOString(),
  },
  {
    id: 1002,
    homeTeam: { id: 77, name: 'France', logo: 'https://media.api-sports.io/football/teams/77.png' },
    awayTeam: { id: 10, name: 'England', logo: 'https://media.api-sports.io/football/teams/10.png' },
    homeScore: 0,
    awayScore: 0,
    minute: 23,
    status: '1H',
    competition: 'FIFA World Cup 2026',
    date: new Date().toISOString(),
  },
  {
    id: 1003,
    homeTeam: { id: 9, name: 'Spain', logo: 'https://media.api-sports.io/football/teams/9.png' },
    awayTeam: { id: 25, name: 'Germany', logo: 'https://media.api-sports.io/football/teams/25.png' },
    homeScore: null,
    awayScore: null,
    minute: null,
    status: 'NS',
    competition: 'FIFA World Cup 2026',
    // Scheduled for tomorrow
    date: new Date(Date.now() + 86400000).toISOString(),
  }
];

// Helper to handle API fetching
async function fetchApi(endpoint: string) {
  if (!API_KEY) {
    console.warn('Missing FOOTBALL_API_KEY. Falling back to mock data.');
    throw new Error('Missing API Key');
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: HEADERS,
    // Add revalidate or cache headers based on Next.js 14 conventions if needed
    next: { revalidate: 60 } // cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(`API Response Error: ${JSON.stringify(data.errors)}`);
  }

  return data.response;
}

// ==========================================
// API FUNCTIONS
// ==========================================

export async function getLiveMatches(): Promise<Match[]> {
  try {
    const rawMatches = await fetchApi(`/fixtures?live=all&league=${LEAGUE_ID}&season=${SEASON}`);
    
    if (!rawMatches || rawMatches.length === 0) {
      return MOCK_LIVE_MATCHES.filter(m => m.status !== 'NS'); // Return only live mocks
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rawMatches.map((m: any) => ({
      id: m.fixture.id,
      homeTeam: { id: m.teams.home.id, name: m.teams.home.name, logo: m.teams.home.logo },
      awayTeam: { id: m.teams.away.id, name: m.teams.away.name, logo: m.teams.away.logo },
      homeScore: m.goals.home,
      awayScore: m.goals.away,
      minute: m.fixture.status.elapsed,
      status: m.fixture.status.short,
      competition: m.league.name,
      date: m.fixture.date,
    }));
  } catch (error) {
    console.error('getLiveMatches failed:', error);
    return MOCK_LIVE_MATCHES.filter(m => m.status !== 'NS');
  }
}

export async function getTodayFixtures(): Promise<Match[]> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const rawMatches = await fetchApi(`/fixtures?date=${today}&league=${LEAGUE_ID}&season=${SEASON}`);
    
    if (!rawMatches || rawMatches.length === 0) {
      return MOCK_LIVE_MATCHES;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rawMatches.map((m: any) => ({
      id: m.fixture.id,
      homeTeam: { id: m.teams.home.id, name: m.teams.home.name, logo: m.teams.home.logo },
      awayTeam: { id: m.teams.away.id, name: m.teams.away.name, logo: m.teams.away.logo },
      homeScore: m.goals.home,
      awayScore: m.goals.away,
      minute: m.fixture.status.elapsed,
      status: m.fixture.status.short,
      competition: m.league.name,
      date: m.fixture.date,
    }));
  } catch (error) {
    console.error('getTodayFixtures failed:', error);
    return MOCK_LIVE_MATCHES;
  }
}

export async function getStandings(): Promise<Group[]> {
  try {
    const rawData = await fetchApi(`/standings?league=${LEAGUE_ID}&season=${SEASON}`);
    
    if (!rawData || rawData.length === 0) {
      return [];
    }

    const standings = rawData[0].league.standings;
    const groups: Group[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    standings.forEach((groupArray: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      groupArray.forEach((teamEntry: any) => {
        groups.push({
          group: teamEntry.group,
          rank: teamEntry.rank,
          team: { id: teamEntry.team.id, name: teamEntry.team.name, logo: teamEntry.team.logo },
          points: teamEntry.points,
          goalsDiff: teamEntry.goalsDiff,
          played: teamEntry.all.played,
          win: teamEntry.all.win,
          draw: teamEntry.all.draw,
          lose: teamEntry.all.lose,
        });
      });
    });

    return groups;
  } catch (error) {
    console.error('getStandings failed:', error);
    return [];
  }
}

export async function getMatchStats(fixtureId: number): Promise<MatchStats> {
  try {
    const rawStats = await fetchApi(`/fixtures/statistics?fixture=${fixtureId}`);
    
    if (!rawStats || rawStats.length < 2) {
      return { homeTeam: [], awayTeam: [] };
    }

    // Returns: possession, shots, corners, fouls for both teams
    const extractKeys = ['Ball Possession', 'Total Shots', 'Corner Kicks', 'Fouls'];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filterStats = (teamStats: any[]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return teamStats.filter((s: any) => extractKeys.includes(s.type)).map((s: any) => ({
        type: s.type,
        value: s.value
      }));
    };

    return {
      homeTeam: filterStats(rawStats[0].statistics),
      awayTeam: filterStats(rawStats[1].statistics),
    };
  } catch (error) {
    console.error('getMatchStats failed:', error);
    return {
      homeTeam: [
        { type: 'Ball Possession', value: '55%' },
        { type: 'Total Shots', value: 12 },
        { type: 'Corner Kicks', value: 5 },
        { type: 'Fouls', value: 8 }
      ],
      awayTeam: [
        { type: 'Ball Possession', value: '45%' },
        { type: 'Total Shots', value: 9 },
        { type: 'Corner Kicks', value: 3 },
        { type: 'Fouls', value: 11 }
      ]
    };
  }
}

export async function getTopScorers(): Promise<Player[]> {
  try {
    const rawData = await fetchApi(`/players/topscorers?league=${LEAGUE_ID}&season=${SEASON}`);
    
    if (!rawData || rawData.length === 0) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return rawData.map((p: any) => ({
      id: p.player.id,
      name: p.player.name,
      photo: p.player.photo,
      team: { id: p.statistics[0].team.id, name: p.statistics[0].team.name, logo: p.statistics[0].team.logo },
      goals: p.statistics[0].goals.total,
      assists: p.statistics[0].goals.assists || 0,
    }));
  } catch (error) {
    console.error('getTopScorers failed:', error);
    return [];
  }
}
