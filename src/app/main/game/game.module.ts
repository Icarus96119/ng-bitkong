import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '../../ui-kit/table/table.module';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HeroHallComponent } from './hero-hall/hero-hall.component';

@NgModule({
  declarations: [
    GameComponent,
    StatisticsComponent,
    HeroHallComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    TableModule
  ]
})
export class GameModule { }
