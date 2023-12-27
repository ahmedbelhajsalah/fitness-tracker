import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopDialogComponent } from './stop-dialog/stop-dialog.component';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Input() progress = 0;
  timer: any;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }
  exerciseSubscription!: Subscription;
  duration = 0;
  exerciseName='';

  ngOnInit(): void {
    this.startOrResumeInterval();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startOrResumeInterval(){
    let step = 0;
    const runningExercise = this.trainingService.getRunningExercise();
    if (runningExercise) {
        step = (runningExercise.duration) / 100 * 1000;
    }
    this.timer = setInterval(()=>{
      this.progress +=5;
      if(this.progress>=100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step)
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
            this.trainingService.cancelExercise(this.progress);
            this.stopInterval();
          } else{
            this.startOrResumeInterval();
          }
        }
      )
  }

  

}
