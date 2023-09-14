"use client";
import { useState } from "react";
import WorkoutDay from "./workout-day";
import NoWorkouts from "./no-workouts";
type Workout = {
  auth_id: string | null;
  created_at: string;
  id: number;
  notes: string | null;
  order: number;
  title: string;
};

export default function Workouts({workoutsData }: {workoutsData: any}) {
  const [activeTab, setActiveTab] = useState<number>(workoutsData[0]?.id || null);
  console.log(workoutsData)
  return (
    <>
      <div className="tabs tabs-boxed">
        {workoutsData?.map((item: Workout) => {
          return (
            <a
              key={item.id}
              className={activeTab === item.id ? 'tab tab-active transition-transform' : 'tab transition-all'}
              onClick={() => setActiveTab(item.id)}
            >
              {item.title}
            </a>
          );
        })}
      </div>
      {workoutsData.length>0 ? <WorkoutDay workoutId={activeTab}/> : <NoWorkouts />}
    </>
  );
}
