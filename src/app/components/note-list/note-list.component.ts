import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatabaseNote } from '../../models/note.interface';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  @Input() notes: DatabaseNote[] = [];
  @Input() showArchived = false;

  constructor(private noteService: NoteService) {}

  async toggleArchive(note: DatabaseNote) {
    if (note.is_archived) {
      await this.noteService.updateNote(note.id, { is_archived: false });
    } else {
      await this.noteService.archiveNote(note.id);
    }
  }

  async deleteNote(note: DatabaseNote) {
    await this.noteService.deleteNote(note.id);
  }

  truncateContent(content: string): string {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  }
}
