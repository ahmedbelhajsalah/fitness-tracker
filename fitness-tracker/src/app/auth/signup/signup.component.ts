import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from '../Auth.service';
import { UISHARED } from 'src/app/shared/uishared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,private uiSharedService: UISHARED) { }
  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
  isLoading = false;
  loadingSub!: Subscription;

  ngOnInit(): void {
    this.loadingSub = this.uiSharedService.onLoadingChanged.subscribe(result=> this.isLoading = result)
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
