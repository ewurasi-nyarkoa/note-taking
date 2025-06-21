import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() { }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  createNote(title: string, content: string, tags: string[] = []): Note {
    const note: Note = {
      id: Date.now(),
      title,
      content,
      tags,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.notes.push(note);
    this.notesSubject.next([...this.notes]);
    return note;
  }

  updateNote(id: number, updates: Partial<Note>): Note | null {
    const index = this.notes.findIndex(note => note.id === id);
    if (index === -1) return null;
    
    this.notes[index] = { ...this.notes[index], ...updates, updatedAt: new Date() };
    this.notesSubject.next([...this.notes]);
    return this.notes[index];
  }

  deleteNote(id: number): boolean {
    const index = this.notes.findIndex(note => note.id === id);
    if (index === -1) return false;
    
    this.notes.splice(index, 1);
    this.notesSubject.next([...this.notes]);
    return true;
  }

  archiveNote(id: number): boolean {
    return !!this.updateNote(id, { isArchived: true });
  }

  searchNotes(query: string): Note[] {
    if (!query) return this.notes;
    
    const lowerQuery = query.toLowerCase();
    return this.notes.filter(note => 
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  filterByTag(tag: string): Note[] {
    return this.notes.filter(note => note.tags.includes(tag));
  }

  getArchivedNotes(): Note[] {
    return this.notes.filter(note => note.isArchived);
  }

  getActiveNotes(): Note[] {
    return this.notes.filter(note => !note.isArchived);
  }
}
