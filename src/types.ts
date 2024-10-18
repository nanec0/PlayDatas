// types.ts

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  number: string;
  position?: string;
  teamId: string;
}

export interface Tournament {
  id: string;
  name: string;
  matches?: Match[];
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  tournamentId: string;
  date: Date;
  plays: Play[];
}

export interface Play {
  team: string;
  chico: string;
  jugador: string;
  tipoDeJuego: 'abierto' | 'parado';
  resultado: 'gol' | 'atajado' | 'desviado' | 'bloqueado';
  zona: string;
}
