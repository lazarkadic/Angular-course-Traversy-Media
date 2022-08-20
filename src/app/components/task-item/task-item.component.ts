import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})

// Ne pozivamo http request iz ove klase vec emit-ujemo event do parent klase (TaskComponent) odakle se radi sva komunikacija sa serverom!
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter()
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(task: any) {
    // alert('BOOOM from task-item!');
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task): void {
    this.onToggleReminder.emit(task);
  }

}
