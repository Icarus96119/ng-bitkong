import { StatisticsType } from '../models/statistics';
import { ColumnTypes } from '../models/table';

export const statisticsTypes = [
  {
    value: StatisticsType.Recent,
    label: 'RECENT',
    columns: [
      { name: 'player', label: 'PLAYER', width: '30%', type: ColumnTypes.Player, },
      { name: 'bet', label: 'BET', width: '25%' },
      { name: 'profit', label: 'PROFIT', width: '25%' },
      { name: 'step', label: 'STEP', width: '20%', type: ColumnTypes.Step }
    ]
  },
  {
    value: StatisticsType.MyPlays,
    label: 'MY PLAYS',
    columns: [
      { name: 'date', label: 'DATE', width: '30%', type: ColumnTypes.Player, },
      { name: 'bet', label: 'BET', width: '25%' },
      { name: 'profit', label: 'PROFIT', width: '25%' },
      { name: 'step', label: 'STEP', width: '20%', type: ColumnTypes.Step }
    ]
  },
  {
    value: StatisticsType.BigWins,
    label: 'BIG WINS',
    columns: [
      { name: 'player', label: 'PLAYER', width: '30%', type: ColumnTypes.Player, },
      { name: 'bet', label: 'BET', width: '25%' },
      { name: 'profit', label: 'PROFIT', width: '25%' },
      { name: 'step', label: 'STEP', width: '20%', type: ColumnTypes.Step }
    ]
  },
];