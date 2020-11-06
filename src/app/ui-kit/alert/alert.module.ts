import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { AlertService } from './alert.service';

import { ShowDialogComponent } from './show-dialog/show-dialog.component';

@NgModule({
  declarations: [
    ShowDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class AlertModule {
  static forRoot(): ModuleWithProviders<AlertModule> {
    return {
      ngModule: AlertModule,
      providers: [ AlertService ]
    };
  }
}

