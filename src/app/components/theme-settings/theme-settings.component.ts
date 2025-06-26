import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemePreferences } from '../../services/theme.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-theme-settings',
  imports: [CommonModule],
  templateUrl: './theme-settings.component.html',
  styleUrl: './theme-settings.component.scss'
})
export class ThemeSettingsComponent implements OnInit {
  preferences: ThemePreferences = { colorTheme: 'light', fontTheme: 'sans-serif' };

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.preferences.subscribe(prefs => {
      this.preferences = prefs;
    });
  }

  onColorThemeChange(theme: 'light' | 'dark' | 'custom') {
    this.themeService.updateColorTheme(theme);
  }

  onFontThemeChange(font: 'serif' | 'sans-serif' | 'monospace') {
    this.themeService.updateFontTheme(font);
  }
}