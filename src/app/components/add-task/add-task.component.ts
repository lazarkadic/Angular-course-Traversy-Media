import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;

  // Svaki service se inicijalizuje u konstruktoru
  // Ovde se konkretno koristi 'Subject', koji radi na producer-consumer principu, 
  // vise subscirbera moze da se pretplati na jedan subject
  constructor(private uiService: UiService) {
    this.subscription = uiService.onToggle().subscribe(value => (this.showAddTask = value));
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(!this.text){
      alert("Please add text.");
      return;
    }
    
    // Kreiramo novi objekat 
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    // Emit-ujemo objekat koji smo kreirali u parent-component
    this.onAddTask.emit(newTask);

    // Cistimo formu za kreiranje objekta
    this.text = "";
    this.day = "";
    this.reminder = false;
  }
}
