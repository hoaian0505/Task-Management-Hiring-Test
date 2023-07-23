import { Component,OnDestroy,OnInit } from '@angular/core';
import {BackendService, User, Task} from '../backend.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { LoaderService } from '../spinner/loader.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy{
  subscription: Subscription = new Subscription(); 
  tasks: Observable<Task[]>;
  users: Observable<User[]>;
  task: string = '';
  selectedUser: number;
  refreshTasks$ = new BehaviorSubject<boolean>(true);
  isDisabled:boolean = true;
  errMessage: boolean = false;

  constructor(private backend: BackendService, private loader: LoaderService) {
  }

  ngOnInit(){
    this.loader.setLoading(true);
    this.tasks = this.refreshTasks$.pipe(switchMap(() => this.backend.last4Tasks())); 
    this.users = this.backend.users();
    setTimeout(() => {
      this.loader.setLoading(false);
    }, 1000);
  }

  checkInput(): boolean{    
    if (this.task && this.selectedUser){
      return false;
    }
    return true;
  }

  addTask():void {
    this.errMessage = false;
    if (this.task && this.selectedUser){
      const wsRegex = /^\s+|\s+$/g; 
      const tempTask = this.task.replace(wsRegex,"")
      if (tempTask==''){
        this.errMessage = true;
        this.task = tempTask;
        return;
      }
      const sub = this.backend.newTask(tempTask).subscribe(data => {
        this.backend.assign(data.id,this.selectedUser);
      },
        err => console.log(err)
      );
      this.subscription.add(sub);
      this.refreshTasks$.next(true);
    }
  }

  makeComplete(id:number): void {
    this.backend.complete(id,true);
    this.refreshTasks$.next(true);
  }

  removeTask(id:number): void {
    this.loader.setLoading(true);
    this.backend.removeTask(id).subscribe(() =>{
      this.loader.setLoading(false);
    });
    this.refreshTasks$.next(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
