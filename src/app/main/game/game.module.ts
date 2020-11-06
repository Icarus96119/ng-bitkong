import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { StatisticModule } from '../../statistic/statistic.module';
import { TableModule } from '../../ui-kit/table/table.module';
import { DirectivesModule } from '../../ui-kit/directives/directives.module';
import { CommonUiKitModule } from '../../ui-kit/common-ui-kit/common-ui-kit.module';
import { AlertModule } from '../../ui-kit/alert/alert.module';

import { GameRoutingModule } from './game-routing.module';

import { GameComponent } from './game.component';


@NgModule({
  declarations: [
    GameComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    Ng5SliderModule,
    StatisticModule,
    TableModule,
    DirectivesModule,
    CommonUiKitModule,
    AlertModule.forRoot(),
    GameRoutingModule,
  ]
})
export class GameModule { }
