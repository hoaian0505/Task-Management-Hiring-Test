import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, delay } from "rxjs/operators";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

export type User = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
};

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class BackendService {
  storedTasks: Task[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    },
    {
      id: 2,
      description: "Check in",
      assigneeId: 111,
      completed: false
    },
    {
      id: 3,
      description: "Create internal account",
      assigneeId: 222,
      completed: false
    },
    {
      id: 4,
      description: "Training for newcomer",
      assigneeId: 111,
      completed: false
    },
    {
      id: 5,
      description: "Finished deadline number #65785123 before Monday",
      assigneeId: 222,
      completed: false
    },
    {
      id: 6,
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    }
  ];

  storedUsers: User[] = [
    { id: 111, name: "Mike" },
    { id: 222, name: "James" }
  ];

  lastId = 6;

  private findTaskById = id =>
    this.storedTasks.find(task => task.id === +id);

  private findUserById = id => this.storedUsers.find(user => user.id === +id);

  tasks() {
    return of(this.storedTasks)
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }

  last4Tasks(){
    return of(this.storedTasks.slice(-4))
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }

  task(id: number): Observable<Task> {
    return of(this.findTaskById(id))
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }

  users() {
    return of(this.storedUsers)
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }

  user(id: number): Observable<User> {
    return of(this.findUserById(id))
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }

  getUserName(id: number): Observable<string> {
    return of(this.findUserById(id).name)
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }

  // newTask(payload: { description: string }) {
  newTask(description: string ) {
    const newTask: Task = {
      id: ++this.lastId,
      description: description,
      assigneeId: null,
      completed: false
    };

    this.storedTasks = this.storedTasks.concat(newTask);

    return of(newTask)
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }

  removeTask(taskId:number){
    return of(this.storedTasks.splice(taskId,1))
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }

  assign(taskId: number, userId: number) {
    return this.update(taskId, { assigneeId: userId });
  }

  complete(taskId: number, completed: boolean) {
    return this.update(taskId, { completed });
  }

  update(taskId: number, updates: Partial<Omit<Task, "id">>) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = { ...foundTask, ...updates };

    this.storedTasks = this.storedTasks.map(t =>
      t.id === taskId ? updatedTask : t
    );

    return of(updatedTask)
    .pipe(
      delay(randomDelay())
      ,catchError(err => throwError(new Error("Err: "+err)))
    );
  }
}
