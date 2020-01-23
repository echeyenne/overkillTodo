import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  list(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${environment.baseUrl}/api/todos`);
  }

  update(todo: TodoModel): Observable<any> {
    todo.lastUpdateTimestamp = + new Date();
    return this.http.put<void>(`${environment.baseUrl}/api/todos/${todo.id}`, todo);
  }

  get(id: number): Observable<TodoModel> {
    return this.http.get<TodoModel>(`${environment.baseUrl}/api/todos/${id}`);
  }

  create(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(`${environment.baseUrl}/api/todos`, todo);
  }
}
