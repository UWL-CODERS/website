import { Component, AfterViewInit, ElementRef, PLATFORM_ID, inject, viewChild, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PageMeta } from '../../models/meta.model';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnInit {
  private seoService = inject(SeoService);
  private platformId = inject<object>(PLATFORM_ID);

  readonly slider = viewChild.required<ElementRef<HTMLElement>>('slider');
  readonly prevSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('prevSlideBtn');
  readonly nextSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('nextSlideBtn');
  readonly sliderDots = viewChild.required<ElementRef<HTMLElement>>('sliderDots');

  private currentSlide = 0;
  private slideInterval: ReturnType<typeof setInterval> | undefined;

  ngOnInit(): void {
    const pageMeta: PageMeta = {
      title: 'About Us',
      description: 'Meet the talented creators behind our website. Each of them brings a unique set of skills and creativity to our platform.',
      keywords: 'about us, team, developers, UWL coders, programming community, web development, coding club, tech team, software development'
    };
    this.seoService.setPageMeta(pageMeta);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSlider();
    }
  }

  initSlider(): void {
    if (isPlatformBrowser(this.platformId)) {
      const sliderValue = this.slider();
      const sliderDots = this.sliderDots();
      if (!sliderValue || !this.prevSlideBtn() || !this.nextSlideBtn() || !sliderDots) {
        console.error('Required elements not found');
        return;
      }

      const slider = sliderValue.nativeElement;
      const dotsContainer = sliderDots.nativeElement;

      const slides = slider.querySelectorAll('.slide');
      const totalSlides = slides.length;

      this.createDots(totalSlides, dotsContainer);
      this.updateSlider();

      this.startAutoSlide();

      slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
      slider.addEventListener('mouseleave', () => this.startAutoSlide());

      if (typeof window !== 'undefined') {
        window.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
      }
    }
  }

  private createDots(totalSlides: number, dotsContainer: HTMLElement): void {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  private updateSlider(): void {
    const sliderValue = this.slider();
    const sliderDots = this.sliderDots();
    if (sliderValue && sliderDots) {
      const slider = sliderValue.nativeElement;
      const dotsContainer = sliderDots.nativeElement;

      slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;

      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot: Element, index: number) => {
        if (index === this.currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  public nextSlide(): void {
    const slider = this.slider();
    if (slider) {
      const totalSlides = slider.nativeElement.querySelectorAll('.slide').length;
      this.currentSlide = (this.currentSlide + 1) % totalSlides;
      this.updateSlider();
    }
  }

  public prevSlide(): void {
    const slider = this.slider();
    if (slider) {
      const totalSlides = slider.nativeElement.querySelectorAll('.slide').length;
      this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
      this.updateSlider();
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateSlider();
  }

  private startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }
  }

  private pauseAutoSlide(): void {
    if (isPlatformBrowser(this.platformId) && this.slideInterval !== undefined) {
      clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }

  private handleKeyNavigation(e: KeyboardEvent): void {
    if (isPlatformBrowser(this.platformId)) {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    }
  }
}
