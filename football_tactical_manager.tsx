import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Users, 
  Grid, 
  Sliders, 
  Mail, 
  TrendingUp, 
  Play, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw, 
  Award,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Settings,
  X,
  Lock,
  Unlock,
  Sparkles,
  User,
  UserCheck,
  Shirt
} from 'lucide-react';

// ==========================================
// REAL PDF-ALIGNED CONSTANTS & DATA ENGINE
// ==========================================

const LEAGUES = {
  BRASILEIRAO: 'Brasileirão Série A',
  PREMIER: 'Premier League',
  BUNDESLIGA: 'Bundesliga',
  LIGUE1: 'Ligue 1'
};

const POSITIONS = ['GOL', 'ZAG', 'LAT', 'VOL', 'MEI', 'PON', 'ATA'];
const OUTFITS = ['Terno Elegante', 'Agasalho Esportivo', 'Camisa Social', 'Jaqueta Tática'];
const NATIONALITIES = ['Brasil', 'Argentina', 'Portugal', 'Espanha', 'Alemanha', 'Inglaterra', 'França', 'Itália'];
const TACTICAL_PHILOSOPHIES = ['Tiki-Taka (Posse)', 'Gegenpressing (Intenso)', 'Contra-Ataque Rápido', 'Jogo Direto & Físico'];

// PDF Real Player Override Data (Exact matches from the 2026/27 PDF document)
const PDF_PLAYER_DATA = {
  'Atlético Mineiro': [
    { name: 'Fred', age: 33, position: 'ATA', ovr: 81, salaryAnnual: 29216200 },
    { name: 'Júnior Santos', age: 31, position: 'PON', ovr: 79, salaryAnnual: 17186000 },
    { name: 'Gustavo Scarpa', age: 32, position: 'MEI', ovr: 80, salaryAnnual: 12030200 }
  ],
  'Bahia': [
    { name: 'Everton Ribeiro', age: 37, position: 'MEI', ovr: 79, salaryAnnual: 22341800 }
  ],
  'Botafogo': [
    { name: 'Allan', age: 35, position: 'VOL', ovr: 78, salaryAnnual: 17186000 },
    { name: 'Danilo', age: 25, position: 'LAT', ovr: 79, salaryAnnual: 15467400 }
  ],
  'Cruzeiro': [
    { name: 'Luis Sinisterra', age: 27, position: 'PON', ovr: 79, salaryAnnual: 22341800 }
  ],
  'Flamengo': [
    { name: 'Jorginho', age: 34, position: 'VOL', ovr: 83, salaryAnnual: 31278520 },
    { name: 'Bruno Henrique', age: 35, position: 'PON', ovr: 81, salaryAnnual: 22685520 },
    { name: 'Alex Sandro', age: 34, position: 'LAT', ovr: 80, salaryAnnual: 15123680 },
    { name: 'Giorgian de Arrascaeta', age: 32, position: 'MEI', ovr: 84, salaryAnnual: 12030200 }
  ],
  'Fluminense': [
    { name: 'Luciano Acosta', age: 31, position: 'MEI', ovr: 80, salaryAnnual: 21310640 },
    { name: 'Hulk', age: 40, position: 'ATA', ovr: 82, salaryAnnual: 19592040 },
    { name: 'Thiago Silva', age: 41, position: 'ZAG', ovr: 82, salaryAnnual: 12373920 }
  ],
  'Grêmio': [
    { name: 'Arthur', age: 28, position: 'MEI', ovr: 81, salaryAnnual: 34028280 },
    { name: 'Tetê', age: 25, position: 'PON', ovr: 79, salaryAnnual: 16842280 }
  ],
  'Internacional': [
    { name: 'Guillermo Maripán', age: 32, position: 'ZAG', ovr: 78, salaryAnnual: 18217160 },
    { name: 'Antonio Sanabria', age: 30, position: 'ATA', ovr: 78, salaryAnnual: 17873440 }
  ],
  'Palmeiras': [
    { name: 'Gustavo Gómez', age: 33, position: 'ZAG', ovr: 82, salaryAnnual: 13405080 }
  ],
  'São Paulo': [
    { name: 'Domingos Duarte', age: 31, position: 'ZAG', ovr: 77, salaryAnnual: 12030200 }
  ],
  'Bayer 04 Leverkusen': [
    { name: 'Moussa Diaby', age: 27, position: 'PON', ovr: 84, salaryAnnual: 87304880 },
    { name: 'Patrik Schick', age: 30, position: 'ATA', ovr: 83, salaryAnnual: 57057520 }
  ],
  'Borussia Dortmund': [
    { name: 'Serhou Guirassy', age: 30, position: 'ATA', ovr: 84, salaryAnnual: 59807280 },
    { name: 'Felix Nmecha', age: 25, position: 'MEI', ovr: 80, salaryAnnual: 57057520 },
    { name: 'Emre Can', age: 32, position: 'VOL', ovr: 81, salaryAnnual: 45714760 },
    { name: 'Marcel Sabitzer', age: 32, position: 'MEI', ovr: 82, salaryAnnual: 45714760 }
  ],
  'FC Bayern München': [
    { name: 'Jamal Musiala', age: 23, position: 'MEI', ovr: 88, salaryAnnual: 142300080 },
    { name: 'Harry Kane', age: 33, position: 'ATA', ovr: 90, salaryAnnual: 130957320 },
    { name: 'Dayot Upamecano', age: 28, position: 'ZAG', ovr: 85, salaryAnnual: 113771320 },
    { name: 'Joshua Kimmich', age: 31, position: 'VOL', ovr: 87, salaryAnnual: 108271800 },
    { name: 'Manuel Neuer', age: 40, position: 'GOL', ovr: 86, salaryAnnual: 102428560 },
    { name: 'Alphonso Davies', age: 25, position: 'LAT', ovr: 85, salaryAnnual: 85586280 },
    { name: 'Jonathan Tah', age: 30, position: 'ZAG', ovr: 84, salaryAnnual: 85586280 },
    { name: 'Luis Díaz', age: 29, position: 'PON', ovr: 86, salaryAnnual: 79743040 },
    { name: 'Serge Gnabry', age: 31, position: 'PON', ovr: 84, salaryAnnual: 79743040 },
    { name: 'Michael Olise', age: 24, position: 'PON', ovr: 84, salaryAnnual: 76993280 },
    { name: 'Kim Min-Jae', age: 29, position: 'ZAG', ovr: 84, salaryAnnual: 68400280 },
    { name: 'Konrad Laimer', age: 29, position: 'VOL', ovr: 82, salaryAnnual: 48464520 }
  ],
  'RB Leipzig': [
    { name: 'Christopher Nkunku', age: 28, position: 'ATA', ovr: 85, salaryAnnual: 52932880 }
  ],
  'Arsenal': [
    { name: 'Bukayo Saka', age: 23, position: 'PON', ovr: 88, salaryAnnual: 109668000 },
    { name: 'Gabriel Jesus', age: 28, position: 'ATA', ovr: 84, salaryAnnual: 96873400 },
    { name: 'Declan Rice', age: 26, position: 'VOL', ovr: 87, salaryAnnual: 91390000 },
    { name: 'Gabriel Martinelli', age: 24, position: 'PON', ovr: 85, salaryAnnual: 88465520 },
    { name: 'Martin Ødegaard', age: 26, position: 'MEI', ovr: 88, salaryAnnual: 82251000 },
    { name: 'Kai Havertz', age: 26, position: 'ATA', ovr: 84, salaryAnnual: 80423200 },
    { name: 'William Saliba', age: 24, position: 'ZAG', ovr: 87, salaryAnnual: 80423200 },
    { name: 'Viktor Gyökeres', age: 27, position: 'ATA', ovr: 86, salaryAnnual: 73112000 },
    { name: 'Ebere Eze', age: 27, position: 'MEI', ovr: 83, salaryAnnual: 69456400 },
    { name: 'Gabriel', age: 27, position: 'ZAG', ovr: 86, salaryAnnual: 69456400 },
    { name: 'Bruno Guimarães', age: 27, position: 'VOL', ovr: 86, salaryAnnual: 65800800 },
    { name: 'David Raya', age: 29, position: 'GOL', ovr: 84, salaryAnnual: 58489600 },
    { name: 'Mikel Merino', age: 29, position: 'MEI', ovr: 82, salaryAnnual: 51178400 },
    { name: 'Martín Zubimendi', age: 26, position: 'VOL', ovr: 84, salaryAnnual: 42039400 },
    { name: 'Benjamin White', age: 27, position: 'LAT', ovr: 83, salaryAnnual: 40211600 },
    { name: 'Jurriën Timber', age: 24, position: 'LAT', ovr: 82, salaryAnnual: 40211600 },
    { name: 'Kepa Arrizabalaga', age: 30, position: 'GOL', ovr: 80, salaryAnnual: 36556000 },
    { name: 'Noni Madueke', age: 23, position: 'PON', ovr: 81, salaryAnnual: 36556000 },
    { name: 'Christos Tzolis', age: 23, position: 'PON', ovr: 79, salaryAnnual: 32900400 },
    { name: 'Reiss Nelson', age: 25, position: 'PON', ovr: 77, salaryAnnual: 32169280 },
    { name: 'Fábio Vieira', age: 25, position: 'MEI', ovr: 78, salaryAnnual: 29975920 },
    { name: 'Piero Hincapié', age: 23, position: 'ZAG', ovr: 82, salaryAnnual: 29975920 },
    { name: 'Riccardo Calafiori', age: 23, position: 'ZAG', ovr: 82, salaryAnnual: 23030280 },
    { name: 'Cristhian Mosquera', age: 21, position: 'ZAG', ovr: 78, salaryAnnual: 22664720 },
    { name: 'Illan Meslier', age: 25, position: 'GOL', ovr: 78, salaryAnnual: 14987960 }
  ],
  'Chelsea': [
    { name: 'Reece James', age: 27, position: 'LAT', ovr: 84, salaryAnnual: 85930000 }
  ],
  'Everton': [
    { name: 'Jack Grealish', age: 31, position: 'PON', ovr: 83, salaryAnnual: 92804400 }
  ],
  'Liverpool': [
    { name: 'Virgil van Dijk', age: 35, position: 'ZAG', ovr: 89, salaryAnnual: 120302000 },
    { name: 'Alexander Isak', age: 27, position: 'ATA', ovr: 86, salaryAnnual: 103116000 },
    { name: 'Hugo Ekitiké', age: 24, position: 'ATA', ovr: 82, salaryAnnual: 85930000 },
    { name: 'Alisson', age: 34, position: 'GOL', ovr: 88, salaryAnnual: 80774200 }
  ],
  'Manchester City': [
    { name: 'Erling Haaland', age: 26, position: 'ATA', ovr: 91, salaryAnnual: 154674000 },
    { name: 'Marc Guéhi', age: 30, position: 'ZAG', ovr: 84, salaryAnnual: 103116000 },
    { name: 'Phil Foden', age: 26, position: 'MEI', ovr: 88, salaryAnnual: 96241600 },
    { name: 'Elliot Anderson', age: 23, position: 'MEI', ovr: 80, salaryAnnual: 85930000 },
    { name: 'Gianluigi Donnarumma', age: 27, position: 'GOL', ovr: 88, salaryAnnual: 85930000 }
  ],
  'Manchester United': [
    { name: 'Bruno Fernandes', age: 32, position: 'MEI', ovr: 87, salaryAnnual: 103116000 },
    { name: 'Marcus Rashford', age: 29, position: 'PON', ovr: 83, salaryAnnual: 80774200 },
    { name: 'Benjamin Šeško', age: 23, position: 'ATA', ovr: 82, salaryAnnual: 79055600 }
  ]
};

