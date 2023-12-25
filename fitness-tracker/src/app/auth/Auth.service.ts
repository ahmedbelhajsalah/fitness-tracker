import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService{

    private user: User | null = null;
    isLoginIn = new Subject<boolean>();

    constructor(private router: Router){

    }
    
    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString()
        };
        this.authSuccesfully()
    }

    login(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 100000).toString()
        };
        this.authSuccesfully()
    }

    logout(){
        this.user = null;
        this.isLoginIn.next(false);
        this.router.navigate(['/login']);
    }

    isAuth(){
        return this.user != null;
    }

    getUser(){
        return{...this.user};
    }

    authSuccesfully(){
        this.isLoginIn.next(true);
        this.router.navigate(['/training']);
    }
}