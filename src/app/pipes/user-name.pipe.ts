import { Pipe, PipeTransform } from '@angular/core';
import { BackendService } from '../backend.service';
import { Observable } from 'rxjs';

@Pipe({
    name: 'userNamePipe'
  })
  export class userNamePipe implements PipeTransform {
  
    constructor(private backend: BackendService) {}
  
    /**
     * 
     * @param id 
     */
    transform(id: number): Observable<string> {
      return this.backend.getUserName(id);
    }
  
  }