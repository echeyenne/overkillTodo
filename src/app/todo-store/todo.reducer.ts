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
        (state, { toggledTodo }) => ({
            ...state,
            todos: state.todos.map(todo => {
                if (todo.id === toggledTodo.id) {
                    todo.isClosed = !todo.isClosed;
                    return todo;
                } else {
                    return todo;
                }
            })
        })
    ),
    on(TodoAPIActions.loadTodoSucceeded,
        (state, { loadedTodo }) => ({
            ...state,
            todos: updateTodo(state.todos, loadedTodo)
        })
    ),
    on(TodoAPIActions.createTodoSucceeded,
        (state, { createdTodo }) => ({
            ...state,
            todos: updateTodo(state.todos, createdTodo)
        })
    )
);

export function reducer(state: State | undefined, action: Action) {
    return todoReducer(state, action);
}

/**
 * Update a todo in the todoList or add it if it does not exists already.
 *
 * @param todoList  The initial todo list to update.
 * @param todo   The todo to update.
 */
function updateTodo(todoList: TodoModel[], todo: TodoModel): TodoModel[] {
    const todoToUpdate = todoList.find(i => i.id === todo.id);
    const todoIndex = todoList.indexOf(todoToUpdate);
    if (todoIndex >= 0) {
        todoList[todoIndex] = todo;
    } else {
        todoList.push(todo);
    }
    return todoList;
}
