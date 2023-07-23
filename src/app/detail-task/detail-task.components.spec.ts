import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { BackendService } from '../backend.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailTaskComponent } from './detail-task.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

describe('DetailTaskComponent', () => {
    let detailTask : DetailTaskComponent;
    let fixture : ComponentFixture<DetailTaskComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                DetailTaskComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                MatSelectModule,
                MatDialogModule,
                MatPaginatorModule,
                MatSortModule
            ],
            providers: [
                {provide: BackendService, useValue: new BackendService()},
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} }
            ]

        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(DetailTaskComponent);
            detailTask = fixture.componentInstance;
        });
    }));

    it(`should have Search Text input`, (() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Search Text');
    }));
});
