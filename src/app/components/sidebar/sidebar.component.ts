import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ThemeSettingsComponent } from '../theme-settings/theme-settings.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, ThemeSettingsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() tags: string[] = [];
  @Output() tagSelected = new EventEmitter<string>();

  constructor(private router: Router) {}

  selectTag(tag: string) {
    this.tagSelected.emit(tag);
  }

    openSettings() {
    this.router.navigate(['/settings']);
  }

  clearFilter() {
    this.tagSelected.emit('');
  }
}
