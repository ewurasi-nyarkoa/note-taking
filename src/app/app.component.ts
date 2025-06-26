import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoteService } from './services/note.service';
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
    private noteService: NoteService
  ) {
 
    const currentUrl = window.location.href;
    this.showSidebar = !(
      currentUrl.endsWith('/') || 
      currentUrl.endsWith('/login') || 
      currentUrl.includes('/login')
    );
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Update sidebar visibility
      this.showSidebar = !(
        event.url === '/' || 
        event.url === '/login'
      );
      
      // Reload notes when navigating to dashboard
      if (event.url === '/dashboard' || event.url === '/notes') {
        this.noteService.loadNotes();
      }
    });
   
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.updateTags();
    });
  }

  onTagFilter(tag: string) {
    this.noteService.setSelectedTag(tag);
    
    if (this.router.url.includes('/dashboard') || this.router.url.includes('/notes')) {
      return;
    }
    
    this.router.navigate(['/dashboard']);
  }

  private updateTags() {
    const tagSet = new Set<string>();
    this.notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    this.allTags = Array.from(tagSet);
  }
}