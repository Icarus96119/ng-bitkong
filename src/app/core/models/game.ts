export enum GameLevel {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD'
}

export enum GameType {
  Demo = 'DEMO',
  Real = 'REAL',
  Zero = 'ZERO',
}

export enum GamePlayResult {
  Start = 'START',
  End = 'END',
  Update = 'UPDATE',
  Resume = 'RESUME',
  Success = 'SUCCESS',
  Pass = 'PASS',
  Fail = 'FAIL',
  Congratulation = 'CONGRATULATION'
}

export enum GameSoundType {
  Background = 'BACKGROUND',
  Success = 'SUCCESS',
  Win = 'WIN',
  Lost = 'LOST',
  Click = 'CLICK',
}

export interface StepInfo {
  step: number;
  limitMoney: number;
}

export interface BitkongSetting {
  id: number;
  difficulty: GameLevel;
  minMoney: number;
  maxMoney: number;
  bettingRatio: number;
  columnCount: number;
  mineCount: number;
  rules: StepInfo[]
}

export interface HashArrayRequest {
  userId: string;
  isFirst: boolean;
  isStart: boolean;
  level: GameLevel;
  gameType: GameType;
  basicBettingMoney: number;
}

export interface HashArrayData {
  hashStr: string;
  clientSeed: string;
}

export interface HashArrayResponse {
  resume?: boolean;
  error?: boolean;
  currentData: HashArrayData;
  nextData: HashArrayData;
}

export interface ConfirmGameRequest {
  userId: number;
  step: number;
  selectedChild: number;
  amount: number;
  level: GameLevel;
  hashStr: string;
  gameType: GameType;
  basicBettingMoney: number;
}

export interface ConfirmGameResponse {
  midResult?: string;
  midAmount?: number;
  message?: GamePlayResult
}

export interface VerifyDataRequest {
  userId: number;
  amount: number;
  hashStr: string;
  step: number;
}

export interface VerifyDataResponse {
  serverSeed?: string;
  gameNumber?: string;
  result?: string;
  step?: number;
  message?: GamePlayResult,
  tryAgain?: string;
  midResult?: string;
  midAmount?: number;
}

export interface GameSetting {
  hashStr: string;
  gameNumber: string;
  serverSeed: string;
  clientSeed: string;
  result: string;
  level: GameLevel;
  basicBettingMoney: number;
}

export interface GameLog {
  id: number;
  amount: number;
  step: number;
  stepLog: string;
  gameType: GameType;
  isEnd: boolean;
  isWin: boolean;
  userId: number;
  gameSetting: GameSetting;
  bettingDate: string;
}

export interface VerifyBuffer {
  id: number;
  userId: number;
  hashStr: string;
  clientSeed: string;
  serverSeed: string;
  result: string;
  gameNumber: string;
}

export interface ResumeDataRequest {
  userId: number;
}

export interface ResumeDataResponse {
  isNew?: boolean;
  current: GameLog;
  next: VerifyBuffer;
}