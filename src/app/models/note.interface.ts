export interface Note {
  id?: number;
  title: string;
  content: string;
  tags: string[];
  is_archived: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseNote {
  id: number;
  title: string;
  content: string;
  tags: string[];
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}