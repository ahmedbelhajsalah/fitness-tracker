import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  showTraining = false;
  constructor() { }

  ngOnInit(): void {
  }

  onShowTraining(){
    this.showTraining = !this.showTraining;
  }
}
