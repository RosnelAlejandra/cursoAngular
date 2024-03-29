import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDirTitles]'
})
export class DirTitlesDirective {

  constructor(elemtRef: ElementRef, renderer: Renderer2) {
    console.log('DirTitlesDirective directive');
    renderer.setStyle(elemtRef.nativeElement, 'font-size', '25px');
    renderer.setStyle(elemtRef.nativeElement, 'font-style', 'italic');
    renderer.setStyle(elemtRef.nativeElement, 'margin', '2px');
    renderer.setStyle(elemtRef.nativeElement, 'padding', '2px');
  }
}
