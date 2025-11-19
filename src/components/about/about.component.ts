
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type AboutData } from '../../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class AboutComponent {
  aboutData = signal<AboutData | null>(null);

  constructor(private dataService: DataService) {
    effect(() => {
      const data = this.dataService.getAboutData();
      if (data) {
        this.aboutData.set(data);
      }
    });
  }
}
