import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bitkong-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() icon = '';
  @Input() width;
  @Input() color = 'dove-gray';

  constructor() { }

  ngOnInit(): void {
  }

  onMouseEnter() {
  }

  onMouseLeave() {
  }

}
