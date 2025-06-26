import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoteService } from './services/note.service';
import { ThemeService } from './services/theme.service';
import { DatabaseNote } from './models/note.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'note-taking';
  showSidebar = false;
  allTags: string[] = [];
  notes: DatabaseNote[] = [];

  constructor(
    private router: Router,
    private noteService: NoteService,
    // private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSidebar = !event.url.includes('/login');
    });

   
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.updateTags();
    });
  }

  onTagFilter(tag: string) {
    this.noteService.setSelectedTag(tag);
    
    // If on dashboard, no need to navigate
    if (this.router.url.includes('/dashboard') || this.router.url.includes('/notes')) {
      return;
    }
    
    // Navigate to dashboard with the selected tag
    this.router.navigate(['/dashboard']);
  }

  private updateTags() {
    const tagSet = new Set<string>();
    this.notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    this.allTags = Array.from(tagSet);
  }
}