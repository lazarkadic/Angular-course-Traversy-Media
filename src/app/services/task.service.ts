import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task } from '../components/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

// Kreiran fake json server na kome se nalazi baza iz fajla db.json da bi imali rest api
// Kreira se sa: npm i json-server
// Pokrece se sa: npm run server (po default-u je na portu 3000, ali u package.json si definisao skriptu koja se zove 'server' i predefinisan je port na 5000)
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  // na ovaj nacin definises property klase
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;

    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;

    return this.http.put<Task>(url, task, httpOptions);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
