import { Component, ChangeDetectionStrategy, signal, effect, untracked, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NotesComponent } from './components/notes/notes.component';

export type View = 'home' | 'about' | 'projects' | 'notes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    NotesComponent,
  ],
})
export class AppComponent {
  activeView = signal<View>('home');
  renderedView = signal<View>('home');
  isClosing = signal(false);
  animationDirection = signal<'left' | 'right' | 'none'>('none');
  showMarquee = signal(false);

  navItems = [
    { id: 'about', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
    { id: 'projects', icon: 'M7.864 4.243A7.5 7.5 0 0119.5 12c0 2.42-.095 3.42-1.01 4.593a.75.75 0 01-1.214-.882A4.5 4.5 0 0017.25 12c0-1.892-1.02-3.32-2.31-4.14a.75.75 0 01.924-1.148zM12 6.75a5.25 5.25 0 00-5.25 5.25c0 1.96.347 3.058 1.135 4.093a.75.75 0 01-1.127 1.002A7.5 7.5 0 014.5 12a7.5 7.5 0 0113.864-4.243.75.75 0 01-1.214.882A6 6 0 0012 6.75z' },
    { id: 'notes', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' },
  ] as const;

  constructor() {
    effect(() => {
      const active = this.activeView();
      const rendered = untracked(this.renderedView);

      if (active === rendered) return;

      const wasModuleRendered = rendered !== 'home';

      if (wasModuleRendered) {
        this.isClosing.set(true);
        const duration = this.animationDirection() === 'none' ? 500 : 400;
        setTimeout(() => {
          this.renderedView.set(active);
          this.isClosing.set(false);
        }, duration);
      } else {
        this.renderedView.set(active);
      }
    });
  }

  setView(view: View) {
    if (this.isClosing()) return;

    const currentView = this.activeView();

    if (currentView === view) {
      this.activeView.set('home');
      this.animationDirection.set('none');
    } else {
      const navIds = this.navItems.map(item => item.id);
      const currentIndex = navIds.indexOf(currentView as 'about' | 'projects' | 'notes');
      const newIndex = navIds.indexOf(view as 'about' | 'projects' | 'notes');

      if (currentIndex > -1 && newIndex > -1) {
        this.animationDirection.set(newIndex > currentIndex ? 'right' : 'left');
      } else {
        this.animationDirection.set('none');
      }
      
      this.activeView.set(view);

      if (view !== 'home') {
        this.showMarquee.set(true);
        setTimeout(() => this.showMarquee.set(false), 1500);
      }
    }
  }
}
