import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { TableModule } from '../ui-kit/table/table.module';

import { HeroHallComponent } from './hero-hall/hero-hall.component';
import { PlayHistoryComponent } from './play-history/play-history.component';

@NgModule({
  declarations: [
    HeroHallComponent,
    PlayHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    TableModule
  ],
  exports: [
    HeroHallComponent,
    PlayHistoryComponent
  ]
})
export class StatisticModule { }
