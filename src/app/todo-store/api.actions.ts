import { createAction, props } from '@ngrx/store';
import { TodoModel } from '../models/todo.model';

export const loadAllSucceeded = createAction(
    '[Todos API] Load All Succeeded',
    props<{ todos: TodoModel[] }>()
);

export const loadAllFailed = createAction(
    '[Todos API] Load All Failed',
    props<{ error: string }>()
);

export const toggleTodoSucceeded = createAction(
    '[Todos API] Toggle Todo Succeeded',
    props<{ toggledTodo: TodoModel }>()
);

export const toggleTodoFailed = createAction(
    '[Todos API] Toggle Todo Failed',
    props<{ toggledTodo: TodoModel, error: string }>()
);
