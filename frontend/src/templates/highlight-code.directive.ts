import { Directive, ElementRef, OnInit } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
// import 'highlight.js/styles/default.css';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);

@Directive({
  selector: '[appHighlightCode]',
  standalone: true
})
export class HighlightCodeDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      hljs.highlightElement(this.el.nativeElement);
      
      this.el.nativeElement.style.whiteSpace = 'pre-wrap';
    }, 0);
  }
}
