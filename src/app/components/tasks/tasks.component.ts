import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../Task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

// TaskComponent koristis kao parent klasu za fetch-ovanje realnih podataka sa servera i predstavljanje na frontendu!
// Sve izmene idu kroz ovu klasu!
export class TasksComponent implements OnInit {
  // glup nacin, moze bolje
  // service: TaskService = new TaskService();
  tasks: Task[] = [];

  // na ovaj nacin definises property klase
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((returnedTasks) => (this.tasks = returnedTasks));
  }

  deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter(t => t.id !== task.id)));
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.createTask(task).subscribe((returnedTask) => (this.tasks.push(returnedTask)));
  }

}
