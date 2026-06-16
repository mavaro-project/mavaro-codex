export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      admin_memberships: {
        Row: {
          created_at: string;
          organization_id: string;
          role: "admin" | "owner";
          user_id: string;
        };
        Insert: {
          created_at?: string;
          organization_id: string;
          role?: "admin" | "owner";
          user_id: string;
        };
        Update: {
          organization_id?: string;
          role?: "admin" | "owner";
          user_id?: string;
        };
        Relationships: [];
      };
      circle_members: {
        Row: { circle_id: string; created_at: string; status: string; user_id: string };
        Insert: { circle_id: string; created_at?: string; status?: string; user_id: string };
        Update: { circle_id?: string; status?: string; user_id?: string };
        Relationships: [];
      };
      circles: {
        Row: {
          created_at: string;
          duration_weeks: number;
          explanation: string[];
          id: string;
          name: string;
          office_city: string | null;
          organization_id: string;
          program_type: string | null;
          score: number | null;
          start_date: string | null;
          status: "draft" | "active" | "paused" | "completed" | "archived";
          target_size: number | null;
          theme: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          duration_weeks?: number;
          explanation?: string[];
          id?: string;
          name: string;
          office_city?: string | null;
          organization_id: string;
          program_type?: string | null;
          score?: number | null;
          start_date?: string | null;
          status?: "draft" | "active" | "paused" | "completed" | "archived";
          target_size?: number | null;
          theme?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["circles"]["Insert"]>;
        Relationships: [];
      };
      events: {
        Row: {
          circle_id: string;
          created_at: string;
          description: string | null;
          end_time: string;
          event_type: string;
          id: string;
          location: string | null;
          office_city: string | null;
          organization_id: string | null;
          company_id: string | null;
          start_time: string;
          status: string | null;
          title: string;
          updated_at: string;
          venue_id: string | null;
        };
        Insert: {
          circle_id: string;
          created_at?: string;
          description?: string | null;
          end_time: string;
          event_type: string;
          id?: string;
          location?: string | null;
          office_city?: string | null;
          organization_id?: string | null;
          company_id?: string | null;
          start_time: string;
          status?: string | null;
          title: string;
          updated_at?: string;
          venue_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      feedback: {
        Row: {
          comment: string | null;
          created_at: string;
          event_id: string;
          id: string;
          people_they_would_meet_again: string[];
          helped_workplace_connection: boolean | null;
          rating: number | null;
          user_id: string;
          would_attend_again: boolean;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          event_id: string;
          id?: string;
          people_they_would_meet_again?: string[];
          helped_workplace_connection?: boolean | null;
          rating?: number | null;
          user_id: string;
          would_attend_again?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["feedback"]["Insert"]>;
        Relationships: [];
      };
      organizations: {
        Row: {
          city: string;
          created_at: string;
          company_size: string | null;
          headquarters_city: string | null;
          id: string;
          industry: string | null;
          name: string;
          neighborhood: string;
          office_locations: string[] | null;
          status: string | null;
          type: "apartment_building" | "coworking" | "employer" | "gym" | "venue";
          updated_at: string;
          workplace_model: string | null;
        };
        Insert: {
          city: string;
          created_at?: string;
          company_size?: string | null;
          headquarters_city?: string | null;
          id?: string;
          industry?: string | null;
          name: string;
          neighborhood: string;
          office_locations?: string[] | null;
          status?: string | null;
          type: "apartment_building" | "coworking" | "employer" | "gym" | "venue";
          updated_at?: string;
          workplace_model?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Insert"]>;
        Relationships: [];
      };
      pilot_leads: {
        Row: {
          city: string;
          community_type: string;
          created_at: string;
          email: string;
          id: string;
          name: string;
          organization: string;
        };
        Insert: {
          city: string;
          community_type: string;
          created_at?: string;
          email: string;
          id?: string;
          name: string;
          organization: string;
        };
        Update: Partial<Database["public"]["Tables"]["pilot_leads"]["Insert"]>;
        Relationships: [];
      };
      pilot_requests: {
        Row: {
          id: string;
          full_name: string;
          work_email: string;
          company_name: string;
          company_size: string | null;
          city: string | null;
          title: string | null;
          primary_goal: string | null;
          workplace_model: string | null;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          work_email: string;
          company_name: string;
          company_size?: string | null;
          city?: string | null;
          title?: string | null;
          primary_goal?: string | null;
          workplace_model?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["pilot_requests"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          age_range: string | null;
          availability: string[];
          city: string | null;
          created_at: string;
          accessibility_needs: string | null;
          department: string | null;
          dietary_restrictions: string | null;
          email: string | null;
          erg_interests: string[] | null;
          id: string;
          interests: string[];
          manager_status: boolean | null;
          name: string;
          neighborhood: string | null;
          notes: string | null;
          onboarding_completed: boolean | null;
          organization_id: string | null;
          organization_type: "apartment_building" | "coworking" | "employer" | "gym" | "venue" | null;
          preferred_formats: string[] | null;
          preferred_group_size: number | null;
          role_level: string | null;
          social_goals: string[];
          start_date: string | null;
          tenure: string | null;
          updated_at: string;
          vibes: string[];
          work_mode: string | null;
        };
        Insert: {
          accessibility_needs?: string | null;
          age_range?: string | null;
          availability?: string[];
          city?: string | null;
          created_at?: string;
          department?: string | null;
          dietary_restrictions?: string | null;
          email?: string | null;
          erg_interests?: string[] | null;
          id: string;
          interests?: string[];
          manager_status?: boolean | null;
          name: string;
          neighborhood?: string | null;
          notes?: string | null;
          onboarding_completed?: boolean | null;
          organization_id?: string | null;
          organization_type?: "apartment_building" | "coworking" | "employer" | "gym" | "venue" | null;
          preferred_formats?: string[] | null;
          preferred_group_size?: number | null;
          role_level?: string | null;
          social_goals?: string[];
          start_date?: string | null;
          tenure?: string | null;
          updated_at?: string;
          vibes?: string[];
          work_mode?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      rsvps: {
        Row: {
          created_at: string;
          event_id: string;
          status: "going" | "maybe" | "cant_go";
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          event_id: string;
          status: "going" | "maybe" | "cant_go";
          updated_at?: string;
          user_id: string;
        };
        Update: {
          event_id?: string;
          status?: "going" | "maybe" | "cant_go";
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      venues: {
        Row: {
          city: string;
          created_at: string;
          id: string;
          name: string;
          neighborhood: string;
          organization_id: string | null;
          partner_status: string;
          type: string;
        };
        Insert: {
          city: string;
          created_at?: string;
          id?: string;
          name: string;
          neighborhood: string;
          organization_id?: string | null;
          partner_status?: string;
          type: string;
        };
        Update: Partial<Database["public"]["Tables"]["venues"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_my_circle_members: {
        Args: { target_circle_id: string };
        Returns: Array<{ id: string; name: string; neighborhood: string | null }>;
      };
      resolve_onboarding_organization: {
        Args: {
          requested_type: "apartment_building" | "coworking" | "employer" | "gym" | "venue";
        };
        Returns: string | null;
      };
      save_circle_proposal: {
        Args: { proposal: Json };
        Returns: string;
      };
    };
    Enums: {
      admin_role: "admin" | "owner";
      circle_status: "draft" | "active" | "completed";
      organization_type: "apartment_building" | "coworking" | "employer" | "gym" | "venue";
      rsvp_status: "going" | "maybe" | "cant_go";
    };
    CompositeTypes: Record<string, never>;
  };
};
