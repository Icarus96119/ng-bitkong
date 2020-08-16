import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonUiKitModule } from '../common-ui-kit/common-ui-kit.module';

import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    CommonUiKitModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
