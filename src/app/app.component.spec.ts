import {TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BackendService} from "./backend.service";
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { ListComponent } from './list/list.component';
import { TaskDialog } from './task-dialog/task-dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';

describe('AppComponent', () => {
    const routes: Routes = [
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
    ];
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                DetailTaskComponent,
                ListComponent,
                TaskDialog,
                SpinnerComponent,
                NotFoundComponent
            ],
            imports: [
                RouterModule.forRoot(routes)
            ],
            providers: [
                {provide: BackendService, useValue: new BackendService()}
            ]

        }).compileComponents();
    }));

    it('should create the app', (() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render img banner in app', (() => {
        const fixture = TestBed.createComponent(AppComponent);
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('img')).toBeTruthy();
    }));
});
