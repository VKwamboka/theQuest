import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightCodeDirective } from 'src/app/highlight-code.directive';


@Component({
  selector: 'app-full-question',
  standalone: true,
  imports: [CommonModule, HighlightCodeDirective],
  templateUrl: './full-question.component.html',
  styleUrls: ['./full-question.component.css'],
  // hostDirectives: [HighlightCodeDirective]

})
export class FullQuestionComponent {
highlightBlock: any;

}
