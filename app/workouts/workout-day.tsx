"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CreateWorkoutDayModal from "./create-workoutDay-modal";
import { useEffect, useState } from "react";
import NoWorkoutDays from "./no-workout-days";
import CreateWorkoutExercise from "./create-workoutExercise";

type Exercise = {
  id: number;
  exercise: string;
  reps: string;
  workout_day_id: number;
};

export default function WorkoutDay({ workoutId }: any) {
  const [workoutDays, setWorkoutDays] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getWorkoutDays = async () => {
      const { data }: { data: any } = await supabase
        .from("workout_day")
        .select("*, workout_day_exercise(*)")
        .eq("workout_id", workoutId);

      if (data.length >= 0) {
        setWorkoutDays(data);
      }
    };

    getWorkoutDays();
  }, [workoutId]);

  return (
    <>
      {workoutDays.length > 0 ? (
        // Render the WorkoutDays component if data is not empty
        <>
          {workoutDays.map((day) => {
            return (
              <div
                key={day.id}
                className="collapse collapse-arrow bg-base-200 mb-1"
              >
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium flex gap-5">
                  {day.title}
                  <div className="text-l font-light text-gray-400">
                    {day.description}
                  </div>
                </div>
                <div className="collapse-content">
                  <table className="table table-xs">
                    <tbody>
                      {day.workout_day_exercise.map((exercise: Exercise) => {
                        return (
                          <tr className="flex justify-between" key={exercise.id}>
                            <td>{exercise.exercise}</td>
                            <td>{exercise.reps}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <CreateWorkoutExercise workoutDayId={day.id} />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        // Render the NoWorkoutDays component if data is empty
        <NoWorkoutDays />
      )}

      <CreateWorkoutDayModal workoutId={workoutId} />
    </>
  );
}
