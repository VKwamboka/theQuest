import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../interfaces/question';

@Pipe({
  name: 'ordering',
  standalone: true
})
export class OrderingPipe implements PipeTransform {

  transform(questions: Question[], sortBy: string): Question[] {
    if (sortBy === 'active') {
      const sortedQuestions = [...questions].sort((a, b) => b.Answers?.length - a.Answers?.length);
      return sortedQuestions;
    

    } 
      // sort from oldest
      else if (sortBy === 'oldest'){
        const sortedQuestions = [...questions].sort((a,b) => new Date(a.QuestionDate).getTime() - new Date(b.QuestionDate).getTime())  
        return sortedQuestions
      }
    else if (sortBy === 'newest') {
      const sortedQuestions = [...questions].sort((a, b) => new Date(b.QuestionDate).getTime() - new Date(a.QuestionDate).getTime());
      return sortedQuestions;
    } 
    else {
      return questions;
    }
  }

}
