import { ChangeDetectionStrategy, Component, Input, signal, computed, HostListener } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CarouselItem {
  title: string;
  description?: string;
  imageUrl?: string;
  externalUrl?: string;
  tags?: string[];
  button?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
  <div class="w-full relative select-none">
    <div class="overflow-hidden">
      <div class="flex transition-transform duration-500 ease-in-out"
           [style.transform]="'translateX(-' + (currentIndex() * 100) + '%)'">
        <div *ngFor="let item of items(); let i = index"
             class="min-w-full px-2 sm:px-4"
             [attr.aria-hidden]="currentIndex() !== i">
          <div class="grid md:grid-cols-2 gap-6 items-start"
               [ngClass]="cardClass || 'bg-white border rounded-xl shadow p-6'">
            <div class="aspect-video w-full overflow-hidden rounded-lg bg-neutral-100">
              <img *ngIf="item.imageUrl"
                   [ngSrc]="item.imageUrl!"
                   alt="{{ item.title }}"
                   class="h-full w-full object-contain"
                   width="800" height="450" />
            </div>
            <div class="flex flex-col gap-3">
              <h3 class="text-xl font-semibold">{{ item.title }}</h3>
              <p class="text-sm text-neutral-600" *ngIf="item.description">{{ item.description }}</p>
              <ul class="flex flex-wrap gap-2 mt-1" *ngIf="item.tags?.length">
                <li *ngFor="let t of item.tags"
                    class="px-2 py-0.5 text-xs rounded-full bg-neutral-100 text-neutral-700 border">
                  {{ t }}
                </li>
              </ul>
              <div class="mt-2">
                <a *ngIf="item.externalUrl"
                   [href]="item.externalUrl"
                   target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-black text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black/30">
                  <span>{{ item.button || 'Open' }}</span>
                  <!-- External link icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                       fill="none" stroke="currentColor" stroke-width="2" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M13 11l8-8m0 0h-6m6 0v6M15 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Prev/Next -->
    <button type="button"
      class="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-9 rounded-full bg-white/90 border shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
      (click)="prev()" aria-label="Previous slide">
      <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <button type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-9 rounded-full bg-white/90 border shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
      (click)="next()" aria-label="Next slide">
      <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
    </button>

    <!-- Dots -->
    <div class="mt-4 flex items-center justify-center gap-2">
      <button type="button"
              *ngFor="let _ of items(); let i = index"
              class="size-2.5 rounded-full transition-colors"
              [ngClass]="currentIndex() === i ? 'bg-black' : 'bg-neutral-300 hover:bg-neutral-400'"
              (click)="goTo(i)"
              aria-label="Go to slide {{ i + 1 }}">
      </button>
    </div>
  </div>
  `,
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  // Preserve your signal-style API while removing PrimeNG
  readonly items = signal<CarouselItem[]>([]);
  @Input() set itemsInput(value: CarouselItem[]) { this.items.set(value ?? []); }
  @Input() cardClass = '';

  private index = signal(0);
  currentIndex = computed(() => this.index());

  next(): void {
    const arr = this.items();
    if (!arr.length) return;
    this.index.update(i => (i + 1) % arr.length);
  }
  prev(): void {
    const arr = this.items();
    if (!arr.length) return;
    this.index.update(i => (i - 1 + arr.length) % arr.length);
  }
  goTo(i: number): void {
    const n = this.items().length;
    if (i >= 0 && i < n) this.index.set(i);
  }

  // Keyboard navigation
  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent): void {
    if (ev.key === 'ArrowRight') this.next();
    else if (ev.key === 'ArrowLeft') this.prev();
  }

  // Touch swipe
  private touchStartX = 0;
  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
  }
  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? this.next() : this.prev();
  }
}
