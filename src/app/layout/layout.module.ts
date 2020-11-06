import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StatisticModule } from '../statistic/statistic.module';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StatisticModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {}