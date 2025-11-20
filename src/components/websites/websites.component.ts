
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type Website } from '../../data.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class WebsitesComponent {
  websites = signal<Website[]>([]);

  constructor(private dataService: DataService) {
    effect(() => {
      const data = this.dataService.getWebsites();
      if (data.length > 0) {
        this.websites.set(data);
      }
    });
  }

  openWebsite(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
