import { Component, OnInit } from '@angular/core';

import { StatisticsType } from '../../../core/models/statistics';
import { statisticsTypes } from '../../../core/data/statistics-types';
import { statisticsData } from '../../../core/data/temp-data';

@Component({
  selector: 'bitkong-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statisticsTypes = statisticsTypes;
  currentStatistics = statisticsTypes[0];
  statisticsData = statisticsData

  constructor() { }

  ngOnInit(): void {
    this.goStatistics(this.currentStatistics);
  }

  goStatistics(item) {
    this.currentStatistics = item;
  }

}