// 1st Division Only Clubs List
const CLUBS_DATA = [
  // Brasileirão Série A (Only 1st Division)
  { id: 'athpar', name: 'Athletico Paranaense', league: LEAGUES.BRASILEIRAO, baseOvr: 75, minOvr: 50, budget: 15000000, avgSalaryPDF: 1441440, format: '4-3-3' },
  { id: 'atlmg', name: 'Atlético Mineiro', league: LEAGUES.BRASILEIRAO, baseOvr: 80, minOvr: 68, budget: 45000000, avgSalaryPDF: 6003764, format: '4-2-3-1' },
  { id: 'bahia', name: 'Bahia', league: LEAGUES.BRASILEIRAO, baseOvr: 76, minOvr: 55, budget: 25000000, avgSalaryPDF: 3536000, format: '4-3-3' },
  { id: 'bota', name: 'Botafogo', league: LEAGUES.BRASILEIRAO, baseOvr: 78, minOvr: 62, budget: 35000000, avgSalaryPDF: 4359420, format: '4-3-3' },
  { id: 'corin', name: 'Corinthians', league: LEAGUES.BRASILEIRAO, baseOvr: 76, minOvr: 55, budget: 22000000, avgSalaryPDF: 2704000, format: '4-4-2' },
  { id: 'cruz', name: 'Cruzeiro', league: LEAGUES.BRASILEIRAO, baseOvr: 76, minOvr: 55, budget: 20000000, avgSalaryPDF: 1393600, format: '4-2-3-1' },
  { id: 'fla', name: 'Flamengo', league: LEAGUES.BRASILEIRAO, baseOvr: 82, minOvr: 72, budget: 70000000, avgSalaryPDF: 7383792, format: '4-2-3-1' },
  { id: 'flu', name: 'Fluminense', league: LEAGUES.BRASILEIRAO, baseOvr: 79, minOvr: 65, budget: 30000000, avgSalaryPDF: 4532996, format: '4-3-3' },
  { id: 'grem', name: 'Grêmio', league: LEAGUES.BRASILEIRAO, baseOvr: 78, minOvr: 62, budget: 28000000, avgSalaryPDF: 4460092, format: '4-3-3' },
  { id: 'inter', name: 'Internacional', league: LEAGUES.BRASILEIRAO, baseOvr: 77, minOvr: 60, budget: 26000000, avgSalaryPDF: 4440540, format: '4-2-3-1' },
  { id: 'mirassol', name: 'Mirassol', league: LEAGUES.BRASILEIRAO, baseOvr: 70, minOvr: 50, budget: 6000000, avgSalaryPDF: 45760, format: '4-4-2' },
  { id: 'palm', name: 'Palmeiras', league: LEAGUES.BRASILEIRAO, baseOvr: 82, minOvr: 72, budget: 65000000, avgSalaryPDF: 5502952, format: '4-3-3' },
  { id: 'rbbrag', name: 'Red Bull Bragantino', league: LEAGUES.BRASILEIRAO, baseOvr: 75, minOvr: 52, budget: 18000000, avgSalaryPDF: 2288000, format: '4-3-3' },
  { id: 'santos', name: 'Santos', league: LEAGUES.BRASILEIRAO, baseOvr: 75, minOvr: 52, budget: 16000000, avgSalaryPDF: 2288000, format: '4-3-3' },
  { id: 'spfc', name: 'São Paulo', league: LEAGUES.BRASILEIRAO, baseOvr: 78, minOvr: 62, budget: 30000000, avgSalaryPDF: 3619044, format: '3-5-2' },
  { id: 'vasco', name: 'Vasco da Gama', league: LEAGUES.BRASILEIRAO, baseOvr: 74, minOvr: 50, budget: 14000000, avgSalaryPDF: 2704000, format: '4-3-3' },
  { id: 'vitoria', name: 'Vitória', league: LEAGUES.BRASILEIRAO, baseOvr: 71, minOvr: 50, budget: 7000000, avgSalaryPDF: 347360, format: '4-4-2' },

  // Bundesliga (1st Division Only)
  { id: 'bayer', name: 'Bayer 04 Leverkusen', league: LEAGUES.BUNDESLIGA, baseOvr: 84, minOvr: 75, budget: 85000000, avgSalaryPDF: 29411564, format: '3-4-2-1' },
  { id: 'bvb', name: 'Borussia Dortmund', league: LEAGUES.BUNDESLIGA, baseOvr: 83, minOvr: 74, budget: 80000000, avgSalaryPDF: 30016896, format: '4-3-3' },
  { id: 'bayern', name: 'FC Bayern München', league: LEAGUES.BUNDESLIGA, baseOvr: 87, minOvr: 80, budget: 140000000, avgSalaryPDF: 67487524, format: '4-2-3-1' },
  { id: 'rbleipzig', name: 'RB Leipzig', league: LEAGUES.BUNDESLIGA, baseOvr: 82, minOvr: 72, budget: 65000000, avgSalaryPDF: 24692876, format: '4-2-2-2' },
  { id: 'stuttgart', name: 'VfB Stuttgart', league: LEAGUES.BUNDESLIGA, baseOvr: 78, minOvr: 60, budget: 32000000, avgSalaryPDF: 14794988, format: '4-4-2' },
  { id: 'frankfurt', name: 'Eintracht Frankfurt', league: LEAGUES.BUNDESLIGA, baseOvr: 77, minOvr: 58, budget: 28000000, avgSalaryPDF: 12899692, format: '3-4-3' },
  { id: 'mainz', name: '1. FSV Mainz 05', league: LEAGUES.BUNDESLIGA, baseOvr: 73, minOvr: 50, budget: 12000000, avgSalaryPDF: 8381516, format: '4-3-3' },

  // Premier League (1st Division Only)
  { id: 'arsenal', name: 'Arsenal', league: LEAGUES.PREMIER, baseOvr: 86, minOvr: 78, budget: 120000000, avgSalaryPDF: 53635764, format: '4-3-3' },
  { id: 'aston', name: 'Aston Villa', league: LEAGUES.PREMIER, baseOvr: 80, minOvr: 68, budget: 50000000, avgSalaryPDF: 27466296, format: '4-2-3-1' },
  { id: 'chelsea', name: 'Chelsea', league: LEAGUES.PREMIER, baseOvr: 83, minOvr: 73, budget: 110000000, avgSalaryPDF: 33675980, format: '4-2-3-1' },
  { id: 'liverpool', name: 'Liverpool', league: LEAGUES.PREMIER, baseOvr: 87, minOvr: 80, budget: 130000000, avgSalaryPDF: 47085532, format: '4-3-3' },
  { id: 'mancity', name: 'Manchester City', league: LEAGUES.PREMIER, baseOvr: 89, minOvr: 83, budget: 160000000, avgSalaryPDF: 59766356, format: '3-2-4-1' },
  { id: 'manutd', name: 'Manchester United', league: LEAGUES.PREMIER, baseOvr: 84, minOvr: 74, budget: 95000000, avgSalaryPDF: 47613488, format: '4-2-3-1' },
  { id: 'newcastle', name: 'Newcastle United', league: LEAGUES.PREMIER, baseOvr: 81, minOvr: 70, budget: 60000000, avgSalaryPDF: 26318968, format: '4-3-3' },
  { id: 'tottenham', name: 'Tottenham Hotspur', league: LEAGUES.PREMIER, baseOvr: 82, minOvr: 72, budget: 70000000, avgSalaryPDF: 40058824, format: '4-3-3' },
  { id: 'bournemouth', name: 'AFC Bournemouth', league: LEAGUES.PREMIER, baseOvr: 74, minOvr: 50, budget: 18000000, avgSalaryPDF: 20643480, format: '4-2-3-1' }
];

