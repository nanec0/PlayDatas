export interface Play {
  team: 'home' | 'away';
  chico: string;
  jugador: string;
  tipoDeJuego: 'abierto' | 'parado';
  resultado: 'gol' | 'atajado' | 'desviado' | 'bloqueado';
  zona: string;
}

export interface Player {
  id: string;
  name: string;
  number: string;
  position: string;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface Match {
  id: string;
  date: string;
  homeTeam: Team;
  awayTeam: Team;
  plays: Play[];
}