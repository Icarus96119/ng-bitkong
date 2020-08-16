import { HeroHallType } from '../models/heroHall';
import { ColumnTypes } from '../models/table';

export const heroHallColumns = [
  { name: 'rank', label: 'RANK', width: '15%', type: ColumnTypes.Prize },
  { name: 'player', label: 'PLAYER', width: '55%' },
  { name: 'wagered', label: 'WAGERED', width: '30%', type: ColumnTypes.Wagered, className: 'justify-content-end' },
]

export const heroHallTypes = [
  { value: HeroHallType.Daily, label: HeroHallType.Daily },
  { value: HeroHallType.Weekly, label: HeroHallType.Weekly },
  { value: HeroHallType.Monthly, label: HeroHallType.Monthly },
];