import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TodoAPIActions, TodoUIActions } from '.';
import { TodoService } from '../services/todo.service';
import { TodoEffects } from './todo.effects';

describe('TodoEffects', () => {

    let actions$: Observable<Action>;
    let effects: TodoEffects;
    let todoServiceSpy: jasmine.SpyObj<TodoService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TodoEffects,
                provideMockActions(() => actions$),
                {
                    provide: TodoService,
                    useValue: jasmine.createSpyObj('todoService', ['list', 'update', 'get'])
                }
            ]
        }).compileComponents();

        effects = TestBed.get(TodoEffects);
        todoServiceSpy = TestBed.get(TodoService);
    });

    describe(TodoUIActions.loadAllRequested.type, () => {

        it('should return a ' + TodoAPIActions.loadAllSucceeded.type + ' action, with the todos, on success', () => {
            const listTodosMock = [
                { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 },
                { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832902 },
                { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832902 }
            ];

            actions$ = of(TodoUIActions.loadAllRequested);
            todoServiceSpy.list.and.returnValue(of(listTodosMock));

            effects.loadAllTodos.subscribe(action => {
                expect(action).toEqual({
                    type: TodoAPIActions.loadAllSucceeded.type,
                    todos: listTodosMock
                });
            });
        });
    });

    describe(TodoUIActions.toggleTodoRequested.type, () => {

        it('should return a ' + TodoAPIActions.toggleTodoSucceeded.type + ' action, with the toggle todo, on success', () => {
            const todoMock = { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 };

            actions$ = of({ type: TodoUIActions.toggleTodoRequested.type, todo: todoMock });
            todoServiceSpy.update.and.returnValue(of({}));

            effects.toggleTodo.subscribe((action) => {
                expect(action).toEqual({
                    type: TodoAPIActions.toggleTodoSucceeded.type,
                    toggledTodo: todoMock
                });
                expect(todoServiceSpy.update).toHaveBeenCalled();
            });
        });
    });

    describe(TodoUIActions.loadTodoRequested.type, () => {

        it('should return a ' + TodoAPIActions.loadTodoSucceeded.type + ' action, with the loaded todo, on success', () => {
            const todoMock = { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832902 };

            actions$ = of({ type: TodoUIActions.loadTodoRequested.type, todoId: todoMock.id });
            todoServiceSpy.get.and.returnValue(of(todoMock));

            effects.loadTodo.subscribe((action) => {
                expect(action).toEqual({
                    type: TodoAPIActions.loadTodoSucceeded.type,
                    loadedTodo: todoMock
                });
                expect(todoServiceSpy.get).toHaveBeenCalledWith(todoMock.id);
            });
        });
    });

});
