import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import * as TodoAPIActions from './api.actions';
import * as TodoUIActions from './ui.actions';

@Injectable()
export class TodoStoreEffects {

  constructor(private todoService: TodoService, private actions: Actions) { }

  loadAllTodos = createEffect(() =>
    this.actions.pipe(
      ofType(
        TodoUIActions.loadAllRequested
      ),
      mergeMap(() =>
        this.todoService.list().pipe(
          map(todos => TodoAPIActions.loadAllSucceeded({ todos })),
          catchError(error =>
            of(TodoAPIActions.loadAllFailed({ error: error.message }))
          )
        )
      )
    )
  );

}
