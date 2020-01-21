import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const ROUTES: Routes = [
    { path: '', component: TodoListComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '/' }
];
