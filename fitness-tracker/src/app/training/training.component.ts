import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  showTraining = false;
  exerciseSubscription!: Subscription;
  constructor(private trainingService : TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChnaged.subscribe(ex =>{
      if (ex) {
        this.showTraining =true;
      }else {
        this.showTraining =false;
      }
    })
  }

  onShowTraining(){
    this.showTraining = !this.showTraining;
  }

}
