"use client";
import { useState } from "react";
import WorkoutDay from "./workout-day";
import NoWorkouts from "./no-workouts";
import CreateWorkoutModal from "./create-workout-modal";
type Workout = {
  auth_id: string | null;
  created_at: string;
  id: number;
  notes: string | null;
  order: number;
  title: string;
};

export default function Workouts({ workoutsData, workoutCount, session }: { workoutsData: any, workoutCount: any, session: any }) {
  const [activeTab, setActiveTab] = useState<number>(
    workoutsData[0]?.id || null
  );

  return (
    <>
      <div className="tabs tabs-boxed mb-4">
        {workoutsData?.map((item: Workout) => {
          return (
            <a
              key={item.id}
              className={
                activeTab === item.id
                  ? "tab tab-active transition-transform"
                  : "tab transition-all"
              }
              onClick={() => setActiveTab(item.id)}
            >
              {item.title}
            </a>
          );
        })}
        <CreateWorkoutModal workoutCount={workoutCount} session={session}/>
      </div>
      {workoutsData.length > 0 ? (
        <WorkoutDay workoutId={activeTab} />
      ) : (
        <NoWorkouts />
      )}
    </>
  );
}
