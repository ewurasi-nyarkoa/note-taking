import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { DatabaseNote } from '../../models/note.interface';


@Component({
  selector: 'app-note-detail',
  imports: [CommonModule],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss'
})
export class NoteDetailComponent implements OnInit {
  note: DatabaseNote | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNote(+id);
    }
  }

  loadNote(id: number) {
    this.noteService.getNotes().subscribe(notes => {
      this.note = notes.find(n => n.id === id) || null;
       this.isLoading = false;
    });
  }

  editNote() {
    if (this.note) {
      this.router.navigate(['/edit', this.note.id]);
    }
  }

  async toggleArchive() {
    if (this.note) {
      await this.noteService.updateNote(this.note.id, { is_archived: !this.note.is_archived });
    }
  }

  async deleteNote() {
    if (this.note && confirm('Are you sure you want to delete this note?')) {
      await this.noteService.deleteNote(this.note.id);
      this.router.navigate(['/dashboard']);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
