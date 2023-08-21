export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      links: {
        Row: {
          clicks: number | null
          created_at: string
          id: number
          order: number
          title: string | null
          url: string | null
          user_id: number
        }
        Insert: {
          clicks?: number | null
          created_at?: string
          id?: number
          order: number
          title?: string | null
          url?: string | null
          user_id?: number
        }
        Update: {
          clicks?: number | null
          created_at?: string
          id?: number
          order?: number
          title?: string | null
          url?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          auth_id: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: number
          user_name: string
        }
        Insert: {
          auth_id?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: number
          user_name: string
        }
        Update: {
          auth_id?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: number
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_auth_id_fkey"
            columns: ["auth_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workout: {
        Row: {
          auth_id: string | null
          created_at: string
          id: number
          notes: string | null
          order: number
          title: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          id?: number
          notes?: string | null
          order: number
          title: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          id?: number
          notes?: string | null
          order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_auth_id_fkey"
            columns: ["auth_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_day: {
        Row: {
          created_at: string
          description: string | null
          id: number
          order: number
          title: string
          workout_id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          order: number
          title: string
          workout_id?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          order?: number
          title?: string
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_day_workout_id_fkey"
            columns: ["workout_id"]
            referencedRelation: "workout"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_day_exercise: {
        Row: {
          created_at: string
          exercise: string
          id: number
          order: number
          reps: string | null
          workout_day_id: number
        }
        Insert: {
          created_at?: string
          exercise: string
          id?: number
          order: number
          reps?: string | null
          workout_day_id?: number
        }
        Update: {
          created_at?: string
          exercise?: string
          id?: number
          order?: number
          reps?: string | null
          workout_day_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_day_exercise_workout_day_id_fkey"
            columns: ["workout_day_id"]
            referencedRelation: "workout_day"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
