import { Routes } from '@angular/router';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const ROUTES: Routes = [
    { path: '', component: TodoListComponent, pathMatch: 'full' },
    { path: 'todos/:todoId', component: TodoDetailsComponent },
    { path: '**', redirectTo: '/' }
];
