import { AfterViewInit, Component,OnDestroy,OnInit, ViewChild } from '@angular/core';
import {BackendService,Task} from '../backend.service';
import { BehaviorSubject, Observable, Subscription  } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { TaskDialog } from '../task-dialog/task-dialog.component';
import { LoaderService } from '../spinner/loader.service';

@Component({
  selector: 'detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})

export class DetailTaskComponent implements OnInit, AfterViewInit, OnDestroy{
  tasks: Observable<Task[]>;
  selectedUser: string = '';
  refreshTasks$ = new BehaviorSubject<boolean>(true);
  dataSource = new MatTableDataSource<Task>();
  displayedColumns: string[] = ['id', 'description', 'assigneeId', 'completed','action'];
  subscription: Subscription = new Subscription(); 
  searchText: string = '';

  constructor(private backend: BackendService, private dialog: MatDialog, private loader: LoaderService) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit(){
    this.loader.setLoading(true);
    this.tasks = this.refreshTasks$.pipe(switchMap(() => this.backend.tasks()))
    const sub = this.tasks.subscribe(data => {
      this.dataSource.data = data;
      this.loader.setLoading(false);
    },
      err => console.log(err)
    )
    this.subscription.add(sub);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filter(e:any) {
    this.dataSource.filter = e.target.value;
  }

  makeComplete(id:number):void {
    this.backend.complete(id,true);
    this.refreshTasks$.next(true);
  }

  removeTask(id:number):void {
    this.loader.setLoading(true);
    this.backend.removeTask(id).subscribe(() =>{
      this.loader.setLoading(false);
    });
    this.refreshTasks$.next(true);
  }

  openDialog(id:number): void {
    
    this.loader.setLoading(true);
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '400px',
      height: '350px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.refreshTasks$.next(true);
      }
    },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}