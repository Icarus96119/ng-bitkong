import { Component, OnInit } from '@angular/core';

import { StatisticsType } from '../../core/models/statistics';
import { statisticsTypes } from '../../core/data/statistics-types';

@Component({
  selector: 'bitkong-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
