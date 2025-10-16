export interface Story {
  id: number;
  title: string;
  theme: string;
  root_node: StoryNode;
  all_nodes: Record<number, StoryNode>;
  created_at?: string;
}

export interface StoryNode {
  id: number;
  content: string;
  is_ending: boolean;
  is_winning_ending: boolean;
  options?: StoryOption[];
}

export interface StoryOption {
  text: string;
  node_id: number;
}

export interface JobResponse {
  job_id: string;
  status: "processing" | "completed" | "failed";
}

export interface JobStatusResponse {
  status: "processing" | "completed" | "failed";
  story_id?: number;
  error?: string;
}

export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Story {
  id: number;
  title: string;
  theme: string;
  root_node: StoryNode;
  all_nodes: Record<number, StoryNode>;
  created_at?: string;
}
