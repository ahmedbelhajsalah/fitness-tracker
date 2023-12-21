import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() showCurrentTraining = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onStartClick(){
    this.showCurrentTraining.emit();
  }
}
