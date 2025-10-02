import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {PageTransitionService} from '../../core/page-transition/page-transition.service';
import {
  AlternateEmailIconComponent,
  DiscordIconComponent,
  GithubIconComponent,
  InstagramIconComponent,
} from '../../shared/icons';

@Component({
  selector: 'app-footer',
  imports: [
    RouterModule,
    DiscordIconComponent,
    GithubIconComponent,
    InstagramIconComponent,
    AlternateEmailIconComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  private router = inject(Router);
  private pageTransition = inject(PageTransitionService);
  private isAnimating = false;

  navigateAndReload(route: string) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.pageTransition.transitionOut().then(() => {
      this.router
        .navigate([route])
        .then(() => {
          window.scrollTo(0, 0);
          this.pageTransition.transitionIn().then(() => (this.isAnimating = false));
        })
        .catch((error) => {
          console.error('Navigation error:', error);
          this.isAnimating = false;
        });
    });
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
