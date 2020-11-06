export interface TableColumn {
  name: string;
  label: string;
  width: string;
  type?: ColumnTypes;
  className?: string;
}

export enum ColumnTypes {
  Player = 'PLAYER',
  Bet = 'BET',
  Profit = 'PROFIT',
  Step = 'STEP',
  Prize = 'PRIZE',
  Wagered = 'WAGERED'
}