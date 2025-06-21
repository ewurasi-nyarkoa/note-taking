import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ArchivedComponent } from './pages/archived/archived.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: DashboardComponent },
  { path: 'archived', component: ArchivedComponent },
  { path: 'notes/:id', component: NoteDetailComponent },
  { path: 'create', component: CreateNoteComponent }
];
