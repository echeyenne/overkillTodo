import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MaterialModule } from 'src/app/material.module';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<{ todosStore: { todos: Array<TodoModel> } }>;

  const initialState = {
    todosStore: {
      todos: [
        { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832903 },
        { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832903 },
        { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832903 }]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule],
      declarations: [TodoListComponent],
      providers: [provideMockStore({ initialState })],
    })
      .compileComponents();
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    /*store = TestBed.get(Store);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();*/
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.querySelector('#todoListTitle').textContent).toContain('Todos');
  });

  it('should display 3 todos in a defined order', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement;
      const todoElements: NodeListOf<HTMLElement> = element.querySelectorAll('#todoListContent mat-list-item');

      expect(todoElements.length).toBe(3);

      expect(todoElements[0].querySelector('h4').textContent).toContain('todo 1');
      expect(todoElements[0].querySelector('mat-checkbox').classList).not.toContain('mat-checkbox-checked');

      expect(todoElements[1].querySelector('h4').textContent).toContain('todo 3');
      expect(todoElements[1].querySelector('mat-checkbox').classList).not.toContain('mat-checkbox-checked');

      expect(todoElements[2].querySelector('h4').textContent).toContain('todo 2');
      expect(todoElements[2].querySelector('mat-checkbox').classList).toContain('mat-checkbox-checked');
    });
  }));

  it('should display 0 todo', () => {
    store.setState({ todosStore: { todos: [] } });
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.querySelectorAll('#todoListContent mat-list-item').length).toBe(0);
  });


  it('should toggle todos', fakeAsync(() => {
    tick(1000);
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.nativeElement;

    const openedTodoCheckbox: HTMLElement = element.querySelector('#mat-checkbox-1-input');
    const closedTodoCheckbox: HTMLElement = element.querySelector('#mat-checkbox-3-input');

    expect(openedTodoCheckbox).not.toBeNull();
    expect(openedTodoCheckbox.getAttribute('aria-checked')).toEqual('false');
    openedTodoCheckbox.click();
    tick(1000);
    fixture.detectChanges();
    expect(openedTodoCheckbox.getAttribute('aria-checked')).toEqual('true');

    expect(closedTodoCheckbox).not.toBeNull();
    expect(closedTodoCheckbox.getAttribute('aria-checked')).toEqual('true');
    closedTodoCheckbox.click();
    tick(1000);
    fixture.detectChanges();
    expect(closedTodoCheckbox.getAttribute('aria-checked')).toEqual('false');
  }));
});
