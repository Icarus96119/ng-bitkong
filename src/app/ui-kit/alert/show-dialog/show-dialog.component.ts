import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GamePlayResult } from '../../../core/models/game';

@Component({
  selector: 'bitkong-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent implements OnInit {

  GamePlayResult = GamePlayResult;
  title: GamePlayResult;
  content: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
  }

}
