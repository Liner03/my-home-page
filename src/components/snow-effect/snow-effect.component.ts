import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Snowflake {
  id: number;
  left: string;          // 起始水平位置
  size: string;          // 大小
  opacity: number;       // 透明度
  
  // 垂直下落属性
  fallDuration: string;  
  fallDelay: string;

  // 水平摆动属性 (独立控制)
  swayDuration: string;  // 摆动越快，风好似越大
  swayDelay: string;     // 错开摆动的相位
  swayAmplitude: string; // CSS 变量，控制摆动幅度
}

@Component({
  selector: 'app-snow-effect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snow-effect.component.html',
  styleUrls: ['./snow-effect.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnowEffectComponent {
  snowflakes = signal<Snowflake[]>([]);

  constructor() {
    this.generateSnowflakes();
  }

  generateSnowflakes() {
    const flakes: Snowflake[] = [];
    const count = 50; // 雪花数量

    for (let i = 0; i < count; i++) {
      // 随机生成摆动幅度：20px 到 80px 之间
      const amplitude = Math.random() * 60 + 20;

      flakes.push({
        id: i,
        left: Math.random() * 100 + '%',
        size: Math.random() * 0.3 + 0.15 + 'rem', // 0.15rem - 0.45rem
        opacity: Math.random() * 0.4 + 0.1,       // 0.1 - 0.5 (更隐约，不抢眼)
        
        // 垂直下落：10s - 25s (非常慢，营造静谧感)
        fallDuration: Math.random() * 15 + 10 + 's', 
        fallDelay: Math.random() * -20 + 's', // 负延迟，让它们一开始就布满屏幕

        // 水平摆动：3s - 8s (每个人摇摆的节奏都不一样)
        swayDuration: Math.random() * 5 + 3 + 's',
        swayDelay: Math.random() * -10 + 's',
        swayAmplitude: `${amplitude}px`
      });
    }
    this.snowflakes.set(flakes);
  }
}
