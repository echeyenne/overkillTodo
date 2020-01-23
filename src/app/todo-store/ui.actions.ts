import { createAction, props } from '@ngrx/store';
import { TodoModel } from '../models/todo.model';

export const loadAllRequested = createAction(
    '[Todos Component] Load All Requested'
);

export const toggleTodoRequested = createAction(
    '[Todos Component] Toggle Todo Requested',
    props<{ todo: TodoModel; }>()
);

export const loadTodoRequested = createAction(
    '[Todos Component] Load Todo Requested',
    props<{ todoId: number; }>()
);
