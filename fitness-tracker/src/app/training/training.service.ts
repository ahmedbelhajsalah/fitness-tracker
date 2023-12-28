import { Subject, map } from "rxjs";
import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable()
export class TrainingService{
    exerciseChnaged = new Subject<Exercise | null>();
    private availableExercices : Exercise[] = []

    constructor(private db: AngularFirestore){}

    exercises: Exercise[]= [];
    onExerciseChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private runningExercise: Exercise | null = null;

    fetchAvailableExercices(){
        this.db.collection('availableExercises')
                .snapshotChanges().pipe(map(
                    docArray => {
                    return docArray.map(doc => {
                        const data = doc.payload.doc.data() as Exercise;

                        return {
                        id: doc.payload.doc.id,
                        name: data['name'],
                            duration: data['duration'],
                            calories: data['calories']
                        };
                    });
                    }
                )).subscribe((exercice: Exercise[]) => {
                    this.availableExercices = exercice;
                    this.onExerciseChanged.next([...this.availableExercices])
        });
    }

    startExercise(selectedId : string){
        this.runningExercise = this.availableExercices.find(ex => ex.name == selectedId) || null;
        if (this.runningExercise) {
            this.exerciseChnaged.next({...this.runningExercise});
        }    
    }

    getRunningExercise(){
        return this.runningExercise;
    }

    completeExercise(){
        if(this.runningExercise){
            this.addDataToDataBase({ 
                ...this.runningExercise,
                date: new Date(),
                state: 'completed'
            })
        }
        this.runningExercise= null;
        this.exerciseChnaged.next(null);
    }

    cancelExercise(progress: number){
        if(this.runningExercise){
            this.addDataToDataBase({ 
                ...this.runningExercise,
                date: new Date(),
                duration:this.runningExercise.duration * (progress/100),
                calories:this.runningExercise.calories * (progress/100),
                state: 'cancelled'
            })
        }
        this.runningExercise= null;
        this.exerciseChnaged.next(null);
    }

    fetchCompletedOrCanceledExercises(){
        this.db.collection('finishedExercises').valueChanges().subscribe((exercise: any[]) =>{
            this.finishedExercisesChanged.next(exercise);
        })
    }

    private addDataToDataBase(exercise : Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }
}

