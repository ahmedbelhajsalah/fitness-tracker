import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable()
export class UISHARED{
    onLoadingChanged = new Subject<boolean>();

    constructor( private _snackBar: MatSnackBar  ){}
    openSnackBar(message: any, action: string | undefined, duration: number) {
        this._snackBar.open(message,action,{
            duration: duration
        });
      }
}