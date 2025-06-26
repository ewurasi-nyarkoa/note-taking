import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { DatabaseNote } from '../../models/note.interface';

import { NoteListComponent } from '../../components/note-list/note-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, NoteListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  notes: DatabaseNote[] = [];
  filteredNotes: DatabaseNote[] = [];
  searchQuery = '';
  selectedTag = '';
  allTags: string[] = [];

  constructor(
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get notes
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes.filter(note => !note.is_archived);
      this.updateFilteredNotes();
      this.updateTags();
    });
    
    // Listen for tag selection changes
    this.noteService.getSelectedTag().subscribe(tag => {
      this.selectedTag = tag;
      this.updateFilteredNotes();
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
      result = this.noteService.searchNotes(this.searchQuery).filter(note => !note.is_archived);
    }
    
    if (this.selectedTag) {
      result = result.filter(note => note.tags.includes(this.selectedTag));
    }
    
    this.filteredNotes = result;
  }



  openSettings() {
    this.router.navigate(['/settings']);
  }

  private updateTags() {
    const tagSet = new Set<string>();
    this.notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    this.allTags = Array.from(tagSet);
  }
}
