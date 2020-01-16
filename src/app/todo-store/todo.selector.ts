import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, todosFeatureKey } from './todo.reducer';

const todoFeatureSelector = createFeatureSelector<State>(todosFeatureKey);

export const selectTodoList = createSelector(
    todoFeatureSelector,
    state => state.todos
);
