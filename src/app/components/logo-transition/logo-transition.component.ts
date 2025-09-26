import { Component, ElementRef, Renderer2, AfterViewInit, inject, viewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-logo-transition',
  templateUrl: './logo-transition.component.html',
  styleUrl: './logo-transition.component.scss'
})
export class LogoTransitionComponent implements AfterViewInit {
  private readonly renderer = inject(Renderer2);

  public readonly logoCubeContainer = viewChild.required<ElementRef<HTMLElement>>('logoCubeContainer');
  private readonly cubeElement = viewChild.required<ElementRef<HTMLElement>>('cubeElement');

  private isAnimating = false;
  private animationTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private resetPositionTimeoutId: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    this.setRandomInitialPosition();
  }

  private setRandomInitialPosition(): void {
    const cube = this.cubeElement().nativeElement;
    const randomYRotation = Math.random() * 360;
    const randomZRotation = Math.random() * 360;

    this.renderer.setStyle(cube, 'transform', `rotateY(${randomYRotation}deg) rotateZ(${randomZRotation}deg)`);
  }

  startAnimation(): void {
    if (this.isAnimating) {
      return;
    }
    this.isAnimating = true;

    // Clear any pending timeouts from previous runs if startAnimation is called rapidly
    if (this.animationTimeoutId) {
      clearTimeout(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
    if (this.resetPositionTimeoutId) {
      clearTimeout(this.resetPositionTimeoutId);
      this.resetPositionTimeoutId = null;
    }

    const containerElement = this.logoCubeContainer().nativeElement;
    const cube = this.cubeElement().nativeElement;

    // Reset classes to the initial state
    this.renderer.removeClass(containerElement, 'zoom-in');
    this.renderer.removeClass(containerElement, 'open');
    this.renderer.removeClass(cube, 'open');
    this.renderer.removeClass(containerElement, 'close');
    this.renderer.removeClass(containerElement, 'zoom-out');

    // Remove any inline transform that might have been set
    this.renderer.removeStyle(cube, 'transform');

    // 1. Zoom In
    this.renderer.addClass(containerElement, 'zoom-in');

    // 2. Trigger cube animation
    setTimeout(() => {
      this.renderer.addClass(containerElement, 'open');
      this.renderer.addClass(cube, 'open');
    }, 550); // Short delay to allow zoom-in to complete

    // 3. Close cube
    setTimeout(() => {
      this.renderer.removeClass(containerElement, 'open');
      this.renderer.removeClass(cube, 'open');
      this.renderer.addClass(containerElement, 'close');
    }, 500); // Extended delay before closing

    // 4. Zoom Out and Fade Out after another delay
    setTimeout(() => {
      //Fade Out
      gsap.to(containerElement, {
        opacity: 0, // Fade out over 0.5 seconds
        duration: 0.5,
        onComplete: () => {
        this.renderer.removeClass(containerElement, 'zoom-in');
        this.renderer.removeClass(containerElement, 'close');
        this.renderer.addClass(containerElement, 'zoom-out');
        this.isAnimating = false;

          // Schedule the position reset slightly after zoom-out starts
          // Using a separate timeout ensures it runs even if the component is destroyed before the main timeout finishes completely
          this.resetPositionTimeoutId = setTimeout(() => {
            // Check if the element still exists before resetting (optional safety)
            if (this.cubeElement()) {
               this.setRandomInitialPosition();
            }
            this.resetPositionTimeoutId = null;
          }, 1500); // Small delay after zoom-out starts

          this.animationTimeoutId = null; // Clear the timeout ID after execution
        }
      });
    }, 700); // Extended delay before zoom-out
  }
}
