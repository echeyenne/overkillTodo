import { Action, createReducer, on } from '@ngrx/store';
import { TodoModel } from '../models/todo.model';
import * as TodoAPIActions from './api.actions';

export const todosFeatureKey = 'todosStore';

export interface State {
    todos: Array<TodoModel>;
}

export const initialState: State = {
    todos: []
};

const todoReducer = createReducer(
    initialState,
    on(
        TodoAPIActions.loadAllSucceeded,
        (state, { todos }) => ({
            ...state,
            todos: sortTodos(todos)
        })
    )
);

export function reducer(state: State | undefined, action: Action) {
    return todoReducer(state, action);
}

function sortTodos(todos: TodoModel[]) {
    return todos.
        filter(todo => !todo.isClosed).
        sort((a: TodoModel, b: TodoModel) => b.lastUpdateTimestamp - a.lastUpdateTimestamp).
        concat(
            todos.
                filter(todo => todo.isClosed).
                sort((a: TodoModel, b: TodoModel) => a.lastUpdateTimestamp - b.lastUpdateTimestamp)
        );
}
