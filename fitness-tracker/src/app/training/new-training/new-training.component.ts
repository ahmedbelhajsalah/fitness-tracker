import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UISHARED } from 'src/app/shared/uishared.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  constructor(private trainingService: TrainingService, private uiSharedService: UISHARED) { }
  isLoading = false;
  isLoadingSub!: Subscription;
  subscription!: Subscription;
  exercises!: Exercise[];
  ngOnInit(): void {
    this.isLoadingSub = this.uiSharedService.onLoadingChanged.subscribe(result => this.isLoading = result);
    this.subscription = this.trainingService.onExerciseChanged.subscribe(exercise =>{
      if(exercise){
        this.exercises = Object.values(exercise);
      }
    }) 
    this.trainingService.fetchAvailableExercices();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.isLoadingSub.unsubscribe();
  }

  onStartClick(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  onfetchDataAgain(){
    this.trainingService.fetchAvailableExercices();
  }
}
