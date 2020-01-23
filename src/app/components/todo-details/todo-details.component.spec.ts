import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { TodoDetailsComponent } from './todo-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('TodoDetailsComponent', () => {
  let component: TodoDetailsComponent;
  let fixture: ComponentFixture<TodoDetailsComponent>;

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
      imports: [MaterialModule, RouterTestingModule],
      declarations: [TodoDetailsComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
