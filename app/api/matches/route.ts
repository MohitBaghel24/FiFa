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

// Map team names to flag country codes
const FLAG_MAP: Record<string, string> = {
  "Brazil": "br", "Argentina": "ar", "France": "fr",
  "England": "gb-eng", "Spain": "es", "Germany": "de",
  "Portugal": "pt", "Netherlands": "nl", "Belgium": "be",
  "Croatia": "hr", "Uruguay": "uy", "Colombia": "co",
  "Mexico": "mx", "United States": "us", "USA": "us",
  "Canada": "ca", "Japan": "jp", "Morocco": "ma",
  "Senegal": "sn", "Ghana": "gh", "South Korea": "kr",
  "Korea Republic": "kr", "Australia": "au",
  "Switzerland": "ch", "Denmark": "dk", "Poland": "pl",
  "Serbia": "rs", "Ecuador": "ec", "Qatar": "qa",
  "Saudi Arabia": "sa", "Iran": "ir", "Cameroon": "cm",
  "Tunisia": "tn", "Nigeria": "ng", "Egypt": "eg",
  "Algeria": "dz", "Italy": "it", "Turkey": "tr",
  "Ukraine": "ua", "Scotland": "gb-sct", "Wales": "gb-wls",
  "Austria": "at", "Sweden": "se", "Norway": "no",
  "Czech Republic": "cz", "Hungary": "hu", "Greece": "gr",
  "Romania": "ro", "Bulgaria": "bg", "Slovakia": "sk",
  "Slovenia": "si", "Albania": "al", "Georgia": "ge",
  "Paraguay": "py", "Chile": "cl", "Peru": "pe",
  "Bolivia": "bo", "Venezuela": "ve",
  "Costa Rica": "cr", "Panama": "pa", "Honduras": "hn",
  "Jamaica": "jm", "Trinidad and Tobago": "tt",
  "China": "cn", "India": "in", "Iraq": "iq",
  "United Arab Emirates": "ae", "Bahrain": "bh",
  "Uzbekistan": "uz", "Thailand": "th", "Vietnam": "vn",
  "Indonesia": "id", "Malaysia": "my",
  "Ivory Coast": "ci", "Mali": "ml", "Zambia": "zm",
  "Tanzania": "tz", "Uganda": "ug", "Kenya": "ke",
  "Zimbabwe": "zw", "Angola": "ao", "Mozambique": "mz",
};

function getFlagUrl(teamName: string): string {
  const code = FLAG_MAP[teamName];
  if (code) return `https://flagcdn.com/w80/${code}.png`;
  // Fallback to team logo from API
  return "";
}

function getShortName(name: string): string {
  const shorts: Record<string, string> = {
    "Brazil": "BRA", "Argentina": "ARG", "France": "FRA",
    "England": "ENG", "Spain": "ESP", "Germany": "GER",
    "Portugal": "POR", "Netherlands": "NED", "Belgium": "BEL",
    "Croatia": "CRO", "Uruguay": "URU", "Colombia": "COL",
    "Mexico": "MEX", "United States": "USA", "Canada": "CAN",
    "Japan": "JPN", "Morocco": "MAR", "Senegal": "SEN",
    "South Korea": "KOR", "Korea Republic": "KOR",
    "Australia": "AUS", "Switzerland": "SUI", "Denmark": "DEN",
    "Italy": "ITA", "Turkey": "TUR", "Ukraine": "UKR",
    "Saudi Arabia": "KSA", "Iran": "IRN", "Qatar": "QAT",
    "Ghana": "GHA", "Cameroon": "CMR", "Tunisia": "TUN",
    "Nigeria": "NGA", "Egypt": "EGY", "Ecuador": "ECU",
    "Paraguay": "PAR", "Chile": "CHI", "Peru": "PER",
    "Costa Rica": "CRC", "Panama": "PAN",
    "Ivory Coast": "CIV", "Mali": "MLI",
  };
  if (shorts[name]) return shorts[name];
  return name.substring(0, 3).toUpperCase();
}

