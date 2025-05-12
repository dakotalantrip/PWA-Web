import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMatSymbol], mat-icon',
})
export class MatSymbolDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, 'material-symbols-outlined');
  }
}
