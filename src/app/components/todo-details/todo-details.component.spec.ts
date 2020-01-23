import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material.module';
import { TodoDetailsComponent } from './todo-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('TodoDetailsComponent', () => {
  let component: TodoDetailsComponent;
  let fixture: ComponentFixture<TodoDetailsComponent>;

  const initialState = {
    todosStore: {
      todos: [
        { id: 1, title: 'todo 1', isClosed: false, lastUpdateTimestamp: 1576832903, description: 'todo 1 description' },
        { id: 2, title: 'todo 2', isClosed: true, lastUpdateTimestamp: 1576832903, description: 'todo 1 description' },
        { id: 3, title: 'todo 3', isClosed: false, lastUpdateTimestamp: 1576832903, description: 'todo 1 description' }]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule],
      declarations: [TodoDetailsComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ todoId: '1' })
            }
          }
        }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TodoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todo title', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.querySelector('mat-card-title').textContent).toContain('todo 1');
  });

  it('should display todo description', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    expect(element.querySelector('mat-card-content').textContent).toContain('todo 1 description');
  });

});
