import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../interfaces/question';

@Pipe({
  name: 'searching',
  standalone: true
})
export class SearchingPipe implements PipeTransform {

  transform(
    questions: Question[],
    searchType: string | null | undefined,
    searchTerm: string | null | undefined
  ): Question[] {
    // console.log( `FilterQuestionsPipe - searchType: ${searchType}, searchTerm: ${searchTerm}`);

    if (!questions || !searchType || !searchTerm) {
      return questions;
    }

    searchTerm = searchTerm.toLowerCase();

    switch (searchType) {
      case 'Keyword':
        return questions.filter(
          (question) =>
            question.Title.toLowerCase().includes(searchTerm!) ||
            question.Body.toLowerCase().includes(searchTerm!) 
            
        );
      case 'User':
        return questions.filter((question) =>
          question.Name.toLowerCase().includes(searchTerm!)
        );
      
      default:
        return questions;
    }
  }
}
