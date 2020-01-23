import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoUIActions } from 'src/app/todo-store';
import { State } from 'src/app/todo-store/todo.reducer';
import { selectTodo } from 'src/app/todo-store/todo.selector';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  todo$: Observable<TodoModel>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('todoId');
    this.store.dispatch(TodoUIActions.loadAllRequested());
    this.todo$ = this.store.select(selectTodo, { todoId: id });
  }

}
