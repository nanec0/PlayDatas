export interface Play {
  team: 'home' | 'away';
  chico: string;
  jugador: string;
  tipoDeJuego: 'abierto' | 'parado';
  resultado: 'gol' | 'atajado' | 'desviado' | 'bloqueado';
  zona: string;
}