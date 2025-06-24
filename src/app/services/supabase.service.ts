import { Injectable } from '@angular/core';
import { supabase } from '../config/supabase.config';
import { Note, DatabaseNote } from '../models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  async testConnection() {
    const { data: tables, error: tablesError } = await supabase
      .from('notes')
      .select('count', { count: 'exact', head: true });
    
    const { data: allData, error: allError } = await supabase
      .from('notes')
      .select('*');
    

  }

  async getNotes(): Promise<DatabaseNote[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    
  
    if (error) {
      throw error;
    }
    return data || [];
  }

  async createNote(note: Note): Promise<DatabaseNote> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('notes')
      .insert([{
        title: note.title,
        content: note.content,
        tags: note.tags,
        is_archived: note.is_archived,
        user_id: user.id
      }])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    return data;
  }

  async updateNote(id: number, updates: Partial<Note>): Promise<DatabaseNote> {
    const { data, error } = await supabase
      .from('notes')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteNote(id: number): Promise<void> {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}