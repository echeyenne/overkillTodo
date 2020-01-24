import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoModel } from '../models/todo.model';
import { State, todosFeatureKey } from './todo.reducer';

const todoFeatureSelector = createFeatureSelector<State>(todosFeatureKey);

export const selectTodoList = createSelector(
    todoFeatureSelector,
    state => sortTodos(state.todos)
);

export const selectTodo = createSelector(
    todoFeatureSelector,
    (state: State, props: any) => state.todos.find(todo => todo.id === +props.todoId)
);

export const selectCloseCreateDialog = createSelector(
    todoFeatureSelector,
    state => state.closeCreateDialog
);

function sortTodos(todos: TodoModel[]): TodoModel[] {
    return todos.
        filter(todo => !todo.isClosed).
        sort((a: TodoModel, b: TodoModel) => b.lastUpdateTimestamp - a.lastUpdateTimestamp).
        concat(
            todos.
                filter(todo => todo.isClosed).
                sort((a: TodoModel, b: TodoModel) => a.lastUpdateTimestamp - b.lastUpdateTimestamp)
        );
}
