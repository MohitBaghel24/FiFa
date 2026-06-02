import { NextResponse } from "next/server";

const MOCK_MATCHES = [
  {
    id: 1, competition: "FIFA WORLD CUP 2026",
    homeTeam: { name: "BRA", fullName: "Brazil",
      flag: "https://flagcdn.com/w80/br.png" },
    awayTeam: { name: "ARG", fullName: "Argentina",
      flag: "https://flagcdn.com/w80/ar.png" },
    homeScore: 2, awayScore: 1, minute: 74, status: "LIVE"
  },
  {
    id: 2, competition: "FIFA WORLD CUP 2026",
    homeTeam: { name: "FRA", fullName: "France",
      flag: "https://flagcdn.com/w80/fr.png" },
    awayTeam: { name: "ENG", fullName: "England",
      flag: "https://flagcdn.com/w80/gb-eng.png" },
    homeScore: 0, awayScore: 0, minute: 23, status: "LIVE"
  },
  {
    id: 3, competition: "FIFA WORLD CUP 2026",
    homeTeam: { name: "ESP", fullName: "Spain",
      flag: "https://flagcdn.com/w80/es.png" },
    awayTeam: { name: "GER", fullName: "Germany",
      flag: "https://flagcdn.com/w80/de.png" },
    homeScore: null, awayScore: null, minute: null,
    status: "UPCOMING", kickoff: "Tomorrow 21:00 IST"
  },
  {
    id: 4, competition: "FIFA WORLD CUP 2026",
    homeTeam: { name: "POR", fullName: "Portugal",
      flag: "https://flagcdn.com/w80/pt.png" },
    awayTeam: { name: "USA", fullName: "USA",
      flag: "https://flagcdn.com/w80/us.png" },
    homeScore: 3, awayScore: 1, minute: 90, status: "FT"
  },
  {
    id: 5, competition: "FIFA WORLD CUP 2026",
    homeTeam: { name: "NED", fullName: "Netherlands",
      flag: "https://flagcdn.com/w80/nl.png" },
    awayTeam: { name: "MEX", fullName: "Mexico",
      flag: "https://flagcdn.com/w80/mx.png" },
    homeScore: null, awayScore: null, minute: null,
    status: "UPCOMING", kickoff: "Today 18:30 IST"
  },
  {
    id: 6, competition: "FIFA WORLD CUP 2026",
    homeTeam: { name: "JPN", fullName: "Japan",
      flag: "https://flagcdn.com/w80/jp.png" },
    awayTeam: { name: "MAR", fullName: "Morocco",
      flag: "https://flagcdn.com/w80/ma.png" },
    homeScore: 1, awayScore: 1, minute: 88, status: "LIVE"
  }
];

export async function GET() {
  try {
    if (!process.env.FOOTBALL_API_KEY) {
      return NextResponse.json({ matches: MOCK_MATCHES, source: "mock" });
    }

    const res = await fetch(
      "https://api.football-data.org/v4/matches?status=LIVE",
      {
        headers: { "X-Auth-Token": process.env.FOOTBALL_API_KEY },
        next: { revalidate: 30 }
      }
    );

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    if (!data.matches || data.matches.length === 0) {
      // No live matches - get today's matches instead
      const todayRes = await fetch(
        "https://api.football-data.org/v4/matches",
        { headers: { "X-Auth-Token": process.env.FOOTBALL_API_KEY } }
      );
      const todayData = await todayRes.json();

      if (!todayData.matches || todayData.matches.length === 0) {
        return NextResponse.json({ matches: MOCK_MATCHES, source: "mock" });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const todayMatches = todayData.matches.slice(0, 6).map((m: any) => ({
        id: m.id,
        competition: m.competition?.name || "Football",
        homeTeam: {
          name: m.homeTeam?.shortName || m.homeTeam?.name?.substring(0,3).toUpperCase(),
          fullName: m.homeTeam?.name,
          flag: `https://flagcdn.com/w80/${getCountryCode(m.homeTeam?.name)}.png`
        },
        awayTeam: {
          name: m.awayTeam?.shortName || m.awayTeam?.name?.substring(0,3).toUpperCase(),
          fullName: m.awayTeam?.name,
          flag: `https://flagcdn.com/w80/${getCountryCode(m.awayTeam?.name)}.png`
        },
        homeScore: m.score?.fullTime?.home,
        awayScore: m.score?.fullTime?.away,
        minute: null,
        status: m.status === "FINISHED" ? "FT" :
                m.status === "IN_PLAY" ? "LIVE" : "UPCOMING",
        kickoff: new Date(m.utcDate).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit", minute: "2-digit",
          day: "numeric", month: "short"
        })
      }));

      return NextResponse.json({ matches: todayMatches, source: "live" });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const liveMatches = data.matches.map((m: any) => ({
      id: m.id,
      competition: m.competition?.name || "Football",
      homeTeam: {
        name: m.homeTeam?.shortName || m.homeTeam?.name?.substring(0,3).toUpperCase(),
        fullName: m.homeTeam?.name,
        flag: `https://flagcdn.com/w80/${getCountryCode(m.homeTeam?.name)}.png`
      },
      awayTeam: {
        name: m.awayTeam?.shortName || m.awayTeam?.name?.substring(0,3).toUpperCase(),
        fullName: m.awayTeam?.name,
        flag: `https://flagcdn.com/w80/${getCountryCode(m.awayTeam?.name)}.png`
      },
      homeScore: m.score?.fullTime?.home ?? m.score?.halfTime?.home,
      awayScore: m.score?.fullTime?.away ?? m.score?.halfTime?.away,
      minute: m.minute || null,
      status: "LIVE"
    }));

    return NextResponse.json({ matches: liveMatches, source: "live" });

  } catch (error) {
    return NextResponse.json({ matches: MOCK_MATCHES, source: "mock" });
  }
}

// Helper to map team names to flag codes
function getCountryCode(name: string = ""): string {
  const map: Record<string, string> = {
    "Brazil": "br", "Argentina": "ar", "France": "fr",
    "England": "gb-eng", "Spain": "es", "Germany": "de",
    "Portugal": "pt", "Netherlands": "nl", "Belgium": "be",
    "Croatia": "hr", "Uruguay": "uy", "Colombia": "co",
    "Mexico": "mx", "USA": "us", "Canada": "ca",
    "Japan": "jp", "Morocco": "ma", "Senegal": "sn",
    "Ghana": "gh", "South Korea": "kr", "Australia": "au",
    "Switzerland": "ch", "Denmark": "dk", "Poland": "pl",
    "Serbia": "rs", "Ecuador": "ec", "Qatar": "qa",
    "Saudi Arabia": "sa", "Iran": "ir", "Cameroon": "cm",
    "Wales": "gb-wls", "Scotland": "gb-sct"
  };
  return map[name] || "un";
}
