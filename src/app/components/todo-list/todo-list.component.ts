import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoUIActions } from 'src/app/todo-store';
import { State } from 'src/app/todo-store/todo.reducer';
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

  handleTodoClicked(clickedTodo: TodoModel) {
    this.store.dispatch(TodoUIActions.toggleTodoRequested({ todo: clickedTodo }));
  }

}
