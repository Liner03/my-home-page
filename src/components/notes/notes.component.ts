
import { Component, ChangeDetectionStrategy, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type NoteCategory, type Note } from '../../data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class NotesComponent {
  activeCategory = signal<NoteCategory>('inspiration');
  notes = signal<Note[]>([]);

  constructor(private dataService: DataService) {
    effect(() => {
      const data = this.dataService.getNotes();
      if (data.length > 0) {
        this.notes.set(data);
      }
    });
  }

  filteredNotes = computed(() => {
    return this.notes().filter(note => note.category === this.activeCategory());
  });

  setCategory(category: NoteCategory) {
    this.activeCategory.set(category);
  }
}
