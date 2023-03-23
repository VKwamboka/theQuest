

//   addComment(comment:addComment):Observable<Message>{
//     return this.http.post<Message>('http://localhost:4000/comments/post',comment)
//   }
//   addVote(vote:Vote):Observable<Message>{
//     return this.http.post<Message>('http://localhost:4000/votes/add',vote)
//   }
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AddQuestion,Question,Message, FullQuestion } from 'src/app/interfaces/question';
import { Answer } from 'src/app/interfaces/answer';
import { Comment } from 'src/app/interfaces/comment';
import { Vote } from 'src/app/interfaces/vote';

@Injectable({
  providedIn: 'root'
})
export class quizService {

  constructor( private http:HttpClient) { }
  question$=new Subject<Question[]>()

// add answer
addAnswer(answer:Answer):Observable<Message>{
    return this.http.post<Message>('http://localhost:5500/answer/writeAnswer',answer)
    }

//  add comments
addComment(comment:Comment):Observable<Message>{
    return this.http.post<Message>('http://localhost:5500/comment/post-comment',comment)
    }
// add vote
addVote(vote:Vote):Observable<Message>{
    return this.http.post<Message>('http://localhost:5500/votes/add',vote)
    }


}