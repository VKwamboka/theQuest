import { Directive, ElementRef, OnInit } from '@angular/core';
import hljs from 'highlight.js';

@Directive({
  selector: 'code[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    hljs.highlightBlock(this.el.nativeElement);
  }

}
