import { Component, OnInit } from '@angular/core';

import { heroHallColumns, heroHallTypes } from '../../../core/data/hero-hall-types';
import { heroHallData } from '../../../core/data/temp-data';

@Component({
  selector: 'bitkong-hero-hall',
  templateUrl: './hero-hall.component.html',
  styleUrls: ['./hero-hall.component.scss']
})
export class HeroHallComponent implements OnInit {

  heroHallColumns = heroHallColumns;
  heroHallData = heroHallData;

  constructor() { }

  ngOnInit(): void {
  }

}
