import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/Auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavEvent = new EventEmitter<void>();

  constructor(private authService : AuthService) { }
  sub = new Subscription;
  showTrainingAndLogout = false;
  
  ngOnInit(): void {
    this.sub = this.authService.isLoginIn.subscribe(auth =>{
      this.showTrainingAndLogout=auth;
    })
  }

  onLogout(){
    this.authService.logout();
    this.onSideNavClick()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSideNavClick(){
    this.sidenavEvent.emit();
  }
}
