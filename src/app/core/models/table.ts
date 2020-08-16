export interface TableColumn {
  name: string;
  label: string;
  width: string;
  type?: ColumnTypes;
  className?: string;
}

export enum ColumnTypes {
  Player = 'PLAYER',
  Step = 'STEP',
  Prize = 'PRIZE',
  Wagered = 'WAGERED'
}