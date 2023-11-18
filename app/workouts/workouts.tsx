"use client";
import { useState } from "react";
import WorkoutDay from "./workout-day";
import NoWorkouts from "./no-workouts";
import CreateWorkoutModal from "./create-workout-modal";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Workout = {
  auth_id: string | null;
  created_at: string;
  id: number;
  notes: string | null;
  order: number;
  title: string;
};

export default function Workouts({
  workoutsData,
  workoutCount,
  session,
}: {
  workoutsData: any;
  workoutCount: any;
  session: any;
}) {
  const [activeTab, setActiveTab] = useState<number>(
    workoutsData[0]?.id || null
  );
  return (
    <>
      <Tabs defaultValue={activeTab.toString()}>
        <TabsList className="flex w-min m-auto">
          {workoutsData?.map((item: Workout) => {
            return (
              <TabsTrigger
                key={item.id}
                value={item.id.toString()}
                onClick={() => setActiveTab(item.id)}
              >
                {item.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent className="flex flex-col items-center" value={activeTab.toString()}>
          {workoutsData.length > 0 ? (
            <WorkoutDay workoutId={activeTab} />
          ) : (
            <NoWorkouts />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
