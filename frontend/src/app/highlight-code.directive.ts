import { Directive, ElementRef, OnInit } from '@angular/core';
import hljs from 'highlight.js';


@Directive({
  selector: '[appHighlightCode]',
  standalone: true
})
export class HighlightCodeDirective {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    hljs.highlightBlock(this.el.nativeElement);
  }
}
