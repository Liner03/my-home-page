
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type NoteCategory = 'todo' | 'learning' | 'inspiration' | 'project' | 'secure';

interface NoteItem {
  id: number;
  content: string;
  category: NoteCategory;
  timestamp: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class NotesComponent {
  activeCategory = signal<NoteCategory>('inspiration');

  notes: NoteItem[] = [
    { id: 1, content: 'Research state management in zoneless Angular applications for Project Nebula.', category: 'todo', timestamp: '2 hours ago' },
    { id: 2, content: 'Explore using CSS custom properties for more dynamic themeing.', category: 'learning', timestamp: '1 day ago' },
    { id: 3, content: 'The concept of "digital gardens" could be a great metaphor for a personal knowledge base.', category: 'inspiration', timestamp: '3 days ago' },
    { id: 4, content: 'Implement a particle animation for the timeline entry sequence in the portfolio.', category: 'project', timestamp: '5 hours ago' },
    { id: 5, content: 'API_KEY for personal weather station project: ******************', category: 'secure', timestamp: '1 week ago' },
    { id: 6, content: 'A futuristic OS portfolio should feel responsive and alive, not static.', category: 'inspiration', timestamp: '2 days ago' },
  ];
  
  get filteredNotes() {
    return this.notes.filter(note => note.category === this.activeCategory());
  }

  setCategory(category: NoteCategory) {
    this.activeCategory.set(category);
  }
}
