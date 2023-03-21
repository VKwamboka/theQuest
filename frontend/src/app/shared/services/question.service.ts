import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AddQuestion,Question,Message } from 'src/app/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor( private http:HttpClient) { }
  question$=new Subject<Question[]>()

//   add question
  addQuestion(question:AddQuestion):Observable<Message>{
    return this.http.post<Message>('http://localhost:4000/flights',question)
  }
  
//   get user's question
  getUserQuestion():Observable<Question[]>{
    return this.http.get<Question[]>('http://localhost:4000/flights/booking/emails');
  }
// get all questions
  getAllQuestions():Observable<Question[]>{
    return this.http.get<Question[]>('http://localhost:5500/question/getAllQuestions');
  }
//   get one question
  getOneQuestion(id:string):Observable<Question>{
   return  this.http.get<Question>(`http://localhost:4000/flights/${id}`)
  }

//   delete question
  deleteQuestion(id:string):Observable<Message>{
    return  this.http.delete<Message>(`http://localhost:4000/flights/${id}`)
   }

//   update question
   updateQuestion(id:string,updatedQuestion:AddQuestion):Observable<Question>{
    return  this.http.put<Question>(`http://localhost:4000/flights/${id}`, updatedQuestion)
   }
 

}