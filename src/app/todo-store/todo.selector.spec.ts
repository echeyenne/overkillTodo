import * as todoSelector from './todo.selector';

describe('Todo selectors', () => {
    it('should sort todos by status', () => {
        const initialState = {
            todos: [
                { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 },
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ]

        };
        const expectedTodoList = [
            { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 },
            { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 },
            { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 }
        ];
        expect(todoSelector.selectTodoList.projector(initialState)).toEqual(expectedTodoList);
    });

    it('should sort closed todos by chronological updated timestamp', () => {
        const initialState = {
            todos: [
                { id: 1, title: 'todo 1', isClosed: true, lastUpdateTimestamp: 1576832905 },
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832904 },
                { id: 3, title: 'todo 3', isClosed: true, lastUpdateTimestamp: 1576832903 }
            ]

        };
        const expectedTodoList = [
            { id: 3, title: 'todo 3', isClosed: true, lastUpdateTimestamp: 1576832903 },
            { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832904 },
            { id: 1, title: 'todo 1', isClosed: true, lastUpdateTimestamp: 1576832905 }
        ];
        expect(todoSelector.selectTodoList.projector(initialState)).toEqual(expectedTodoList);
    });

    it('should sort opened todos by reverse chronological updated timestamp', () => {
        const initialState = {
            todos: [
                { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832903 },
                { id: 2, title: 'todo 2', isClosed: false, lastUpdateTimestamp: 1576832905 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832904 }
            ]

        };
        const expectedTodoList = [
            { id: 2, title: 'todo 2', isClosed: false, lastUpdateTimestamp: 1576832905 },
            { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832904 },
            { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832903 }
        ];
        expect(todoSelector.selectTodoList.projector(initialState)).toEqual(expectedTodoList);
    });

    it('should sort todos by status and updated timestamp', () => {
        const initialState = {
            todos: [
                { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 },
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832906 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832906 },
                { id: 4, title: 'todo 4', isClosed: false, lastUpdateTimestamp: 1576832903 },
                { id: 5, title: 'todo 5', isClosed: true, lastUpdateTimestamp: 1576832903 },
                { id: 6, title: 'todo 6', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 7, title: 'todo 7', isClosed: false, lastUpdateTimestamp: 1576832903 }
            ]

        };
        const expectedTodoList = [
            { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832906 },
            { id: 4, title: 'todo 4', isClosed: false, lastUpdateTimestamp: 1576832903 },
            { id: 7, title: 'todo 7', isClosed: false, lastUpdateTimestamp: 1576832903 },
            { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 },
            { id: 6, title: 'todo 6', isClosed: true, lastUpdateTimestamp: 1576832902 },
            { id: 5, title: 'todo 5', isClosed: true, lastUpdateTimestamp: 1576832903 },
            { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832906 }
        ];
        expect(todoSelector.selectTodoList.projector(initialState)).toEqual(expectedTodoList);
    });
});
