import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { TodoModel } from '../models/todo.model';
import { environment } from 'src/environments/environment';

describe('TodoService', () => {
  let todoService: TodoService;
  let http: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    todoService = TestBed.get(TodoService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should return an Observable of 3 todos', () => {
    const mockedTodos: Array<TodoModel> = [
      { id: 1, title: 'Todo 1', isClosed: false },
      { id: 2, title: 'Todo 2', isClosed: false },
      { id: 3, title: 'Todo 3', isClosed: true }
    ];

    let retrievedTodos: Array<TodoModel> = [];
    todoService.list().subscribe((todos: Array<TodoModel>) => (retrievedTodos = todos));

    http.expectOne(`${environment.baseUrl}/api/todos`).flush(mockedTodos);

    expect(retrievedTodos.length)
      .withContext('The `list` method should return an array of TodoModel wrapped in an Observable')
      .not.toBe(0);
    expect(retrievedTodos).toEqual(mockedTodos);
  });

  it('should return an Observable of 0 todo', () => {
    const mockedTodos: Array<TodoModel> = [];

    let actualTodos: Array<TodoModel> = [];
    todoService.list().subscribe((todos: Array<TodoModel>) => (actualTodos = todos));

    http.expectOne(`${environment.baseUrl}/api/todos`).flush(mockedTodos);

    expect(actualTodos.length)
      .withContext('The `list` method should return an array of TodoModel wrapped in an Observable')
      .toBe(0);
  });
});
