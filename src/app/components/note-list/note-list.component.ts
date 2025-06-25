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
    console.log('Toggling archive for note:', note.id, 'Current state:', note.is_archived);
    try {
      if (note.is_archived) {
        console.log('Unarchiving note...');
        await this.noteService.updateNote(note.id, { is_archived: false });
      } else {
        console.log('Archiving note...');
        await this.noteService.archiveNote(note.id);
      }
      console.log('Archive toggle completed');
    } catch (error) {
      console.error('Error toggling archive:', error);
    }
  }

  async deleteNote(note: DatabaseNote) {
    await this.noteService.deleteNote(note.id);
  }

  truncateContent(content: string): string {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  }
}
