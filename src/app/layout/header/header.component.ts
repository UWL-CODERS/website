import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { gsap } from 'gsap';
import { PageTransitionService } from '../../core/page-transition/page-transition.service';
import {
  AlternateEmailIconComponent,
  CloseIconComponent,
  DiscordIconComponent,
  GithubIconComponent,
  InstagramIconComponent,
  MenuIconComponent,
  OpenInNewIconComponent,
} from '../../shared/icons';

type UpcomingEvent = Record<string, unknown>;

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    DiscordIconComponent,
    GithubIconComponent,
    InstagramIconComponent,
    AlternateEmailIconComponent,
    OpenInNewIconComponent,
    MenuIconComponent,
    CloseIconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private pageTransitionService = inject(PageTransitionService);
  private cdr = inject(ChangeDetectorRef);

  private isAnimating = false;
  private documentClickHandler?: (event: MouseEvent) => void;

  isMenuOpen = false;

  ngOnInit() {
    this.initializeMenu();

    // Close on route change
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMenuOpen) this.forceCloseMenu();
      });
  }

  ngOnDestroy() {
    this.cleanupDocumentListener();
  }

  navigateAndReload(route: string) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    if (this.isMenuOpen) this.forceCloseMenu();

    this.pageTransitionService.transitionOut().then(() => {
      this.router.navigate([route]).then(() => {
        window.scrollTo(0, 0);
        this.pageTransitionService.transitionIn().then(() => {
          this.isAnimating = false;
        });
      }).catch((error) => {
        console.error('Navigation error:', error);
        this.isAnimating = false;
      });
    });
  }

  toggleMenu() {
    if (this.isAnimating) return;
    this.setMenuOpen(!this.isMenuOpen);
  }

  closeMenuWithEscape() {
    if (this.isMenuOpen) this.setMenuOpen(false);
  }

  private setMenuOpen(open: boolean) {
    this.isMenuOpen = open;
    this.syncAria();
    this.cdr.detectChanges();

    // Stagger mobile items; container open/close is via CSS grid
    const items = gsap.utils.toArray<HTMLElement>('.mobile-nav-list li');
    if (open) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 6, filter: 'blur(2px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.22, ease: 'power2.out', stagger: 0.05 }
      );
      setTimeout(() => {
        this.documentClickHandler = (event: MouseEvent) => this.handleDocumentClick(event);
        document.addEventListener('click', this.documentClickHandler, { passive: true });
      });
    } else {
      gsap.to(items, { opacity: 0, y: -4, filter: 'blur(1px)', duration: 0.16, ease: 'power2.in' });
      this.cleanupDocumentListener();
    }
  }

  private forceCloseMenu() {
    this.isMenuOpen = false;
    this.syncAria();
    this.cleanupDocumentListener();

    const shell = document.querySelector('.mobile-shell') as HTMLElement | null;
    const items = gsap.utils.toArray<HTMLElement>('.mobile-nav-list li');

    if (shell) {
      shell.style.gridTemplateRows = '0fr';
      shell.style.opacity = '0';
      shell.classList.add('pointer-events-none');
    }
    items.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-4px)';
      el.style.filter = 'blur(1px)';
    });

    this.cdr.detectChanges();
  }

  private handleDocumentClick(event: MouseEvent) {
    const mobileShell = document.querySelector('.mobile-shell');
    const toggle = document.querySelector('.mobile-menu-toggle');

    const target = event.target as Node;
    const clickInside =
      (mobileShell?.contains(target) ?? false) ||
      (toggle?.contains(target) ?? false);

    if (!clickInside && this.isMenuOpen) {
      this.setMenuOpen(false);
    }
  }

  private cleanupDocumentListener() {
    if (this.documentClickHandler) {
      document.removeEventListener('click', this.documentClickHandler);
      this.documentClickHandler = undefined;
    }
  }

  addMenuLinkListeners() {
    const menuLinks = document.querySelectorAll('.main-nav a');
    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (this.isMenuOpen) this.setMenuOpen(false);
      });
    });
  }

  initializeMenu() {
    this.addMenuLinkListeners();
    this.syncAria();
    // start closed deterministically
    this.forceCloseMenu();
  }

  private syncAria() {
    const toggle = document.querySelector<HTMLButtonElement>('.mobile-menu-toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(this.isMenuOpen));
      toggle.setAttribute('aria-controls', 'site-nav');
      toggle.setAttribute('aria-haspopup', 'true');
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  @HostListener('window:resize')
  onResize() {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (isDesktop && this.isMenuOpen) {
      this.forceCloseMenu();
    }
  }
}
