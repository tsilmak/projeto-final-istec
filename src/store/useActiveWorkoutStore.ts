import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_REST_SECONDS = 120;

interface ActiveWorkoutState {
  workoutId: string | null;
  startedAt: number | null;
  currentExerciseIndex: number;
  completedSets: Record<string, number[]>;

  restDurationSeconds: number;
  restEndsAt: number | null;

  hasHydrated: boolean;

  startWorkout: (workoutId: string) => void;
  setCurrentExerciseIndex: (index: number) => void;
  completeSet: (exerciseId: string, setIndex: number) => void;

  setRestDuration: (seconds: number) => void;
  startRest: () => void;
  endRest: () => void;

  finishWorkout: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const selectHasActiveWorkout = (s: ActiveWorkoutState) => s.workoutId !== null;

export const useActiveWorkoutStore = create<ActiveWorkoutState>()(
  persist(
    (set) => ({
      workoutId: null,
      startedAt: null,
      currentExerciseIndex: 0,
      completedSets: {},

      restDurationSeconds: DEFAULT_REST_SECONDS,
      restEndsAt: null,

      hasHydrated: false,

      startWorkout: (workoutId) => {
        set({
          workoutId,
          startedAt: Date.now(),
          currentExerciseIndex: 0,
          completedSets: {},
          restEndsAt: null,
        });
      },
      setCurrentExerciseIndex: (index) =>
        set((state) =>
          state.workoutId === null
            ? state
            : { currentExerciseIndex: Math.max(0, Math.floor(index)) }
        ),

      completeSet: (exerciseId, setIndex) =>
        set((state) => {
          if (state.workoutId === null) {
            return state;
          }

          if (!Number.isInteger(setIndex) || setIndex < 0) {
            return state;
          }

          const completed = state.completedSets[exerciseId] ?? [];

          if (completed.includes(setIndex)) {
            return state;
          }

          return {
            completedSets: {
              ...state.completedSets,
              [exerciseId]: [...completed, setIndex],
            },
          };
        }),

      setRestDuration: (seconds) =>
        set({
          restDurationSeconds: Number.isFinite(seconds)
            ? Math.max(0, Math.floor(seconds))
            : DEFAULT_REST_SECONDS,
        }),

      startRest: () =>
        set((state) => ({
          restEndsAt:
            state.workoutId === null ? null : Date.now() + state.restDurationSeconds * 1000,
        })),

      endRest: () => set({ restEndsAt: null }),

      finishWorkout: () =>
        set({
          workoutId: null,
          startedAt: null,
          currentExerciseIndex: 0,
          completedSets: {},
          restEndsAt: null,
        }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'active-workout-storage',

      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        workoutId: state.workoutId,
        startedAt: state.startedAt,
        currentExerciseIndex: state.currentExerciseIndex,
        completedSets: state.completedSets,
        restDurationSeconds: state.restDurationSeconds,
        restEndsAt: state.restEndsAt,
      }),

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to restore workout:', error);

          useActiveWorkoutStore.setState({
            hasHydrated: true,
          });

          return;
        }

        state?.setHasHydrated(true);
      },
    }
  )
);
