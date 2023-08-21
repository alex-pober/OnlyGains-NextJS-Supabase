"use client";
import { useState } from "react";

type Workout = {
  auth_id: string | null;
  created_at: string;
  id: number;
  notes: string | null;
  order: number;
  title: string;
};

export default function Workouts({ workoutsData }: any) {
  const [activeTab, setActiveTab] = useState<number>(workoutsData[0].id);
  return (
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
      {/* <a className="tab">Tab 1</a>
    <a className="tab tab-active">Tab 2</a>
    <a className="tab">Tab 3</a> */}
    </div>
  );
}
