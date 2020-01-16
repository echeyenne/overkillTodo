import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from 'src/app/models/todo.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/todo-store/todo.reducer';
import { TodoUIActions } from 'src/app/todo-store';
import { selectTodoList } from 'src/app/todo-store/todo.selector';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<TodoModel[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.todos$ = this.store.select(selectTodoList);
    this.store.dispatch(TodoUIActions.loadAllRequested());
  }

}
