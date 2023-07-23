import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BackendService} from './backend.service';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { MatTableModule } from '@angular/material/table';
import { ListComponent } from './list/list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterPipe } from './pipes/filter.pipe';
import { userNamePipe } from './pipes/user-name.pipe';
import { TaskDialog } from './task-dialog/task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes  = [
  {
    path: 'home',
    component: ListComponent
  },
  {
    path: 'detail',
    component: DetailTaskComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DetailTaskComponent,
    ListComponent,
    TaskDialog,
    FilterPipe,
    userNamePipe,
    SpinnerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
