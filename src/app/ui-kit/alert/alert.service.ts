import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ShowDialogComponent } from './show-dialog/show-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dialog: MatDialog
  ) { }

  showDialog(title: string, content: string): Observable<boolean> {
    const dialog = this.dialog.open(ShowDialogComponent, {
      disableClose: true,
      data: { title, content }
    });
    return dialog.afterClosed();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