// Helper to generate full 25-player roster for each club using PDF data
function generateFullSquad(clubName, baseOvr, avgSalaryPDF) {
  const squad = [];
  const existingPdfPlayers = PDF_PLAYER_DATA[clubName] || [];

  existingPdfPlayers.forEach((pdfP, i) => {
    squad.push({
      id: `${clubName}-pdf-${i}`,
      name: pdfP.name,
      age: pdfP.age,
      position: pdfP.position,
      ovr: pdfP.ovr,
      salaryWeekly: Math.round(pdfP.salaryAnnual / 52),
      marketValue: Math.round(pdfP.ovr * pdfP.ovr * 8500)
    });
  });

  const positionDistribution = [
    'GOL', 'GOL', 'GOL',
    'ZAG', 'ZAG', 'ZAG', 'ZAG', 'LAT', 'LAT', 'LAT', 'LAT',
    'VOL', 'VOL', 'MEI', 'MEI', 'MEI',
    'PON', 'PON', 'PON', 'PON', 'ATA', 'ATA', 'ATA', 'ATA', 'ATA'
  ];

  const firstNames = ['Lucas', 'Gabriel', 'Mateus', 'Guilherme', 'Pedro', 'Felipe', 'Enzo', 'Rodrigo', 'Bruno', 'Diego', 'Thiago', 'Carlos', 'Marco'];
  const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Almeida', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro'];

  let count = squad.length;
  while (squad.length < 25) {
    const pos = positionDistribution[count % positionDistribution.length];
    const age = 18 + Math.floor(Math.random() * 17);
    const ovrVar = Math.floor(Math.random() * 7) - 3;
    const playerOvr = Math.min(94, Math.max(62, baseOvr + ovrVar));
    const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const salaryWeekly = Math.round(avgSalaryPDF / 52);

    squad.push({
      id: `${clubName}-gen-${count}`,
      name: randomName,
      age,
      position: pos,
      ovr: playerOvr,
      salaryWeekly,
      marketValue: Math.round(playerOvr * playerOvr * 6000)
    });
    count++;
  }

  return squad;
}

