import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { BackendService } from '../backend.service';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
    let list : ListComponent;
    let fixture : ComponentFixture<ListComponent>;
    let de : DebugElement;
    let el : HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListComponent
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
            fixture = TestBed.createComponent(ListComponent);
            list = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;
        });
    }));

    it(`should have button as 'Add' in form`, (() => {
        const button = de.query(By.css('button'));
        expect(button.nativeElement.textContent).toContain('Add');
    }));
});
