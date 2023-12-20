import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fitness-tracker';
  openSidNav= false;

  onClick(){
    console.log(`the project ${this.title} has started`);
  }
  onSideNavClick(){
    this.openSidNav= !this.openSidNav;
  }
  
}
