import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatSort } from '@angular/material/sort';
import { Form } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  exercices: Exercise[] = this.trainingService.getCompletedOrCanceledExercises();
  dataSource = new MatTableDataSource<Exercise>()
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.exercices;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];

  onFilter(event: any){
    const searchValue = event.target.value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

}
