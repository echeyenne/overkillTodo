import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoUIActions } from 'src/app/todo-store';
import { State } from 'src/app/todo-store/todo.reducer';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.css']
})
export class CreateTodoDialogComponent implements OnInit {

  todoForm: FormGroup;
  titleCtrl: FormControl;
  descriptionCtrl: FormControl;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateTodoDialogComponent>, private store: Store<State>) { }

  ngOnInit() {
    this.titleCtrl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
    this.descriptionCtrl = this.fb.control('', [Validators.minLength(3)]);
    this.todoForm = this.fb.group({
      title: this.titleCtrl,
      description: this.descriptionCtrl
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  create() {
    const newTodo: TodoModel = {
      id: null,
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      isClosed: false,
      lastUpdateTimestamp: + new Date()
    };
    this.store.dispatch(TodoUIActions.createTodoRequested({ todo: newTodo }));
    this.dialogRef.close(this.todoForm.value);
  }

}
