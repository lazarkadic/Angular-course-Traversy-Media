import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask!: boolean;
  subscription!: Subscription;

  // Svaki service se inicijalizuje u konstruktoru
  // Ovde se konkretno koristi 'Subject', koji radi na producer-consumer principu, 
  // vise subscirbera moze da se pretplati na jedan subject
  constructor(private uiService: UiService, private router: Router) { 
    this.subscription = uiService.onToggle().subscribe(value => (this.showAddTask = value));
  }

  ngOnInit(): void {
  }

  toggleAddTask(){
    this.uiService.toggleAddTask();
  }

  // Provera prosledjene rute i one na kojoj se trenutno nalazimo pomocu Router modula
  hasRoute(route: string): boolean {
    return route == this.router.url;
  }

}
