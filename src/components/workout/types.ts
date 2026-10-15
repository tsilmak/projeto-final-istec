export type Exercise = { id: string; name: string; imgURL: string };
export type Workout = { id: string; name: string; exercises: Exercise[] };
