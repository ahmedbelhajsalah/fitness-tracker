import { Subject, Subscription, map } from "rxjs";
import { Exercise } from "./exercise.model";
import { Injectable, enableProdMode } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { UISHARED } from "../shared/uishared.service";

@Injectable()
export class TrainingService{
    exerciseChnaged = new Subject<Exercise | null>();
    private availableExercices : Exercise[] = []
    private sub: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiSharedSevice: UISHARED){}

    exercises: Exercise[]= [];
    onExerciseChanged = new Subject<Exercise[] | null>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private runningExercise: Exercise | null = null;

    fetchAvailableExercices(){
        this.uiSharedSevice.onLoadingChanged.next(true);
        this.sub.push(this.db.collection('availableExercises')
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
                    this.onExerciseChanged.next([...this.availableExercices]);
                    this.uiSharedSevice.onLoadingChanged.next(false);
        }, error => {
            this.uiSharedSevice.onLoadingChanged.next(false);
            this.uiSharedSevice.openSnackBar('falied to fetch data, please try again', undefined, 4000);
            this.onExerciseChanged.next(null);
        }));
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
        this.sub.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercise: any[]) =>{
            this.finishedExercisesChanged.next(exercise);
        }));
    }

    private addDataToDataBase(exercise : Exercise){
        this.db.collection('finishedExercises').add(exercise);
    }

    cancelSubscriptionBeforeLogout(){
        this.sub.forEach(sub => sub.unsubscribe());
    }
}

