import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";


export class TrainingService{
    exerciseChnaged = new Subject<Exercise | null>();
    private availableExercices : Exercise[] = 
    [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    ]

    exercises: Exercise[]= [];

    private runningExercise: Exercise | null = null;

    getAvailableExercices(){
        return this.availableExercices.slice();
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
            this.exercises.push({ 
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
            this.exercises.push({ 
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

    getCompletedOrCanceledExercises(){
        return this.exercises.slice();
    }
}