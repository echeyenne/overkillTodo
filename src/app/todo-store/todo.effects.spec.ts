import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TodoAPIActions, TodoUIActions } from '.';
import { TodoService } from '../services/todo.service';
import { TodoEffects } from './todo.effects';
import { State } from './todo.reducer';

describe('TodoEffects', () => {

    const initialState: State = {
        todos: []
    };

    let actions$: Observable<Action>;
    let effects: TodoEffects;
    let todoServiceSpy: jasmine.SpyObj<TodoService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TodoEffects,
                provideMockStore({ initialState }),
                provideMockActions(() => actions$),
                {
                    provide: TodoService,
                    useValue: jasmine.createSpyObj('todoService', ['list'])
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
});
