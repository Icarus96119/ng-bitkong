import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';

import { AlertModule } from '../ui-kit/alert/alert.module';
import { LayoutModule } from '../layout/layout.module';

import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    NgSelectModule,
    LayoutModule,
    AlertModule.forRoot(),
    MainRoutingModule
  ]
})
export class MainModule { }
