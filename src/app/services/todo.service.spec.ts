import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TodoModel } from '../models/todo.model';
import { TodoService } from './todo.service';

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

  afterAll(() => http.verify());

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should return an Observable of 3 todos', () => {
    const mockedTodos: Array<TodoModel> = [
      { id: 1, title: 'Todo 1', isClosed: false, lastUpdateTimestamp: 1579179834 },
      { id: 2, title: 'Todo 2', isClosed: false, lastUpdateTimestamp: 1579179834 },
      { id: 3, title: 'Todo 3', isClosed: true, lastUpdateTimestamp: 1579179834 }
    ];

    let retrievedTodos: Array<TodoModel> = [];
    todoService.list().subscribe((todos: Array<TodoModel>) => (retrievedTodos = todos));

    const request = http.expectOne(`${environment.baseUrl}/api/todos`);
    expect(request.request.method).toEqual('GET');
    request.flush(mockedTodos);

    expect(retrievedTodos.length)
      .withContext('The `list` method should return an array of TodoModel wrapped in an Observable')
      .not.toBe(0);
    expect(retrievedTodos).toEqual(mockedTodos);
  });

  it('should return an Observable of 0 todo', () => {
    const mockedTodos: Array<TodoModel> = [];

    let actualTodos: Array<TodoModel> = [];
    todoService.list().subscribe((todos: Array<TodoModel>) => (actualTodos = todos));

    const request = http.expectOne(`${environment.baseUrl}/api/todos`);
    expect(request.request.method).toEqual('GET');
    request.flush(mockedTodos);

    expect(actualTodos.length)
      .withContext('The `list` method should return an array of TodoModel wrapped in an Observable')
      .toBe(0);
  });

  it('should update todo', () => {
    const mockedTodo: TodoModel = { id: 1, title: 'Todo 1', isClosed: false, lastUpdateTimestamp: 1579179834 };

    todoService.update({ ...mockedTodo }).subscribe();

    const request = http.expectOne({ method: 'PUT', url: `${environment.baseUrl}/api/todos/${mockedTodo.id}` });
    const requestTodoPayload = request.request.body;

    expect(requestTodoPayload.lastUpdateTimestamp).toBeGreaterThan(mockedTodo.lastUpdateTimestamp);
    expect(requestTodoPayload.id).toEqual(mockedTodo.id);
    expect(requestTodoPayload.title).toEqual(mockedTodo.title);
    expect(requestTodoPayload.isClosed).toEqual(mockedTodo.isClosed);
  });

  it('should get a todo', () => {
    const mockedTodo: TodoModel = { id: 1, title: 'Todo 1', isClosed: false, lastUpdateTimestamp: 1579179834 };
    let actualTodo: TodoModel;

    todoService.get(mockedTodo.id).subscribe((todo: TodoModel) => (actualTodo = todo));

    const request = http.expectOne({ method: 'GET', url: `${environment.baseUrl}/api/todos/${mockedTodo.id}` });
    request.flush(mockedTodo);

    expect(actualTodo).toEqual(mockedTodo);
  });

  it('should create a todo', () => {
    const mockedTodo: TodoModel = { id: 1, title: 'Todo 1', isClosed: false, lastUpdateTimestamp: 1579179834 };
    let createdTodo: TodoModel;

    todoService.create(mockedTodo).subscribe((todo: TodoModel) => (createdTodo = todo));

    const request = http.expectOne({ method: 'POST', url: `${environment.baseUrl}/api/todos` });
    const requestTodoPayload = request.request.body;

    request.flush(mockedTodo);

    expect(requestTodoPayload).toEqual(mockedTodo);
    expect(createdTodo).toEqual(mockedTodo);
  });
});
