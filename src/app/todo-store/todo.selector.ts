import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoModel } from '../models/todo.model';
import { State, todosFeatureKey } from './todo.reducer';

const todoFeatureSelector = createFeatureSelector<State>(todosFeatureKey);

export const selectTodoList = createSelector(
    todoFeatureSelector,
    state => sortTodos(state.todos)
);

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