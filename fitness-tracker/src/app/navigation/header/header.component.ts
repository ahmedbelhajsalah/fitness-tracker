import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleEvent= new EventEmitter<void>();

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
  }
  
  onSidNavToggle(){
    this.toggleEvent.emit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
