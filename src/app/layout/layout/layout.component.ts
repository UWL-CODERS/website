import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterModule],
  template: `<app-header />
    <router-outlet />
    <app-footer />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LayoutComponent {}