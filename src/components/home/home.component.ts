
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { DataService, type HomeData } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  homeData = signal<HomeData | null>(null);

  constructor(private dataService: DataService) {
    effect(() => {
      const data = this.dataService.getHomeData();
      if (data) {
        this.homeData.set(data);
      }
    });
  }
}
