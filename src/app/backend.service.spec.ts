import { BackendService } from "./backend.service";

describe("BackendService", () => {
  let service: BackendService;

  beforeEach(() => {
    service = new BackendService();
  });

  it("#newTask should return new task value", (done: DoneFn) => {
    const qouteText = "This is my first post";
    let newTask: string= '';
    service.newTask(qouteText).subscribe(data => {
        newTask = data.description;
        expect(newTask).toEqual(qouteText);
        done();
    });
  });

  it("#newTask should be added in tasks", (done: DoneFn) => {
    const qouteText = "This is my first post";
    const defaultLengthTask: number = service.storedTasks.length;
    service.newTask(qouteText).subscribe(data => {
        const newLength = service.storedTasks.length;
        expect(defaultLengthTask).toEqual(newLength-1);
        done();
    });
  });
});