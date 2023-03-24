import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AddQuestion,Question,Message, FullQuestion } from 'src/app/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor( private http:HttpClient) { }
  question$=new Subject<Question[]>()

//   add question
  addQuestion(question:AddQuestion):Observable<Message>{
    return this.http.post<Message>('http://localhost:5500/question/postQuestion',question)
  }
  
//   get user's question
  getUserQuestion():Observable<Question[]>{
    return this.http.get<Question[]>(`http://localhost:5500/question/getUserQuestions`);
  }
// get all questions
  getAllQuestions():Observable<Question[]>{
    return this.http.get<Question[]>('http://localhost:5500/question/getAllQuestions');
  }
//   get one question
  getOneQuestion(id:string):Observable<FullQuestion>{
   return  this.http.get<FullQuestion>(`http://localhost:5500/question/getFullQuestionById/${id}`)
  }

//   delete question
  deleteQuestion(id:string):Observable<Message>{
    return  this.http.delete<Message>(`http://localhost:5500/question/deleteQuestion/${id}`)
   }

//  get questions by user
//   delete question
deleteQuestionByUser(id:string):Observable<Message>{
  return  this.http.delete<Message>(`http://localhost:5500/question/deleteQuestion/${id}`)
 }

//   update question
   updateQuestion(id:string,updatedQuestion:AddQuestion):Observable<Question>{
    return  this.http.patch<Question>(`http://localhost:5500/question/updateQuestion/${id}`, updatedQuestion)
   }
 
// pagination
// get all questions
getPagedQuestions(pageNumber?: number, pageSize?: number): Observable<Question[]> {
  let url = 'http://localhost:5500/question/getAllQuestions';
  if (pageNumber && pageSize) {
    url += `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  }
  return this.http.get<Question[]>(url);
}
}