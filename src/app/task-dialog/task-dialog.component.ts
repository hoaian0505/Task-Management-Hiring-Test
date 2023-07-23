import { Component,Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BackendService, Task, User } from "../backend.service";
import { LoaderService } from "../spinner/loader.service";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'task-dialog',
    templateUrl: './task-dialog.component.html',
    styleUrls: ['./task-dialog.component.scss']
})

export class TaskDialog implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    tasks: Observable<Task[]>;
    users: Observable<User[]>;
    task: Task;
    description:string = '';
    defaultDescription:string = '';
    selectedUser: number;
    defaultUser: number;
    errMessage: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: number,
        private dialogRef: MatDialogRef<TaskDialog>,
        private loader: LoaderService,
        private backend: BackendService) {}
  
    ngOnInit(){
        const sub = this.backend.task(this.data).subscribe(data => 
            {
                this.task = data;
                this.description = this.defaultDescription = this.task.description;
                this.selectedUser = this.defaultUser = this.task.assigneeId;
                this.loader.setLoading(false);
            },
                err => console.log(err)
        )
        this.subscription.add(sub);
        this.users = this.backend.users();
    }

    checkInput():boolean{
        if ((this.description === this.defaultDescription && this.selectedUser === this.defaultUser)
            || (this.description == '')){
            return true;
        }
        return false;
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    onSubmit(){
        this.errMessage = false;
        const wsRegex = /^\s+|\s+$/g; 
        const tempDescription = this.description.replace(wsRegex,"");
        if ((tempDescription === this.defaultDescription && this.selectedUser === this.defaultUser) 
            || tempDescription == ''){
            this.description = tempDescription;
            this.errMessage = true;
            return;
        }
        const dataSubmit = {
            description: tempDescription,
            assigneeId: this.selectedUser,
            completed: this.task.completed
        }
        this.loader.setLoading(true);
        const sub = this.backend.update(this.data,dataSubmit).pipe().subscribe(data =>{
            if (data){
                this.loader.setLoading(false);
                this.dialogRef.close(true);
            }
        },
            err => console.log(err)
        )
        this.subscription.add(sub);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}