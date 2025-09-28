import {Component} from '@angular/core';
import {gsap} from 'gsap';

@Component({
  selector: 'app-page-transition',
  templateUrl: './page-transition.component.html',
  styleUrl: './page-transition.component.scss',
})
export class PageTransitionComponent {
  public transitionIn(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.animateTransition(1, 0).then(resolve); // Start animation immediately
    });
  }

  public transitionOut() {
    return this.animateTransition(0, 1);
  }

  public transitionOutAndIn() {
    return new Promise<void>((resolve) => {
      this.transitionOut().then(() => {
        this.transitionIn().then(resolve);
      });
    });
  }

  private animateTransition(fromScale: number, toScale: number) {
    return new Promise<void>((resolve) => {
      const ease = 'power4.inOut'; // Smooth easing for a natural transition
      const duration = 0.6; // Reduced duration for faster transitions

      gsap.set('.block', {visibility: 'visible', scaleY: fromScale});

      // Animate the first row of blocks
      gsap.to('.transition-row.row-1 .block', {
        scaleY: toScale,
        duration: duration,
        stagger: {each: 0.1, from: 'end'}, // Faster stagger
        ease: ease,
      });

      // Animate the second row of blocks and resolve the promise
      gsap.to('.transition-row.row-2 .block', {
        scaleY: toScale,
        duration: duration,
        stagger: {each: 0.1, from: 'end'}, // Faster stagger
        ease: ease,
        onComplete: resolve,
      });
    });
  }
}
