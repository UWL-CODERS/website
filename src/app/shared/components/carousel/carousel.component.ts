import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterModule} from '@angular/router';

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
  imports: [RouterModule, NgOptimizedImage],
  template: `
  <div class="max-w-6xl mx-auto select-none">
    <div class="flex items-center gap-4">
      <!-- Prev -->
      <button type="button"
        class="cursor-pointer inline-flex items-center justify-center size-12 rounded-full bg-white border shadow hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black/20"
        (click)="prev()" aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
  
      <!-- Carousel -->
      <div class="flex-1 overflow-hidden">
        <div class="flex transition-transform duration-500 ease-in-out"
          [style.transform]="'translateX(-' + (currentIndex() * 100) + '%)'">
          @for (item of items(); track item; let i = $index) {
            <div
              class="min-w-full text-center"
              [attr.aria-hidden]="currentIndex() !== i">
              <div class="grid md:grid-cols-2 items-center rounded-xl border m-8">
                <div class="aspect-auto overflow-hidden rounded-lg p-8">
                  @if (item.imageUrl) {
                    <img
                      [ngSrc]="item.imageUrl!"
                      alt="{{ item.title }}"
                      width="800" height="450" />
                  }
                </div>
                <div class="flex flex-col gap-4 p-8">
                  <h2>{{ item.title }}</h2>
                  @if (item.description) {
                    <p class="text-lg">{{ item.description }}</p>
                  }
                  @if (item.tags?.length) {
                    <ul class="flex flex-wrap gap-2 justify-center">
                      @for (t of item.tags; track t) {
                        <li
                          class="px-2 py-1 text-sm rounded-full bg-neutral-100 text-neutral-700 border">
                          {{ t }}
                        </li>
                      }
                    </ul>
                  }
                  <div class="mt-2">
                    @if (item.externalUrl) {
                      <a
                        [href]="item.externalUrl"
                        target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-black/30">
                        <span>{{ item.button || 'Open' }}</span>
                        <!-- External link icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" stroke-width="2" class="size-4">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13 11l8-8m0 0h-6m6 0v6M15 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9"/>
                        </svg>
                      </a>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
  
      <!-- Next -->
      <button type="button"
        class="cursor-pointer inline-flex items-center justify-center size-12 rounded-full bg-white border shadow hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black/20"
        (click)="next()" aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  readonly items = signal<CarouselItem[]>([]);
  @Input() set itemsInput(value: CarouselItem[]) {
    this.items.set(value ?? []);
  }

  private index = signal(0);
  currentIndex = computed(() => this.index());

  next(): void {
    const arr = this.items();
    if (!arr.length) return;
    this.index.update((i) => (i + 1) % arr.length);
  }
  prev(): void {
    const arr = this.items();
    if (!arr.length) return;
    this.index.update((i) => (i - 1 + arr.length) % arr.length);
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
