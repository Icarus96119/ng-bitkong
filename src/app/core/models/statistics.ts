import { GameLevel } from './game';

export enum StatisticsType {
  Recent = 'RECENT',
  MyPlays = 'MY_PLAYS',
  BigWins = 'BIG_WINS'
}

export interface PlayLog {
  player: string;
  date: string;
  bet: number;
  profit: number;
  step: number;
  gameLevel: GameLevel
}

export interface HeroLog {
  userId: number;
  rank: number;
  player: string;
  wagered: number;
}