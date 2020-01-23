import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';
import { TodoUIActions } from 'src/app/todo-store';
import { CreateTodoDialogComponent } from './create-todo-dialog.component';

describe('CreateTodoDialogComponent', () => {
  let component: CreateTodoDialogComponent;
  let fixture: ComponentFixture<CreateTodoDialogComponent>;

  const dialogMock = {
    close: () => { }
  };

  const storeMock = {
    dispatch: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTodoDialogComponent],
      imports: [MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        {
          provide: Store,
          useValue: storeMock
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a form to create', () => {
    const todoForm = component.todoForm;

    expect(todoForm.valid).toBeFalsy();
    expect(todoForm.get('title')).not.toBeNull();
    expect(todoForm.get('description')).not.toBeNull();

    const nativeElement = fixture.nativeElement;
    const createButton = nativeElement.querySelector('#createButton');
    expect(createButton.getAttribute('disabled')).not.toBeNull();
    const cancelButton = nativeElement.querySelector('#cancelButton');
    expect(cancelButton.getAttribute('disabled')).toBeNull();

    todoForm.get('title').setValue('ti');
    todoForm.get('description').setValue('de');
    fixture.detectChanges();
    expect(todoForm.get('title').getError('minlength')).toBeTruthy();
    expect(todoForm.get('description').getError('minlength')).toBeTruthy();
    expect(createButton.getAttribute('disabled')).not.toBeNull();

    todoForm.get('title').setValue('');
    todoForm.get('description').setValue('');
    fixture.detectChanges();
    expect(todoForm.get('title').getError('minlength')).toBeUndefined();
    expect(todoForm.get('title').getError('required')).toBeTruthy();
    expect(todoForm.get('description').getError('minlength')).toBeNull();
    expect(todoForm.get('description').getError('required')).toBeNull();
    expect(createButton.getAttribute('disabled')).not.toBeNull();

    todoForm.get('title').setValue('title');
    todoForm.get('description').setValue('description');
    fixture.detectChanges();
    expect(todoForm.get('title').getError('minlength')).toBeNull();
    expect(todoForm.get('title').getError('required')).toBeNull();
    expect(todoForm.get('description').getError('minlength')).toBeNull();
    expect(todoForm.get('description').getError('required')).toBeNull();
    expect(createButton.getAttribute('disabled')).toBeNull();
  });

  it('should dispatch a createTodoRequested action', () => {
    const fakeTodo = { id: null, title: 'title', isClosed: false, lastUpdateTimestamp: null, description: 'description' };
    const todoForm = component.todoForm;
    todoForm.get('title').setValue('title');
    todoForm.get('description').setValue('description');
    fixture.detectChanges();

    const store = TestBed.get(Store);
    const spy = spyOn(store, 'dispatch');

    fixture.detectChanges();

    component.create();

    expect(spy).toHaveBeenCalledWith(TodoUIActions.createTodoRequested({ todo: fakeTodo }));
  });

  it('dialog should be closed after create', () => {
    const dialog = TestBed.get(MatDialogRef);
    const spy = spyOn(dialog, 'close').and.callThrough();
    component.create();
    expect(spy).toHaveBeenCalled();
  });

  it('dialog should be closed after cancel', () => {
    const dialog = TestBed.get(MatDialogRef);
    const spy = spyOn(dialog, 'close').and.callThrough();
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });

});