function transformMatch(item: any) {
  const home = item.teams?.home;
  const away = item.teams?.away;
  const goals = item.goals;
  const fixture = item.fixture;
  const league = item.league;
  const elapsed = fixture?.status?.elapsed;

  const status =
    fixture?.status?.short === "1H" ||
    fixture?.status?.short === "2H" ||
    fixture?.status?.short === "ET" ||
    fixture?.status?.short === "P"
      ? "LIVE"
    : fixture?.status?.short === "FT" ||
      fixture?.status?.short === "AET" ||
      fixture?.status?.short === "PEN"
      ? "FT"
    : "UPCOMING";

  const kickoff = fixture?.date
    ? new Date(fixture.date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit", minute: "2-digit",
        day: "numeric", month: "short",
      }) + " IST"
    : "";

  return {
    id: fixture?.id,
    competition: league?.name || "Football",
    homeTeam: {
      name: getShortName(home?.name || ""),
      fullName: home?.name || "",
      flag: getFlagUrl(home?.name || "") || home?.logo || "",
    },
    awayTeam: {
      name: getShortName(away?.name || ""),
      fullName: away?.name || "",
      flag: getFlagUrl(away?.name || "") || away?.logo || "",
    },
    homeScore: goals?.home ?? null,
    awayScore: goals?.away ?? null,
    minute: elapsed || null,
    status,
    kickoff,
  };
}

export async function GET() {
  const apiKey = process.env.FOOTBALL_API_KEY;

  // No API key — return mock
  if (!apiKey) {
    console.log("No API key — using mock data");
    return NextResponse.json({ matches: MOCK_MATCHES, source: "mock" });
  }

  try {
    // Step 1: Try live matches first
    const liveRes = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: { "x-apisports-key": apiKey },
        next: { revalidate: 30 },
      }
    );

    if (!liveRes.ok) {
      throw new Error(`API error: ${liveRes.status}`);
    }

    const liveData = await liveRes.json();

    // Check API errors
    if (liveData.errors && Object.keys(liveData.errors).length > 0) {
      console.error("API Football errors:", liveData.errors);
      return NextResponse.json({ matches: MOCK_MATCHES, source: "mock" });
    }

    // If live matches exist — return them
    if (liveData.response && liveData.response.length > 0) {
      const matches = liveData.response.map(transformMatch);
      return NextResponse.json({
        matches,
        source: "live",
        count: matches.length,
        timestamp: new Date().toISOString(),
      });
    }

    // Step 2: No live matches — get today's matches
    const today = new Date().toISOString().split("T")[0];
    const todayRes = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${today}`,
      {
        headers: { "x-apisports-key": apiKey },
        next: { revalidate: 60 },
      }
    );

    const todayData = await todayRes.json();

    if (todayData.response && todayData.response.length > 0) {
      // Show top 8 matches from today
      const matches = todayData.response
        .slice(0, 8)
        .map(transformMatch);
      return NextResponse.json({
        matches,
        source: "live",
        count: matches.length,
        timestamp: new Date().toISOString(),
      });
    }

    // Step 3: No today matches — get next 3 days upcoming
    const tomorrow = new Date(Date.now() + 86400000)
      .toISOString().split("T")[0];
    const upcomingRes = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${tomorrow}`,
      {
        headers: { "x-apisports-key": apiKey },
        next: { revalidate: 300 },
      }
    );

    const upcomingData = await upcomingRes.json();

    if (upcomingData.response && upcomingData.response.length > 0) {
      const matches = upcomingData.response
        .slice(0, 6)
        .map(transformMatch);
      return NextResponse.json({
        matches,
        source: "live",
        count: matches.length,
        timestamp: new Date().toISOString(),
      });
    }

    // Final fallback
    return NextResponse.json({ matches: MOCK_MATCHES, source: "mock" });

  } catch (error) {
    console.error("Football API failed:", error);
    return NextResponse.json({ matches: MOCK_MATCHES, source: "mock" });
  }
}
