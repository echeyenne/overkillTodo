import { TodoAPIActions, TodoUIActions } from '.';
import { TodoModel } from '../models/todo.model';
import * as todoReducer from './todo.reducer';

describe('TodoReducer', () => {

    it('should return initial state on ' + TodoAPIActions.loadAllSucceeded.type, () => {
        const initialState = todoReducer.initialState;
        const action = TodoAPIActions.loadAllSucceeded(initialState);
        const state = todoReducer.reducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it('should return all todos on ' + TodoAPIActions.loadAllSucceeded.type, () => {
        const initialState = todoReducer.initialState;
        const expectedState = {
            todos: [
                { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 },
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ],
            closeCreateDialog: true
        };
        const action = TodoAPIActions.loadAllSucceeded(expectedState);
        const state = todoReducer.reducer(initialState, action);

        expect(state).toEqual(expectedState);
    });

    it('should update todos on ' + TodoAPIActions.toggleTodoSucceeded.type, () => {
        const todoToToggle: TodoModel = { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 };
        const initialState = {
            todos: [
                todoToToggle,
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ],
            closeCreateDialog: true
        };

        todoToToggle.isClosed = true;

        const expectedState = {
            todos: [
                todoToToggle,
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ],
            closeCreateDialog: true
        };

        const action = TodoAPIActions.toggleTodoSucceeded({ toggledTodo: todoToToggle });
        const state = todoReducer.reducer(initialState, action);

        expect(state).toEqual(expectedState);
    });

    it('should not update todos on ' + TodoAPIActions.toggleTodoFailed.type, () => {
        const todoToToggle: TodoModel = { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 };
        const initialState = {
            todos: [
                todoToToggle,
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ],
            closeCreateDialog: true
        };
        todoToToggle.isClosed = true;
        const action = TodoAPIActions.toggleTodoFailed({ toggledTodo: todoToToggle, error: 'An error content' });
        const state = todoReducer.reducer(initialState, action);

        expect(state).toEqual(initialState);
    });

    it('should update todo on ' + TodoAPIActions.loadTodoSucceeded.type + ' with filled initial state', () => {
        const todoToUpdate: TodoModel = { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 };
        const initialState = {
            todos: [
                todoToUpdate,
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ],
            closeCreateDialog: true
        };

        todoToUpdate.isClosed = true;

        const expectedState = {
            todos: [
                todoToUpdate,
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ],
            closeCreateDialog: true
        };

        const action = TodoAPIActions.loadTodoSucceeded({ loadedTodo: todoToUpdate });
        const state = todoReducer.reducer(initialState, action);

        expect(state).toEqual(expectedState);
    });

    it('should update todo on ' + TodoAPIActions.loadTodoSucceeded.type + ' with empty initial state', () => {
        const todoToUpdate: TodoModel = { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 };
        const initialState = todoReducer.initialState;

        const action = TodoAPIActions.loadTodoSucceeded({ loadedTodo: todoToUpdate });
        const state = todoReducer.reducer(initialState, action);

        todoToUpdate.isClosed = true;

        const expectedState = {
            todos: [todoToUpdate],
            closeCreateDialog: true
        };

        expect(state).toEqual(expectedState);
    });

    it('should create todo on ' + TodoAPIActions.createTodoSucceeded.type, () => {
        const todoToCreate: TodoModel = { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 };
        const initialState = {
            todos: [],
            closeCreateDialog: false
        };

        const expectedState = {
            todos: [todoToCreate],
            closeCreateDialog: true
        };

        const action = TodoAPIActions.createTodoSucceeded({ createdTodo: todoToCreate });
        const state = todoReducer.reducer(initialState, action);

        expect(state).toEqual(expectedState);
    });

    it('should update closeCreateDialog to false on ' + TodoUIActions.createTodoDialogOpened.type, () => {
        const initialState = {
            todos: [],
            closeCreateDialog: true
        };

        const expectedState = {
            todos: [],
            closeCreateDialog: false
        };

        const action = TodoUIActions.createTodoDialogOpened();
        const state = todoReducer.reducer(initialState, action);

        expect(state).toEqual(expectedState);
    });

});
