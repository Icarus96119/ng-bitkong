import { HeroHallPeriodType } from '../models/heroHall';
import { ColumnTypes } from '../models/table';

export const heroHallColumns = [
  { name: 'rank', label: 'RANK', width: '20%', type: ColumnTypes.Prize },
  { name: 'player', label: 'PLAYER', width: '50%' },
  { name: 'wagered', label: 'WAGERED', width: '30%', type: ColumnTypes.Wagered, className: 'justify-content-end' },
]

export const heroHallPeriodTypes = [
  { value: HeroHallPeriodType.Daily, label: HeroHallPeriodType.Daily },
  { value: HeroHallPeriodType.Weekly, label: HeroHallPeriodType.Weekly },
  { value: HeroHallPeriodType.Monthly, label: HeroHallPeriodType.Monthly },
];