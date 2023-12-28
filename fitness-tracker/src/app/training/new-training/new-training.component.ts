import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  constructor(private trainingService: TrainingService) { }
  subscription!: Subscription;
  exercises!: Exercise[];
  ngOnInit(): void {
    this.subscription = this.trainingService.onExerciseChanged.subscribe(exercise =>{
      this.exercises = Object.values(exercise);
    }) 
    this.trainingService.fetchAvailableExercices();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onStartClick(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}
