import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fitness-tracker';
  openSidNav= false;

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.initAuthListner();
  }
  
  
  onSideNavClick(){
    this.openSidNav= !this.openSidNav;
  }
  
}
