import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryTodoService implements InMemoryDbService {

  createDb() {
    const todos: TodoModel[] = [
      { id: 1, title: 'todo in memory 1', isClosed: false, lastUpdateTimestamp: 1576832903 },
      { id: 2, title: 'todo in memory 2', isClosed: false, lastUpdateTimestamp: 1576832903 },
      { id: 3, title: 'todo in memory 3', isClosed: true, lastUpdateTimestamp: 1576832903 },
      { id: 4, title: 'todo in memory 4', isClosed: false, lastUpdateTimestamp: 1576832903 },
      { id: 5, title: 'todo in memory 5', isClosed: true, lastUpdateTimestamp: 1576832900 },
    ];
    return { todos };
  }

}
