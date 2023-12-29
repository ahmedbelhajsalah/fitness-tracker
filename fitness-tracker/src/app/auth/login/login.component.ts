import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Auth.service';
import { UISHARED } from 'src/app/shared/uishared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  isLoading = false;
  loadingSub!: Subscription;

  constructor(private authService: AuthService, private uiSharedService: UISHARED) {}

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  ngOnInit() {
    this.loadingSub = this.uiSharedService.onLoadingChanged.subscribe(result =>{
      this.isLoading = result;
    })
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}

