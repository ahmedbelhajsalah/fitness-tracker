import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService{

    isLoginIn = new Subject<boolean>();
    isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService){

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
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => console.log(result))   
        .catch(error => console.log(error));
        this.authSuccesfully()
    }

    login(authData: AuthData){
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => console.log(result))   
        .catch(error => console.log(error));
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