import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.interface';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NoteListComponent } from '../../components/note-list/note-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, SidebarComponent, NoteListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchQuery = '';
  selectedTag = '';
  allTags: string[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes.filter(note => !note.isArchived);
      this.updateFilteredNotes();
      this.updateTags();
    });
  }

  onSearch() {
    this.updateFilteredNotes();
  }

  onTagFilter(tag: string) {
    this.selectedTag = tag;
    this.updateFilteredNotes();
  }

  private updateFilteredNotes() {
    let result = this.notes;
    
    if (this.searchQuery) {
      result = this.noteService.searchNotes(this.searchQuery).filter(note => !note.isArchived);
    }
    
    if (this.selectedTag) {
      result = result.filter(note => note.tags.includes(this.selectedTag));
    }
    
    this.filteredNotes = result;
  }

  private updateTags() {
    const tagSet = new Set<string>();
    this.notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    this.allTags = Array.from(tagSet);
  }
}
