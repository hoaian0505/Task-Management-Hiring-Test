import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { TaskDialog } from './task-dialog.component';
import { BackendService } from '../backend.service';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('TaskDialog', () => {
    let dialog : TaskDialog;
    let fixture : ComponentFixture<TaskDialog>;
    let de : DebugElement;
    let el : HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TaskDialog
            ],
            imports: [
                BrowserModule,
                FormsModule,
                MatSelectModule
            ],
            providers: [
                {provide: BackendService, useValue: new BackendService()},
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} }
            ]

        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TaskDialog);
            dialog = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;
        });
    }));

    it(`should have title in a h1 tag as 'Edit Task'`, (() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Edit Task');
    }));

    it(`should have button as 'Cancel' in form`, (() => {
        const button = de.queryAll(By.css('button'));
        expect(button[0].nativeElement.textContent).toContain('Cancel');
    }));

    it(`should have button as 'Save' in form`, (() => {
        const button = de.queryAll(By.css('button'));
        expect(button[1].nativeElement.textContent).toContain('Save');
    }));
});
