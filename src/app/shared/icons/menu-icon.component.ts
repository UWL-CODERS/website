import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'svg[app-menu-icon]',
  template: `
    <svg:path
      d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
    />
  `,
  styles: [':host { display: inline-block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.viewBox]': '"0 -960 960 960"',
  },
})
export class MenuIconComponent {}
