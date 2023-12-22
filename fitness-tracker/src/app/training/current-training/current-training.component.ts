import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopDialogComponent } from './stop-dialog/stop-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Input() progress = 0;
  timer: any;
  @Output() goToTraining= new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeInterval();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startOrResumeInterval(){
    this.timer = setInterval(()=>{
      this.progress +=5;
      if(this.progress>=100){
        clearInterval(this.timer);
      }
    }, 1000)
  }

  stopInterval(){
    clearInterval(this.timer);
  }


  onStop(){
    clearInterval(this.timer);
      const dialogRef = this.dialog.open(StopDialogComponent,{
        data: {
          progress: this.progress,
        },
      });
      dialogRef.afterClosed().subscribe(
        result => {
          if (result) {
            this.stopInterval();
            this.goToTraining.emit();
          } else{
            this.startOrResumeInterval();
          }
        }
      )
  }

  

}
