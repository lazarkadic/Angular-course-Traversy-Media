import { Injectable } from '@angular/core';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;

  // 'Subject' je svojstvo Angular-a da izvrsava producer-consumer patern
  private subject = new Subject<any>();

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
