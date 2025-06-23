import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Note } from '../../models/note.interface';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  @Input() notes: Note[] = [];
  @Input() showArchived = false;

  constructor(private noteService: NoteService) {}

  toggleArchive(note: Note) {
    if (note.isArchived) {
      this.noteService.updateNote(note.id, { isArchived: false });
    } else {
      this.noteService.archiveNote(note.id);
    }
  }

  deleteNote(note: Note) {
    this.noteService.deleteNote(note.id);
  }

  truncateContent(content: string): string {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  }
}
