import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note, DatabaseNote } from '../models/note.interface';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesSubject = new BehaviorSubject<DatabaseNote[]>([]);
  private selectedTagSubject = new BehaviorSubject<string>('');

  constructor(private supabaseService: SupabaseService) {
    this.supabaseService.testConnection();
    this.loadNotes();
  }

  async loadNotes() {
    try {
      console.log('Loading notes...');
      const notes = await this.supabaseService.getNotes();
      console.log('Notes loaded in service:', notes);
      this.notesSubject.next(notes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  }

  getNotes(): Observable<DatabaseNote[]> {
    return this.notesSubject.asObservable();
  }

  async createNote(title: string, content: string, tags: string[] = []): Promise<DatabaseNote> {
    const note: Note = {
      title,
      content,
      tags,
      is_archived: false
    };
    
    const createdNote = await this.supabaseService.createNote(note);
    this.loadNotes(); 
    return createdNote;
  }

  async updateNote(id: number, updates: Partial<Note>): Promise<DatabaseNote> {
    const updatedNote = await this.supabaseService.updateNote(id, updates);
    this.loadNotes(); 
    return updatedNote;
  }

  async deleteNote(id: number): Promise<void> {
    await this.supabaseService.deleteNote(id);
    this.loadNotes();
  }

  async archiveNote(id: number): Promise<DatabaseNote> {
    return this.updateNote(id, { is_archived: true });
  }

  searchNotes(query: string): DatabaseNote[] {
    const currentNotes = this.notesSubject.value;
    if (!query) return currentNotes;
    
    const lowerQuery = query.toLowerCase();
    return currentNotes.filter(note => 
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  filterByTag(tag: string): DatabaseNote[] {
    return this.notesSubject.value.filter(note => note.tags.includes(tag));
  }

  getArchivedNotes(): DatabaseNote[] {
    return this.notesSubject.value.filter(note => note.is_archived);
  }

  getActiveNotes(): DatabaseNote[] {
    return this.notesSubject.value.filter(note => !note.is_archived);
  }

  setSelectedTag(tag: string) {
    this.selectedTagSubject.next(tag);
  }

  getSelectedTag(): Observable<string> {
    return this.selectedTagSubject.asObservable();
  }

  getCurrentSelectedTag(): string {
    return this.selectedTagSubject.value;
  }
}