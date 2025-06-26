import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { DatabaseNote } from '../../models/note.interface';
import { NoteListComponent } from '../../components/note-list/note-list.component';


@Component({
  selector: 'app-archived',
  imports: [CommonModule, NoteListComponent],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.scss'
})
export class ArchivedComponent implements OnInit {
  archivedNotes: DatabaseNote[] = [];
  allTags: string[] = [];


  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe(notes => {
      this.archivedNotes = notes.filter(note => note.is_archived);
      this.updateTags();
    });
  }

  onTagFilter(tag: string) {
    this.noteService.getNotes().subscribe(notes => {
      this.archivedNotes = notes.filter(note => 
        note.is_archived && 
        (tag === '' || note.tags.includes(tag))
      );
    });
  }

  private updateTags() {
    const tagSet = new Set<string>();
    this.archivedNotes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    this.allTags = Array.from(tagSet);
  }
}
