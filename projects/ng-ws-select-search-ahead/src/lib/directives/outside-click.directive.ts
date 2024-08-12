import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
  standalone: true
})
export class OutsideClickDirective {
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.needToClose.emit(true);
    }
  }

  @Output() needToClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}
}
