import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ArchivedComponent } from './pages/archived/archived.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notes', component: DashboardComponent },
  { path: 'archived', component: ArchivedComponent },
  { path: 'notes/:id', component: NoteDetailComponent },
  { path: 'create', component: CreateNoteComponent }
];
