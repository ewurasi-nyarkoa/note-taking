import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { DatabaseNote } from '../../models/note.interface';

@Component({
  selector: 'app-note-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.scss'
})
export class NoteEditorComponent implements OnInit {
  note: DatabaseNote | null = null;
  title = '';
  content = '';
  tags: string[] = [];
  tagInput = '';
  isLoading = false;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadNote(+id);
    }
  }

  async loadNote(id: number) {
    try {
      this.isLoading = true;
      this.noteService.getNotes().subscribe(notes => {
        this.note = notes.find(n => n.id === id) || null;
        if (this.note) {
          this.title = this.note.title;
          this.content = this.note.content;
          this.tags = [...this.note.tags];
        }
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error loading note:', error);
      this.isLoading = false;
    }
  }

  addTag() {
    if (this.tagInput.trim() && !this.tags.includes(this.tagInput.trim())) {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  async save() {
    if (!this.title.trim()) return;
    
    try {
      this.isLoading = true;
      const noteData = {
        title: this.title,
        content: this.content,
        tags: this.tags,
        is_archived: false
      };

      if (this.isEditing && this.note) {
        await this.noteService.updateNote(this.note.id, noteData);
      } else {
        await this.noteService.createNote(noteData.title, noteData.content, noteData.tags);
      }
      
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      this.isLoading = false;
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
