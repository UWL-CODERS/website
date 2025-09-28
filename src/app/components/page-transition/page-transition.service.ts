import {Injectable} from '@angular/core';
import {gsap} from 'gsap';

@Injectable({providedIn: 'root'})
export class PageTransitionService {
  /**
   * Animate the transition in (blocks scale from 1 to 0).
   */
  public transitionIn(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.animateTransition(1, 0).then(resolve);
    });
  }

  /**
   * Animate the transition out (blocks scale from 0 to 1).
   */
  public transitionOut(): Promise<void> {
    return this.animateTransition(0, 1);
  }

  /**
   * Animate transition out, then in.
   */
  public transitionOutAndIn(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.transitionOut().then(() => {
        this.transitionIn().then(resolve);
      });
    });
  }

  /**
   * Animate the transition blocks.
   * @param fromScale The starting Y scale.
   * @param toScale The ending Y scale.
   */
  private animateTransition(fromScale: number, toScale: number): Promise<void> {
    return new Promise<void>((resolve) => {
      const ease = 'power4.inOut'; // Smooth easing for a natural transition
      const duration = 0.6; // Reduced duration for faster transitions

      // Set initial state
      gsap.set('.block', {visibility: 'visible', scaleY: fromScale});

      // Animate the first row of blocks
      gsap.to('.transition-row.row-1 .block', {
        scaleY: toScale,
        duration: duration,
        stagger: {each: 0.1, from: 'end'},
        ease: ease,
      });

      // Animate the second row of blocks and resolve the promise on complete
      gsap.to('.transition-row.row-2 .block', {
        scaleY: toScale,
        duration: duration,
        stagger: {each: 0.1, from: 'end'},
        ease: ease,
        onComplete: resolve,
      });
    });
  }
}
