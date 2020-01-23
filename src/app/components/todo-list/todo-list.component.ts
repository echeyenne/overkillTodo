import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoUIActions } from 'src/app/todo-store';
import { State } from 'src/app/todo-store/todo.reducer';
import { selectTodoList } from 'src/app/todo-store/todo.selector';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<TodoModel[]>;
  dialogConfig = new MatDialogConfig();

  constructor(private store: Store<State>, private dialog: MatDialog) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '400px';
  }

  ngOnInit() {
    this.todos$ = this.store.select(selectTodoList);
    this.store.dispatch(TodoUIActions.loadAllRequested());
  }

  handleTodoClicked(clickedTodo: TodoModel) {
    this.store.dispatch(TodoUIActions.toggleTodoRequested({ todo: clickedTodo }));
  }

  openAddDialog() {
    this.dialog.open(CreateTodoDialogComponent, this.dialogConfig);
  }

}
