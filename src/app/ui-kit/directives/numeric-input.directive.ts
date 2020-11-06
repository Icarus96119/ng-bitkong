import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[bitkongNumericInput]'
})
export class NumericInputDirective {

  constructor(private el: ElementRef) { }

  @Input() maxValue: number;
  @Input() minValue: number;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    // let currentValue = Number(event.target.value);
    // if (currentValue < Number(this.minValue) || currentValue > Number(this.maxValue)) {
    //   e.preventDefault();
    // } else if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
    //   // Allow: Ctrl+A
    //   (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
    //   // Allow: Ctrl+C
    //   (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
    //   // Allow: Ctrl+V
    //   (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
    //   // Allow: Ctrl+X
    //   (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
    //   // Allow: home, end, left, right
    //   (e.keyCode >= 35 && e.keyCode <= 39)) {
    //   // let it happen, don't do anything
    //   return;
    // }
    // // Ensure that it is a number and stop the keypress
    // if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    //   e.preventDefault();
    // }
    if (Number(event.target.value) > Number(this.maxValue)
      && e.keyCode !== 46 // keycode for delete
      && e.keyCode !== 8 // keycode for backspace
    ) {
      e.preventDefault();
      event.target.value = Number(this.maxValue);
    }
    // if (Number(event.target.value) < Number(this.minValue)) {
    //   e.preventDefault();
    //   event.target.value = Number(this.minValue);
    // }
    // if (Number(event.target.value) >= Number(this.minValue)) {
    //   if(event.target.value.toString().length < this.minValue.toString().length) {
    //     if (e.keyCode === 46 || e.keyCode === 8) {
    //       e.preventDefault();
    //     }
    //   }
    // }
  }

}
