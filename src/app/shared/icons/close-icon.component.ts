import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'svg[app-close-icon]',
  template: `
    <svg:path
      d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
    />
  `,
  styles: [':host { display: inline-block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.viewBox]': '"0 -960 960 960"',
  },
})
export class CloseIconComponent {}
