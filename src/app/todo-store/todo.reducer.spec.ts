import { TodoAPIActions } from '.';
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
            ]
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
            ]
        };

        todoToToggle.isClosed = true;

        const expectedState = {
            todos: [
                todoToToggle,
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ]
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
            ]
        };
        todoToToggle.isClosed = true;
        const action = TodoAPIActions.toggleTodoFailed({ toggledTodo: todoToToggle, error: 'An error content' });
        const state = todoReducer.reducer(initialState, action);

        expect(state).toEqual(initialState);
    });

});
