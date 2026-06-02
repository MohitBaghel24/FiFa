export interface Team {
  id: string;
  name: string;
  flag: string;
  group: string;
  continent: string;
  fanCount: string;
  color: string;
  onlineCount: number;
}

export const WORLD_CUP_TEAMS: Team[] = [
  { id: "brazil", name: "BRAZIL", flag: "https://flagcdn.com/w80/br.png", group: "G", continent: "SOUTH AMERICA", fanCount: "14.2M", color: "#009c3b", onlineCount: 15420 },
  { id: "argentina", name: "ARGENTINA", flag: "https://flagcdn.com/w80/ar.png", group: "C", continent: "SOUTH AMERICA", fanCount: "12.8M", color: "#75aadb", onlineCount: 13200 },
  { id: "france", name: "FRANCE", flag: "https://flagcdn.com/w80/fr.png", group: "D", continent: "EUROPE", fanCount: "10.5M", color: "#002395", onlineCount: 9800 },
  { id: "england", name: "ENGLAND", flag: "https://flagcdn.com/w80/gb-eng.png", group: "B", continent: "EUROPE", fanCount: "9.2M", color: "#ce1124", onlineCount: 8900 },
  { id: "spain", name: "SPAIN", flag: "https://flagcdn.com/w80/es.png", group: "E", continent: "EUROPE", fanCount: "8.1M", color: "#ad1519", onlineCount: 7500 },
  { id: "germany", name: "GERMANY", flag: "https://flagcdn.com/w80/de.png", group: "E", continent: "EUROPE", fanCount: "8.5M", color: "#000000", onlineCount: 7100 },
  { id: "portugal", name: "PORTUGAL", flag: "https://flagcdn.com/w80/pt.png", group: "H", continent: "EUROPE", fanCount: "7.9M", color: "#ff0000", onlineCount: 8200 },
  { id: "netherlands", name: "NETHERLANDS", flag: "https://flagcdn.com/w80/nl.png", group: "A", continent: "EUROPE", fanCount: "5.4M", color: "#f36c21", onlineCount: 4200 },
  { id: "belgium", name: "BELGIUM", flag: "https://flagcdn.com/w80/be.png", group: "F", continent: "EUROPE", fanCount: "4.8M", color: "#ed2939", onlineCount: 3800 },
  { id: "croatia", name: "CROATIA", flag: "https://flagcdn.com/w80/hr.png", group: "F", continent: "EUROPE", fanCount: "3.2M", color: "#ff0000", onlineCount: 2900 },
  { id: "denmark", name: "DENMARK", flag: "https://flagcdn.com/w80/dk.png", group: "D", continent: "EUROPE", fanCount: "2.5M", color: "#c60c30", onlineCount: 2100 },
  { id: "switzerland", name: "SWITZERLAND", flag: "https://flagcdn.com/w80/ch.png", group: "G", continent: "EUROPE", fanCount: "2.1M", color: "#ff0000", onlineCount: 1800 },
  { id: "poland", name: "POLAND", flag: "https://flagcdn.com/w80/pl.png", group: "C", continent: "EUROPE", fanCount: "3.8M", color: "#dc143c", onlineCount: 3100 },
  { id: "serbia", name: "SERBIA", flag: "https://flagcdn.com/w80/rs.png", group: "G", continent: "EUROPE", fanCount: "2.0M", color: "#c6363c", onlineCount: 1500 },
  { id: "usa", name: "USA", flag: "https://flagcdn.com/w80/us.png", group: "B", continent: "NORTH AMERICA", fanCount: "6.5M", color: "#002868", onlineCount: 5400 },
  { id: "mexico", name: "MEXICO", flag: "https://flagcdn.com/w80/mx.png", group: "C", continent: "NORTH AMERICA", fanCount: "8.9M", color: "#006847", onlineCount: 7800 },
  { id: "canada", name: "CANADA", flag: "https://flagcdn.com/w80/ca.png", group: "F", continent: "NORTH AMERICA", fanCount: "1.8M", color: "#ff0000", onlineCount: 1200 },
  { id: "ecuador", name: "ECUADOR", flag: "https://flagcdn.com/w80/ec.png", group: "A", continent: "SOUTH AMERICA", fanCount: "2.4M", color: "#ffdd00", onlineCount: 1900 },
  { id: "uruguay", name: "URUGUAY", flag: "https://flagcdn.com/w80/uy.png", group: "H", continent: "SOUTH AMERICA", fanCount: "3.5M", color: "#0038a8", onlineCount: 2700 },
  { id: "colombia", name: "COLOMBIA", flag: "https://flagcdn.com/w80/co.png", group: "H", continent: "SOUTH AMERICA", fanCount: "4.2M", color: "#fcd116", onlineCount: 3400 },
  { id: "morocco", name: "MOROCCO", flag: "https://flagcdn.com/w80/ma.png", group: "F", continent: "AFRICA", fanCount: "5.1M", color: "#c1272d", onlineCount: 4500 },
  { id: "senegal", name: "SENEGAL", flag: "https://flagcdn.com/w80/sn.png", group: "A", continent: "AFRICA", fanCount: "3.1M", color: "#00853f", onlineCount: 2200 },
  { id: "ghana", name: "GHANA", flag: "https://flagcdn.com/w80/gh.png", group: "H", continent: "AFRICA", fanCount: "2.8M", color: "#006b3f", onlineCount: 1900 },
  { id: "cameroon", name: "CAMEROON", flag: "https://flagcdn.com/w80/cm.png", group: "G", continent: "AFRICA", fanCount: "2.2M", color: "#007a5e", onlineCount: 1400 },
  { id: "japan", name: "JAPAN", flag: "https://flagcdn.com/w80/jp.png", group: "E", continent: "ASIA", fanCount: "4.5M", color: "#000555", onlineCount: 3900 },
  { id: "south-korea", name: "SOUTH KOREA", flag: "https://flagcdn.com/w80/kr.png", group: "H", continent: "ASIA", fanCount: "3.7M", color: "#c60c30", onlineCount: 3100 },
  { id: "australia", name: "AUSTRALIA", flag: "https://flagcdn.com/w80/au.png", group: "D", continent: "OCEANIA", fanCount: "2.6M", color: "#00843d", onlineCount: 2000 },
  { id: "saudi-arabia", name: "SAUDI ARABIA", flag: "https://flagcdn.com/w80/sa.png", group: "C", continent: "ASIA", fanCount: "3.9M", color: "#006c35", onlineCount: 3300 },
  { id: "iran", name: "IRAN", flag: "https://flagcdn.com/w80/ir.png", group: "B", continent: "ASIA", fanCount: "3.4M", color: "#239f40", onlineCount: 2800 },
  { id: "qatar", name: "QATAR", flag: "https://flagcdn.com/w80/qa.png", group: "A", continent: "ASIA", fanCount: "1.1M", color: "#8a1538", onlineCount: 900 },
  { id: "egypt", name: "EGYPT", flag: "https://flagcdn.com/w80/eg.png", group: "A", continent: "AFRICA", fanCount: "4.7M", color: "#ce1126", onlineCount: 3800 },
  { id: "india-fans", name: "INDIA FANS", flag: "https://flagcdn.com/w80/in.png", group: "WILDCARD", continent: "ASIA", fanCount: "25.4M", color: "#ff9933", onlineCount: 45200 },
];

export const GROUPS = WORLD_CUP_TEAMS.reduce((acc, team) => {
  if (!acc[team.group]) {
    acc[team.group] = [];
  }
  acc[team.group].push(team);
  return acc;
}, {} as Record<string, Team[]>);

export function getTeamById(id: string): Team | undefined {
  return WORLD_CUP_TEAMS.find(team => team.id === id);
}

export function getTeamsByContinent(continent: string): Team[] {
  return WORLD_CUP_TEAMS.filter(team => team.continent.toUpperCase() === continent.toUpperCase());
}

export const ALL_TEAMS = WORLD_CUP_TEAMS;
