import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ThemePreferences {
  colorTheme: 'light' | 'dark' | 'custom';
  fontTheme: 'serif' | 'sans-serif' | 'monospace';
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'note-app-preferences';
  
  private preferencesSubject = new BehaviorSubject<ThemePreferences>({
    colorTheme: 'light',
    fontTheme: 'sans-serif'
  });

  constructor() {
    this.loadPreferences();
    this.applyTheme();
  }

  get preferences() {
    return this.preferencesSubject.asObservable();
  }

  updateColorTheme(theme: 'light' | 'dark' | 'custom') {
    const current = this.preferencesSubject.value;
    const updated = { ...current, colorTheme: theme };
    this.preferencesSubject.next(updated);
    this.savePreferences(updated);
    this.applyTheme();
  }

  updateFontTheme(font: 'serif' | 'sans-serif' | 'monospace') {
    const current = this.preferencesSubject.value;
    const updated = { ...current, fontTheme: font };
    this.preferencesSubject.next(updated);
    this.savePreferences(updated);
    this.applyTheme();
  }

  private loadPreferences() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const preferences = JSON.parse(stored);
        this.preferencesSubject.next(preferences);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }

  private savePreferences(preferences: ThemePreferences) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
  }

  private applyTheme() {
    const { colorTheme, fontTheme } = this.preferencesSubject.value;
    const body = document.body;
    
    body.classList.remove('theme-light', 'theme-dark', 'theme-custom');
    body.classList.remove('font-serif', 'font-sans-serif', 'font-monospace');
    
    body.classList.add(`theme-${colorTheme}`);
    body.classList.add(`font-${fontTheme}`);
  }
}