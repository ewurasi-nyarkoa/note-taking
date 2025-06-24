import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-create-note',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss'
})
export class CreateNoteComponent {
  title = '';
  content = '';
  tagInput = '';
  tags: string[] = [];

  constructor(
    private noteService: NoteService,
    private router: Router
  ) {}

  addTag() {
    if (this.tagInput.trim() && !this.tags.includes(this.tagInput.trim())) {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  saveNote() {
    if (this.title.trim() && this.content.trim()) {
      this.noteService.createNote(this.title.trim(), this.content.trim(), this.tags);
      this.router.navigate(['/notes']);
    }
  }

  cancel() {
    this.router.navigate(['/notes']);
  }
}
