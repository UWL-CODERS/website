import {Component, ElementRef, AfterViewInit, viewChild} from '@angular/core';

@Component({
  selector: 'app-logo-cube',
  templateUrl: './logo-cube.component.html',
  styleUrl: './logo-cube.component.scss',
})
export class LogoCubeComponent implements AfterViewInit {
  readonly logoCubeContainer = viewChild.required<ElementRef<HTMLElement>>('logoCubeContainer');
  readonly cubeElement = viewChild.required<ElementRef<HTMLElement>>('cubeElement');

  private isAnimating = false;

  ngAfterViewInit(): void {
    this.setRandomInitialPosition();
  }

  setRandomInitialPosition(): void {
    const cube = this.cubeElement().nativeElement;
    const randomYRotation = Math.random() * 360;
    const randomZRotation = Math.random() * 360;

    cube.style.transform = `rotateY(${randomYRotation}deg) rotateZ(${randomZRotation}deg)`;
  }

  startAnimation(): void {
    if (this.isAnimating) {
      return;
    }
    this.isAnimating = true;

    const containerElement = this.logoCubeContainer().nativeElement;
    const cube = this.cubeElement().nativeElement;
    const containerClassList = containerElement.classList;
    const cubeClassList = cube.classList;

    // Reset classes and styles
    containerClassList.remove('zoom-in', 'open', 'close', 'zoom-out');
    cubeClassList.remove('open');
    cube.style.transform = ''; // Remove inline transform

    // 1. Zoom In
    containerClassList.add('zoom-in');

    // 2. Open after delay
    setTimeout(() => {
      containerClassList.add('open');
      cubeClassList.add('open');
    }, 0); // Delay before the cube starts to open (milliseconds)

    // 3. Close after another delay
    setTimeout(() => {
      containerClassList.remove('open');
      cubeClassList.remove('open');
      containerClassList.add('close');
    }, 0); // Delay before the cube starts to close (milliseconds)

    // 4. Zoom Out and Fade Out after another delay
    setTimeout(() => {
      containerClassList.remove('zoom-in', 'close');
      containerClassList.add('zoom-out');
      // Reset state after zoom-out animation ends
      setTimeout(() => {
        containerClassList.remove('zoom-out');
        this.isAnimating = false;
        this.setRandomInitialPosition();
      }, 2000); // Corresponds to the zoom-out animation duration
    }, 2000); // Delay before the cube starts to zoom out
  }
}
