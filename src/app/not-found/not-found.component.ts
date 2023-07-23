import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NotFoundComponent {
    constructor() {}
}