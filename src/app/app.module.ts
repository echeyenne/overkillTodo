import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { CreateTodoDialogComponent } from './components/create-todo-dialog/create-todo-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MaterialModule } from './material.module';
import { InMemoryTodoService } from './services/in-memory-todo-service';
import { TodoStoreModule } from './todo-store/todo-store.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListComponent,
    TodoDetailsComponent,
    CreateTodoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryTodoService),
    StoreModule.forRoot({}),
    TodoStoreModule,
    EffectsModule.forRoot([]),
    RouterModule.forRoot(ROUTES),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateTodoDialogComponent]
})
export class AppModule { }