export default function App() {
  // -----------------------------------------
  // CAREER & MANAGER STATE
  // -----------------------------------------
  const [manager, setManager] = useState({
    name: 'Técnico Tático',
    nationality: 'Brasil',
    outfit: 'Terno Elegante',
    philosophy: 'Tiki-Taka (Posse)',
    ovr: 50,
    clubId: null,
    wins: 0,
    losses: 0,
    draws: 0,
    trophies: 0
  });

  const [clubs, setClubs] = useState(() => 
    CLUBS_DATA.map(c => ({ ...c, squad: generateFullSquad(c.name, c.baseOvr, c.avgSalaryPDF) }))
  );

  const [date, setDate] = useState({ day: 1, month: 1, year: 2026 });
  const [activeTab, setActiveTab] = useState('tactics'); // tactics, squad, transfers, league, mailbox, profile
  const [isEditingManager, setIsEditingManager] = useState(false);
  const [managerEditForm, setManagerEditForm] = useState({ ...manager });
  
  const [mailbox, setMailbox] = useState([
    {
      id: 1,
      title: 'Boas-vindas à Comissão Técnica!',
      sender: 'Diretoria Executiva',
      date: '01/01/2026',
      read: false,
      text: 'Bem-vindo! Seu objetivo principal é evoluir seu conhecimento tático (OVR), vencer partidas com o elenco e garantir a estabilidade financeira do clube.'
    }
  ]);

  // Game Engine & Match State
  const [inMatch, setInMatch] = useState(false);
  const [matchState, setMatchState] = useState({
    opponent: null,
    minute: 0,
    homeGoals: 0,
    awayGoals: 0,
    events: [],
    isFinished: false,
    difficulty: 'Fácil'
  });

  // Active Team Tactics & Pitch Drag-and-Drop
  const activeClub = clubs.find(c => c.id === manager.clubId);

  const [starters, setStarters] = useState([]);
  const [bench, setBench] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [draggedPlayer, setDraggedPlayer] = useState(null);

  // Tactical Sliders
  const [tacticsStyle, setTacticsStyle] = useState({
    tempo: 60,      // Ritmo (0 - Lento, 100 - Intenso)
    pressing: 65,   // Pressão (0 - Bloc Baixo, 100 - Pressão Asfixiante)
    width: 50,      // Amplitude (0 - Fechado, 100 - Pontas Abertos)
    formation: '4-3-3',
    mentality: 'Ofensiva'
  });

  // Transfer Market Filter & Mode ('BUY' or 'SELL')
  const [transferFilter, setTransferFilter] = useState('ALL');
  const [transferMode, setTransferMode] = useState('BUY');

  // Multi-tier Transfer Windows: Months 1 (Jan), 7 (Jul), 9 (Sep)
  const isTransferWindowOpen = [1, 7, 9].includes(date.month);

  // Grid coordinates mapping for exact 4x5 Grid (Row: 0..3 [4 rows], Col: 0..4 [5 cols])
  function getPresetGridPos(formation, index) {
    if (index === 0) return { row: 0, col: 2 }; // Goalkeeper centered in bottom row
    
    const presets = {
      '4-3-3': [
        { row: 0, col: 2 }, // GOL
        { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 3 }, { row: 1, col: 4 }, // DEF
        { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, // MEI
        { row: 3, col: 0 }, { row: 3, col: 2 }, { row: 3, col: 4 }  // ATA
      ],
      '3-5-2': [
        { row: 0, col: 2 }, // GOL
        { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, // ZAG
        { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, // MEI
        { row: 3, col: 1 }, { row: 3, col: 3 } // ATA
      ],
      '4-4-2': [
        { row: 0, col: 2 }, // GOL
        { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 3 }, { row: 1, col: 4 }, // DEF
        { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 3 }, { row: 2, col: 4 }, // MEI
        { row: 3, col: 1 }, { row: 3, col: 3 } // ATA
      ],
      '4-2-3-1': [
        { row: 0, col: 2 }, // GOL
        { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 3 }, { row: 1, col: 4 }, // DEF
        { row: 2, col: 1 }, { row: 2, col: 3 }, // VOL
        { row: 3, col: 0 }, { row: 3, col: 2 }, { row: 3, col: 4 }  // MEI & ATA
      ]
    };

    const map = presets[formation] || presets['4-3-3'];
    return map[index] || { row: 2, col: 2 };
  }

  // Handle Starter Club Choice
  const handleSelectStartingClub = (club) => {
    setManager(prev => ({
      ...prev,
      clubId: club.id
    }));
    
    const squad = club.squad;
    const initialStarters = squad.slice(0, 11).map((p, idx) => ({
      ...p,
      gridPos: getPresetGridPos(club.format || '4-3-3', idx)
    }));
    setStarters(initialStarters);
    setBench(squad.slice(11));
    setTacticsStyle(prev => ({ ...prev, formation: club.format || '4-3-3' }));

    setMailbox(prev => [
      {
        id: Date.now(),
        title: `Contrato Assinado: ${club.name}`,
        sender: 'Presidência',
        date: `${date.day}/${date.month}/${date.year}`,
        read: false,
        text: `Parabéns pela contratação! Seu orçamentos iniciais foram liberados. Busque o topo na competição ${club.league}.`
      },
      ...prev
    ]);
  };

  // Move Player Grid Slot
  const handleMovePlayerGrid = (playerId, targetRow, targetCol) => {
    setStarters(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, gridPos: { row: targetRow, col: targetCol } };
      }
      return p;
    }));
  };

  // Substitute Starter with Bench Player
  const handleSubstitute = (benchPlayer) => {
    if (!selectedPlayer) return;

    const oldStarter = selectedPlayer;
    const starterGridPos = oldStarter.gridPos;

    setStarters(prev => prev.map(p => p.id === oldStarter.id ? { ...benchPlayer, gridPos: starterGridPos } : p));
    setBench(prev => prev.map(p => p.id === benchPlayer.id ? oldStarter : p));
    
    // Synchronize squad list in active club
    setClubs(prevClubs => prevClubs.map(c => {
      if (c.id === activeClub.id) {
        const updatedSquad = c.squad.map(p => {
          if (p.id === oldStarter.id) return { ...benchPlayer, gridPos: starterGridPos };
          if (p.id === benchPlayer.id) return { ...oldStarter, gridPos: null };
          return p;
        });
        return { ...c, squad: updatedSquad };
      }
      return c;
    }));

    setSelectedPlayer(null);
  };

  // Advance Date & Trigger Manager Job Offers
  const advanceCalendar = () => {
    let nextDay = date.day + 7;
    let nextMonth = date.month;
    let nextYear = date.year;

    if (nextDay > 28) {
      nextDay = 1;
      nextMonth += 1;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }
    }

    setDate({ day: nextDay, month: nextMonth, year: nextYear });

    // Job offers from bigger clubs based on OVR
    clubs.forEach(club => {
      if (club.id !== manager.clubId && manager.ovr >= club.minOvr && Math.random() < 0.3) {
        setMailbox(prev => {
          if (prev.some(m => m.clubOfferId === club.id)) return prev;
          return [
            {
              id: Date.now() + Math.random(),
              title: `Proposta de Contrato: ${club.name}`,
              sender: `Diretoria do ${club.name}`,
              date: `${nextDay}/${nextMonth}/${nextYear}`,
              read: false,
              clubOfferId: club.id,
              text: `Gostamos do seu trabalho e overall atual (${manager.ovr} OVR). Queremos convidá-lo a assumir o comando técnico do ${club.name}!`
            },
            ...prev
          ];
        });
      }
    });
  };

  // Accept Proposal
  const acceptJobOffer = (clubId) => {
    const newClub = clubs.find(c => c.id === clubId);
    if (!newClub) return;

    setManager(prev => ({
      ...prev,
      clubId: newClub.id
    }));

    const squad = newClub.squad;
    setStarters(squad.slice(0, 11).map((p, idx) => ({ ...p, gridPos: getPresetGridPos('4-3-3', idx) })));
    setBench(squad.slice(11));

    setMailbox(prev => [
      {
        id: Date.now(),
        title: `Novo Clube: ${newClub.name}`,
        sender: 'Imprensa Esportiva',
        date: `${date.day}/${date.month}/${date.year}`,
        read: false,
        text: `Você assumiu oficialmente o comando técnico do ${newClub.name}!`
      },
      ...prev
    ]);

    setActiveTab('tactics');
  };

  // Start Simulation Match
  const startMatch = () => {
    const sameLeagueClubs = clubs.filter(c => c.league === activeClub.league && c.id !== activeClub.id);
    const opponent = sameLeagueClubs[Math.floor(Math.random() * sameLeagueClubs.length)] || clubs[0];
    const difficulty = opponent.baseOvr > activeClub.baseOvr + 2 ? 'Difícil' : 'Fácil';

    setMatchState({
      opponent,
      minute: 0,
      homeGoals: 0,
      awayGoals: 0,
      events: ['0\' O árbitro apita e a bola rola!'],
      isFinished: false,
      difficulty
    });
    setInMatch(true);
  };

  // Realtime Match Simulation Engine
  useEffect(() => {
    if (!inMatch || matchState.isFinished) return;

    const timer = setInterval(() => {
      setMatchState(prev => {
        if (prev.minute >= 90) {
          clearInterval(timer);
          
          let ovrIncrease = 0;
          let isWin = prev.homeGoals > prev.awayGoals;

          if (isWin) {
            ovrIncrease = prev.difficulty === 'Difícil' ? 5.0 : 0.5;
            setManager(m => ({ 
              ...m, 
              ovr: Math.min(99, +(m.ovr + ovrIncrease).toFixed(1)),
              wins: m.wins + 1 
            }));
          } else if (prev.homeGoals === prev.awayGoals) {
            setManager(m => ({ ...m, draws: m.draws + 1 }));
          } else {
            setManager(m => ({ ...m, losses: m.losses + 1 }));
          }

          const endMsg = isWin 
            ? `Vitória maiúscula! Evolução de +${ovrIncrease} OVR de reputação!`
            : prev.homeGoals === prev.awayGoals 
              ? 'Empate tático disputado até o fim.' 
              : 'Derrota. Revise a formação tática e substituições.';

          advanceCalendar();

          return {
            ...prev,
            isFinished: true,
            events: [`90' Apito final! ${activeClub.name} ${prev.homeGoals} x ${prev.awayGoals} ${prev.opponent.name}.`, endMsg, ...prev.events]
          };
        }

        const currentMin = prev.minute + 10;
        let newHome = prev.homeGoals;
        let newAway = prev.awayGoals;
        let event = null;

        const myAvgOvr = starters.reduce((acc, p) => acc + p.ovr, 0) / 11;
        const oppAvgOvr = prev.opponent.baseOvr;

        const homeChance = (myAvgOvr / (myAvgOvr + oppAvgOvr)) * 0.36;
        const awayChance = (oppAvgOvr / (myAvgOvr + oppAvgOvr)) * 0.28;

        if (Math.random() < homeChance) {
          newHome += 1;
          const scorer = starters[Math.floor(Math.random() * starters.length)]?.name || 'Atacante';
          event = `${currentMin}' GOOOOL DO ${activeClub.name.toUpperCase()}! ${scorer} estufa as redes!`;
        } else if (Math.random() < awayChance) {
          newAway += 1;
          event = `${currentMin}' GOL DO ${prev.opponent.name.toUpperCase()}! Contra-ataque fulminante.`;
        } else if (Math.random() < 0.35) {
          const snippets = [
            `${currentMin}' Troca de passes envolvente com ${tacticsStyle.tempo}% de ritmo.`,
            `${currentMin}' Pressão alta de ${tacticsStyle.pressing}% rouba a bola no campo defensivo!`,
            `${currentMin}' Jogada trabalhada pelas pontas explorando a amplitude tática.`
          ];
          event = snippets[Math.floor(Math.random() * snippets.length)];
        }

        return {
          ...prev,
          minute: currentMin,
          homeGoals: newHome,
          awayGoals: newAway,
          events: event ? [event, ...prev.events] : prev.events
        };
      });
    }, 1100);

    return () => clearInterval(timer);
  }, [inMatch, matchState.minute]);

  // Buy Player & Direct Squad Synchronization
  const handleBuyPlayer = (player, sellerClub) => {
    if (!isTransferWindowOpen) {
      alert('A Janela de Transferências está Fechada! Transferências só em Jan, Jul e Set.');
      return;
    }

    if (activeClub.squad.length >= 25) {
      alert('Seu elenco já atingiu o limite máximo de 25 jogadores! Venda um atleta antes de contratar.');
      return;
    }

    if (activeClub.budget < player.marketValue) {
      alert('Orçamento de transferência insuficiente para comprar este atleta!');
      return;
    }

    // Process purchase & update all state references
    const updatedClubs = clubs.map(c => {
      if (c.id === activeClub.id) {
        return {
          ...c,
          budget: c.budget - player.marketValue,
          squad: [...c.squad, player]
        };
      }
      if (c.id === sellerClub?.id) {
        return {
          ...c,
          budget: c.budget + player.marketValue,
          squad: c.squad.filter(p => p.id !== player.id)
        };
      }
      return c;
    });

    setClubs(updatedClubs);
    setBench(prev => [...prev, player]);

    setMailbox(prev => [
      {
        id: Date.now(),
        title: `Transferência Concluída: ${player.name}`,
        sender: 'Gerência de Futebol',
        date: `${date.day}/${date.month}/${date.year}`,
        read: false,
        text: `Contratação finalizada! ${player.name} (${player.position} - ${player.ovr} OVR) já se juntou ao elenco.`
      },
      ...prev
    ]);

    alert(`Sucesso! ${player.name} foi contratado e adicionado ao seu elenco!`);
  };

  // Sell Player Feature
  const handleSellPlayer = (player) => {
    if (!isTransferWindowOpen) {
      alert('A Janela de Transferências está Fechada! Vendas só em Jan, Jul e Set.');
      return;
    }

    if (activeClub.squad.length <= 11) {
      alert('Você precisa manter pelo menos 11 jogadores no elenco!');
      return;
    }

    const saleValue = Math.round(player.marketValue * 0.9);

    const updatedClubs = clubs.map(c => {
      if (c.id === activeClub.id) {
        return {
          ...c,
          budget: c.budget + saleValue,
          squad: c.squad.filter(p => p.id !== player.id)
        };
      }
      return c;
    });

    setClubs(updatedClubs);
    
    // Remove from starters or bench
    if (starters.some(p => p.id === player.id)) {
      const remainingStarters = starters.filter(p => p.id !== player.id);
      const subFromBench = bench[0];
      if (subFromBench) {
        setStarters([...remainingStarters, { ...subFromBench, gridPos: player.gridPos }]);
        setBench(bench.filter(p => p.id !== subFromBench.id));
      }
    } else {
      setBench(bench.filter(p => p.id !== player.id));
    }

    setMailbox(prev => [
      {
        id: Date.now(),
        title: `Venda Concluída: ${player.name}`,
        sender: 'Departamento Financeiro',
        date: `${date.day}/${date.month}/${date.year}`,
        read: false,
        text: `Venda efetuada com sucesso. O valor de $${(saleValue / 1000000).toFixed(1)}M foi adicionado ao seu orçamento.`
      },
      ...prev
    ]);

    alert(`Venda realizada com sucesso por $${(saleValue / 1000000).toFixed(1)}M!`);
  };

  // Save Manager Profile Customization
  const handleSaveManagerProfile = () => {
    setManager(prev => ({
      ...prev,
      name: managerEditForm.name || prev.name,
      nationality: managerEditForm.nationality,
      outfit: managerEditForm.outfit,
      philosophy: managerEditForm.philosophy
    }));
    setIsEditingManager(false);
  };

  // -----------------------------------------
  // 1. STARTER CLUB SELECTION SCREEN
  // -----------------------------------------
  if (!manager.clubId) {
    const starterClubs = clubs.filter(c => c.minOvr <= manager.ovr);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 max-w-md mx-auto">
        <header className="text-center py-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" /> Modo Carreira Técnica 2026/27
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Escolha seu Primeiro Clube</h1>
          <p className="text-xs text-slate-400">
            Você inicia com <span className="text-emerald-400 font-bold">50 OVR</span>. Selecione um clube da 1ª divisão de menor exigência para começar sua jornada!
          </p>
        </header>

        <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
          {starterClubs.map(club => (
            <div
              key={club.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-emerald-500/50 transition cursor-pointer group"
              onClick={() => handleSelectStartingClub(club)}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {club.league}
                </span>
                <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition">
                  {club.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Esquema: <strong className="text-slate-200">{club.format}</strong></span>
                  <span>Verba: <strong className="text-emerald-400">${(club.budget / 1000000).toFixed(1)}M</strong></span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-xs font-black bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-xl text-slate-300">
                  {club.baseOvr} OVR
                </span>
                <button className="text-xs bg-emerald-600 group-hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1">
                  Assinar <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center text-[11px] text-slate-500 py-4">
          Primeira Divisão • Brasileirão, Premier League & Bundesliga
        </footer>
      </div>
    );
  }

  // -----------------------------------------
  // 2. IN-MATCH PURE TEXT SIMULATION SCREEN
  // -----------------------------------------
  if (inMatch) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-md mx-auto flex flex-col justify-between">
        {/* Top Scoreboard Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>{activeClub.name}</span>
            <span className="text-emerald-400">{matchState.minute}' MIN</span>
            <span>{matchState.opponent?.name}</span>
          </div>

          <div className="flex justify-center items-center gap-6">
            <span className="text-4xl font-black text-white">{matchState.homeGoals}</span>
            <span className="text-sm font-bold text-slate-600">X</span>
            <span className="text-4xl font-black text-white">{matchState.awayGoals}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300" 
              style={{ width: `${(matchState.minute / 90) * 100}%` }}
            />
          </div>
        </div>

        {/* Live Match Commentary Feed */}
        <div className="flex-1 my-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 overflow-y-auto space-y-2.5 max-h-[55vh]">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" /> Narração em Tempo Real
          </h3>
          {matchState.events.map((evt, idx) => (
            <div 
              key={idx}
              className={`text-xs p-2.5 rounded-xl border ${
                evt.includes('GOOOOL') || evt.includes('GOL')
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-extrabold'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              {evt}
            </div>
          ))}
        </div>

        {/* Match Controls */}
        {matchState.isFinished && (
          <button
            onClick={() => setInMatch(false)}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-extrabold text-white rounded-2xl transition active:scale-98 shadow-lg shadow-emerald-950"
          >
            Voltar para a Central Tática
          </button>
        )}
      </div>
    );
  }

  // -----------------------------------------
  // 3. MAIN DASHBOARD INTERFACE
  // -----------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col max-w-md mx-auto border-x border-slate-900 shadow-2xl">
      
      {/* HEADER SECTION */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-30">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-white text-base tracking-tight">{activeClub.name}</h2>
              <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold px-1.5 py-0.5 rounded">
                {activeClub.league}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {manager.name} ({manager.ovr} OVR)
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <DollarSign className="w-3.5 h-3.5" />
              <span>${(activeClub.budget / 1000000).toFixed(1)}M</span>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1 justify-end mt-0.5">
              <Calendar className="w-3 h-3" />
              <span>{date.day}/{date.month}/{date.year}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto pb-20">

        {/* TOP MATCH PLAY BAR */}
        <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-emerald-800/50 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Próximo Desafio</span>
            <h3 className="font-black text-white text-sm">Partida Oficial de Liga</h3>
          </div>
          <button
            onClick={startMatch}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition active:scale-95 text-xs"
          >
            <Play className="w-4 h-4 fill-current" /> Jogar Partida
          </button>
        </div>

        {/* 1. TACTICS BOARD VIEW (4x5 GRID) */}
        {activeTab === 'tactics' && (
          <div className="space-y-4">
            
            {/* Formation Selector Presets */}
            <div className="flex justify-between items-center bg-slate-900 p-2 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400">Esquema:</span>
              <div className="flex gap-1">
                {['4-3-3', '3-5-2', '4-4-2', '4-2-3-1'].map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => {
                      setTacticsStyle(prev => ({ ...prev, formation: fmt }));
                      setStarters(prev => prev.map((p, idx) => ({ ...p, gridPos: getPresetGridPos(fmt, idx) })));
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      tacticsStyle.formation === fmt ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4x5 INTERACTIVE GRID PITCH */}
            <div className="bg-emerald-950/40 border-2 border-emerald-800/80 rounded-2xl p-3 relative shadow-inner overflow-hidden">
              <div className="absolute inset-0 border-b border-emerald-700/30 top-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute inset-[15%] border border-emerald-700/20 rounded-full pointer-events-none" />

              <div className="text-[10px] text-emerald-500/60 font-bold uppercase tracking-wider text-center mb-1">
                Linha Ofensiva / Ataque
              </div>

              {/* Grid 4 Rows x 5 Cols */}
              <div className="grid grid-rows-4 gap-1.5 h-84 relative z-10">
                {[3, 2, 1, 0].map(rowIdx => (
                  <div key={rowIdx} className="grid grid-cols-5 gap-1.5">
                    {[0, 1, 2, 3, 4].map(colIdx => {
                      const playerInCell = starters.find(
                        p => p.gridPos?.row === rowIdx && p.gridPos?.col === colIdx
                      );

                      return (
                        <div
                          key={colIdx}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (draggedPlayer) {
                              handleMovePlayerGrid(draggedPlayer.id, rowIdx, colIdx);
                              setDraggedPlayer(null);
                            }
                          }}
                          onClick={() => {
                            if (selectedPlayer && !playerInCell) {
                              handleMovePlayerGrid(selectedPlayer.id, rowIdx, colIdx);
                              setSelectedPlayer(null);
                            }
                          }}
                          className={`border border-emerald-600/25 rounded-xl flex items-center justify-center relative transition-all min-h-[56px] ${
                            playerInCell ? 'bg-slate-900/90 border-slate-700 shadow-md' : 'hover:bg-emerald-900/20'
                          }`}
                        >
                          {playerInCell ? (
                            <div 
                              draggable
                              onDragStart={() => setDraggedPlayer(playerInCell)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPlayer(playerInCell);
                              }}
                              className={`w-full h-full p-1 flex flex-col items-center justify-center cursor-pointer rounded-xl transition touch-action-none ${
                                selectedPlayer?.id === playerInCell.id ? 'ring-2 ring-yellow-400 bg-slate-800' : ''
                              }`}
                            >
                              <span className="text-[8px] font-extrabold px-1 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                                {playerInCell.position}
                              </span>
                              <span className="text-[10px] font-bold text-white truncate max-w-[55px] mt-0.5">
                                {playerInCell.name.split(' ')[1] || playerInCell.name}
                              </span>
                              <span className="text-[8px] font-black text-slate-300">
                                {playerInCell.ovr} OVR
                              </span>
                            </div>
                          ) : (
                            <span className="text-[7px] text-emerald-600/40 font-bold uppercase">
                              {rowIdx === 0 ? 'GOL' : rowIdx === 1 ? 'DEF' : rowIdx === 2 ? 'MEI' : 'ATA'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-emerald-500/60 font-bold uppercase tracking-wider text-center mt-1">
                Gol / Defesa
              </div>
            </div>

            {/* Tactical Sliders */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Ajustes Táticos
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Ritmo de Jogo</span>
                    <span className="font-bold text-emerald-400">{tacticsStyle.tempo}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tacticsStyle.tempo}
                    onChange={(e) => setTacticsStyle(prev => ({ ...prev, tempo: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Pressão Sem a Bola</span>
                    <span className="font-bold text-emerald-400">{tacticsStyle.pressing}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tacticsStyle.pressing}
                    onChange={(e) => setTacticsStyle(prev => ({ ...prev, pressing: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Amplitude Tática</span>
                    <span className="font-bold text-emerald-400">{tacticsStyle.width}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tacticsStyle.width}
                    onChange={(e) => setTacticsStyle(prev => ({ ...prev, width: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. SQUAD MANAGEMENT VIEW */}
        {activeTab === 'squad' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-sm">Elenco Principal</h3>
                <p className="text-xs text-slate-400">Total: {activeClub.squad.length} / 25 Atletas</p>
              </div>
              {selectedPlayer && (
                <span className="text-xs bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-2.5 py-1 rounded-lg font-bold">
                  Substituindo {selectedPlayer.name}
                </span>
              )}
            </div>

            {/* Bench Players List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Reservas Disponíveis</h4>
              {bench.map(player => (
                <div
                  key={player.id}
                  onClick={() => selectedPlayer ? handleSubstitute(player) : null}
                  className={`bg-slate-900 border border-slate-850 p-3 rounded-xl flex items-center justify-between text-xs transition ${
                    selectedPlayer ? 'hover:border-yellow-400 cursor-pointer bg-slate-850' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-slate-800 text-emerald-400 rounded border border-slate-700">
                      {player.position}
                    </span>
                    <div>
                      <h5 className="font-bold text-white">{player.name}</h5>
                      <span className="text-[10px] text-slate-400">{player.age} anos • Salário: ${(player.salaryWeekly).toLocaleString()}/sem</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-black text-white text-sm">{player.ovr} OVR</span>
                    {selectedPlayer && (
                      <button className="px-2 py-1 bg-yellow-500 text-slate-950 font-black rounded text-[10px]">
                        Entrar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TRANSFER MARKET VIEW (FIXED BUY & SELL) */}
        {activeTab === 'transfers' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-white text-base">Mercado de Transferências</h3>
                <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                  isTransferWindowOpen ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {isTransferWindowOpen ? 'Janela Aberta' : 'Janela Fechada'}
                </span>
              </div>
              
              {/* Buy / Sell Toggle Tabs */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setTransferMode('BUY')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                    transferMode === 'BUY' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Comprar Atletas
                </button>
                <button
                  onClick={() => setTransferMode('SELL')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                    transferMode === 'SELL' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Vender Meus Atletas
                </button>
              </div>
            </div>

            {/* Position Filter */}
            <div className="flex gap-1 overflow-x-auto pb-1 text-xs">
              {['ALL', ...POSITIONS].map(pos => (
                <button
                  key={pos}
                  onClick={() => setTransferFilter(pos)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                    transferFilter === pos ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Transfer List */}
            {transferMode === 'BUY' ? (
              <div className="space-y-2">
                {clubs
                  .filter(c => c.id !== activeClub.id)
                  .flatMap(c => c.squad.map(p => ({ ...p, sellerClub: c })))
                  .filter(p => transferFilter === 'ALL' || p.position === transferFilter)
                  .slice(0, 18)
                  .map(player => (
                    <div key={player.id} className="bg-slate-900 border border-slate-850 p-3 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{player.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 rounded text-emerald-400 font-bold">{player.position}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{player.sellerClub.name} • {player.age} anos</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-black text-white block">{player.ovr} OVR</span>
                          <span className="text-[10px] font-bold text-emerald-400">${(player.marketValue / 1000000).toFixed(1)}M</span>
                        </div>

                        <button
                          onClick={() => handleBuyPlayer(player, player.sellerClub)}
                          className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-bold transition active:scale-95 text-xs"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-2">
                {activeClub.squad
                  .filter(p => transferFilter === 'ALL' || p.position === transferFilter)
                  .map(player => (
                    <div key={player.id} className="bg-slate-900 border border-slate-850 p-3 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{player.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 rounded text-emerald-400 font-bold">{player.position}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Valor de Venda Estimado: ${(player.marketValue * 0.9 / 1000000).toFixed(1)}M</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-black text-white block">{player.ovr} OVR</span>

                        <button
                          onClick={() => handleSellPlayer(player)}
                          className="p-2 bg-rose-600 hover:bg-rose-500 rounded-lg text-white font-bold transition active:scale-95 text-xs"
                        >
                          Vender
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* 4. LEAGUE & STANDINGS VIEW */}
        {activeTab === 'league' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <h3 className="font-bold text-white text-base mb-1">{activeClub.league}</h3>
              <p className="text-xs text-slate-400">Classificação e zonas diretas de torneios continentais.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                    <th className="p-2.5">Clube</th>
                    <th className="p-2.5 text-center">Esquema</th>
                    <th className="p-2.5 text-right">OVR Base</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {clubs
                    .filter(c => c.league === activeClub.league)
                    .map((club, idx) => (
                      <tr 
                        key={club.id}
                        className={club.id === activeClub.id ? 'bg-emerald-950/30 font-bold' : ''}
                      >
                        <td className="p-2.5 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            idx === 0 ? 'bg-amber-400' : idx <= 2 ? 'bg-blue-400' : 'bg-slate-600'
                          }`} />
                          <span className="text-white truncate">{club.name}</span>
                        </td>
                        <td className="p-2.5 text-center text-slate-400">{club.format}</td>
                        <td className="p-2.5 text-right font-bold text-emerald-400">{club.baseOvr}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. MAILBOX VIEW */}
        {activeTab === 'mailbox' && (
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base px-1">Caixa de Mensagens</h3>

            {mailbox.map(mail => (
              <div 
                key={mail.id}
                className="bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-slate-500 block">{mail.sender} • {mail.date}</span>
                    <h4 className="font-bold text-white text-xs mt-0.5">{mail.title}</h4>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{mail.text}</p>

                {mail.clubOfferId && (
                  <button
                    onClick={() => acceptJobOffer(mail.clubOfferId)}
                    className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition active:scale-95"
                  >
                    Aceitar Proposta e Assinar Contrato
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 6. MANAGER CUSTOMIZATION & PROFILE VIEW */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 font-black text-2xl shadow-inner">
                  {manager.ovr}
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">{manager.name}</h3>
                  <p className="text-xs text-slate-400">{manager.nationality} • {manager.outfit}</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded mt-1">
                    {manager.philosophy}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setManagerEditForm({ ...manager });
                  setIsEditingManager(true);
                }}
                className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5 text-emerald-400" /> Editar Perfil do Técnico
              </button>
            </div>

            {/* Manager Career Stats */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" /> Estatísticas de Carreira
              </h4>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <span className="text-[10px] text-slate-500 block">Vitórias</span>
                  <span className="text-base font-black text-emerald-400">{manager.wins}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <span className="text-[10px] text-slate-500 block">Empates</span>
                  <span className="text-base font-black text-yellow-400">{manager.draws}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <span className="text-[10px] text-slate-500 block">Derrotas</span>
                  <span className="text-base font-black text-rose-400">{manager.losses}</span>
                </div>
              </div>
            </div>

            {/* Customization Modal */}
            {isEditingManager && (
              <div className="bg-slate-900 border border-emerald-500/40 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Personalizar Treinador</h4>
                  <button onClick={() => setIsEditingManager(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Nome do Técnico</label>
                    <input 
                      type="text"
                      value={managerEditForm.name}
                      onChange={(e) => setManagerEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 font-semibold outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Nacionalidade</label>
                    <select
                      value={managerEditForm.nationality}
                      onChange={(e) => setManagerEditForm(prev => ({ ...prev, nationality: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 font-semibold outline-none focus:border-emerald-500"
                    >
                      {NATIONALITIES.map(nat => (
                        <option key={nat} value={nat}>{nat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Estilo & Vestuário (Traje)</label>
                    <select
                      value={managerEditForm.outfit}
                      onChange={(e) => setManagerEditForm(prev => ({ ...prev, outfit: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 font-semibold outline-none focus:border-emerald-500"
                    >
                      {OUTFITS.map(out => (
                        <option key={out} value={out}>{out}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Filosofia Tática Preferida</label>
                    <select
                      value={managerEditForm.philosophy}
                      onChange={(e) => setManagerEditForm(prev => ({ ...prev, philosophy: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 font-semibold outline-none focus:border-emerald-500"
                    >
                      {TACTICAL_PHILOSOPHIES.map(phil => (
                        <option key={phil} value={phil}>{phil}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSaveManagerProfile}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition active:scale-95"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* BOTTOM THUMB NAVIGATION BAR */}
      <nav className="bg-slate-900 border-t border-slate-800 p-2 sticky bottom-0 z-30">
        <div className="grid grid-cols-6 gap-1 text-center">
          
          <button
            onClick={() => setActiveTab('tactics')}
            className={`py-2 rounded-xl flex flex-col items-center gap-1 transition ${
              activeTab === 'tactics' ? 'bg-emerald-600/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span className="text-[9px]">Campo</span>
          </button>

          <button
            onClick={() => setActiveTab('squad')}
            className={`py-2 rounded-xl flex flex-col items-center gap-1 transition ${
              activeTab === 'squad' ? 'bg-emerald-600/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[9px]">Elenco</span>
          </button>

          <button
            onClick={() => setActiveTab('transfers')}
            className={`py-2 rounded-xl flex flex-col items-center gap-1 transition ${
              activeTab === 'transfers' ? 'bg-emerald-600/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-[9px]">Mercado</span>
          </button>

          <button
            onClick={() => setActiveTab('league')}
            className={`py-2 rounded-xl flex flex-col items-center gap-1 transition ${
              activeTab === 'league' ? 'bg-emerald-600/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span className="text-[9px]">Tabela</span>
          </button>

          <button
            onClick={() => setActiveTab('mailbox')}
            className={`py-2 rounded-xl flex flex-col items-center gap-1 transition relative ${
              activeTab === 'mailbox' ? 'bg-emerald-600/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className="text-[9px]">Correio</span>
            {mailbox.some(m => !m.read) && (
              <span className="absolute top-1 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 rounded-xl flex flex-col items-center gap-1 transition ${
              activeTab === 'profile' ? 'bg-emerald-600/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[9px]">Técnico</span>
          </button>

        </div>
      </nav>

    </div>
  );
}