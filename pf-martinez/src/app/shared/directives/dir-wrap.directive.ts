import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDirWrap]'
})
export class DirWrapDirective {

  constructor(elemtRef: ElementRef, renderer: Renderer2) {
    console.log('DirCardDirective directive');
    renderer.setStyle(elemtRef.nativeElement, 'background', '#c2185b 0% 0% no-repeat padding-box');
    renderer.setStyle(elemtRef.nativeElement, 'box-shadow', '0px 0px 6px #00000029');
    renderer.setStyle(elemtRef.nativeElement, 'border-radius', '5px');
    renderer.setStyle(elemtRef.nativeElement, 'margin-top', '5px');
  }

}
