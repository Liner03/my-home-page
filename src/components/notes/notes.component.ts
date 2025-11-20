
import { Component, ChangeDetectionStrategy, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type NoteCategory, type Note } from '../../data.service';
import { RssService } from '../../rss.service';

interface CategoryInfo {
  id: NoteCategory;
  label: string;
}

const CATEGORY_LABELS: Record<NoteCategory, string> = {
  'inspiration': 'Inspirations',
  'todo': 'To-Do',
  'learning': 'Learning',
  'project': 'Project Notes',
  'secure': 'Secure'
};

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class NotesComponent {
  activeCategory = signal<NoteCategory>('inspiration');

  // Get notes from RSS service
  notes = this.rssService.getNotes();
  loading = this.rssService.isLoading();
  error = this.rssService.getError();

  constructor(
    private dataService: DataService,
    private rssService: RssService
  ) {
    effect(() => {
      const rssNotes = this.notes();
      if (rssNotes.length > 0) {
        // Set initial category to first available category
        const uniqueCategories = this.getUniqueCategories(rssNotes);
        if (uniqueCategories.length > 0 && !uniqueCategories.includes(this.activeCategory())) {
          this.activeCategory.set(uniqueCategories[0]);
        }
      }
    });
  }

  // Get unique categories from notes data
  categories = computed(() => {
    const uniqueCategories = this.getUniqueCategories(this.notes());
    return uniqueCategories.map(cat => ({
      id: cat,
      label: CATEGORY_LABELS[cat] || cat
    }));
  });

  filteredNotes = computed(() => {
    return this.notes().filter(note => note.category === this.activeCategory());
  });

  setCategory(category: NoteCategory) {
    this.activeCategory.set(category);
  }

  private getUniqueCategories(notes: Note[]): NoteCategory[] {
    const categoriesSet = new Set<NoteCategory>();
    notes.forEach(note => categoriesSet.add(note.category));
    return Array.from(categoriesSet).sort();
  }
}
