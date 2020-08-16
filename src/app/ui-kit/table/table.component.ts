import { Component, OnInit, Input } from '@angular/core';

import { ColumnTypes, TableColumn } from '../../core/models/table';

@Component({
  selector: 'bitkong-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() columns: TableColumn[] = [];
  @Input() rows: any[] = [];
  @Input() loading: boolean;
  @Input() emptyDescription = `No items to display.`;

  ColumnTypes = ColumnTypes;

  constructor() { }

  ngOnInit(): void {
  }

}
