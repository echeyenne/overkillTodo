import { TodoAPIActions } from '.';
import * as todoReducer from './todo.reducer';

describe('TodoReducer', () => {
    describe('[Todos API] Load All Succeeded action', () => {

        it('should return initial state', () => {
            const initialState = todoReducer.initialState;
            const action = TodoAPIActions.loadAllSucceeded(initialState);
            const state = todoReducer.reducer(initialState, action);

            expect(state).toEqual(initialState);
        });

        it('should return all todos', () => {
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
    });
});
