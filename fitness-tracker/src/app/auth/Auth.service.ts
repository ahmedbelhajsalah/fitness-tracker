import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UISHARED } from "../shared/uishared.service";

@Injectable()
export class AuthService{

    isLoginIn = new Subject<boolean>();
    isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService,
        private uiSharedService: UISHARED){

    }

    initAuthListner(){
        this.afAuth.authState.subscribe(user =>{
            if(user){
                this.isLoginIn.next(true);
                this.router.navigate(['/training']);
            }else{
                this.trainingService.cancelSubscriptionBeforeLogout();
                this.isLoginIn.next(false);
                this.router.navigate(['/login']);
            }
        })
    }
    

    registerUser(authData: AuthData){
        this.uiSharedService.onLoadingChanged.next(true);
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => this.uiSharedService.onLoadingChanged.next(false))   
        .catch(error => {
            this.uiSharedService.openSnackBar(error.message, undefined, 3000);
            this.uiSharedService.onLoadingChanged.next(false);
    });
        this.authSuccesfully()
    }

    login(authData: AuthData){
        this.uiSharedService.onLoadingChanged.next(true);
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => this.uiSharedService.onLoadingChanged.next(false))   
        .catch(error => {
            this.uiSharedService.openSnackBar(error.message, undefined, 3000);
            this.uiSharedService.onLoadingChanged.next(false);
        });
        this.authSuccesfully()
    }

    logout(){
        this.afAuth.signOut();
    }

    isAuth(){
        return this.isAuthenticated;
    }


    authSuccesfully(){
        this.isAuthenticated= true;
    }
}