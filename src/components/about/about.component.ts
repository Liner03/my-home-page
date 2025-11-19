
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class AboutComponent {
  tags = [
    'Full-Stack Development',
    'Interactive Design',
    'AI Integration',
    'Automation Workflows',
    'UI/UX Aesthetics',
    'Cloud Architecture'
  ];
}
