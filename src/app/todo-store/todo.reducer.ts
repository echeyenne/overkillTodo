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
            todos
        })
    ),
    on(TodoAPIActions.toggleTodoSucceeded,
        (state) => ({
            ...state,
            todos: state.todos
        })
    ),
    on(
        TodoAPIActions.toggleTodoFailed,
        (state, { toggledTodo: closedTodo }) => ({
            ...state,
            todos: state.todos.map(todo => {
                if (todo.id === closedTodo.id) {
                    todo.isClosed = !todo.isClosed;
                    return todo;
                } else {
                    return todo;
                }
            })
        })
    )
);

export function reducer(state: State | undefined, action: Action) {
    return todoReducer(state, action);
}
