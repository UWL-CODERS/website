import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { NgIf } from '@angular/common';

import { PageTransitionService } from '../page-transition/page-transition.service'; // Adjust path as needed

type UpcomingEvent = Record<string, unknown>;

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private pageTransitionService = inject(PageTransitionService);
  private cdr = inject(ChangeDetectorRef);
  private isAnimating = false;
  private documentClickHandler?: (event: MouseEvent) => void;
  upcomingEvents: UpcomingEvent[] = [];
  isMenuOpen = false;
  isMenuClosing = false;

  ngOnInit() {
    this.initializeMenu();
  }

  ngOnDestroy() {
    this.cleanupDocumentListener();
  }

  navigateAndReload(route: string) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.isMenuOpen = false;
    this.isMenuClosing = true;

    this.pageTransitionService.transitionOut().then(() => {
      this.router.navigate([route]).then(() => {
        window.scrollTo(0, 0);
        this.pageTransitionService.transitionIn().then(() => {
          this.isMenuClosing = false;
          this.isAnimating = false;
        });
      }).catch(error => {
        console.error('Navigation error:', error);
        this.isMenuClosing = false;
        this.isAnimating = false;
      });
    });

    gsap.to('.main-nav', {
      opacity: 0,
      duration: 0.4,
    });
  }

  toggleMenu() {
    if (this.isAnimating) return;

    const animationDuration = 0.2;
    const toggleElement = document.querySelector('.mobile-menu-toggle');

    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      setTimeout(() => {
        this.documentClickHandler = (event: MouseEvent) => this.handleDocumentClick(event);
        document.addEventListener('click', this.documentClickHandler);
      });
    } else {
      this.cleanupDocumentListener();
    }

    gsap.to(toggleElement, {
      opacity: 0,
      duration: 0.1,
      onComplete: () => {
        gsap.to(toggleElement, {
          opacity: 1,
          duration: 0.1
        });
      }
    });

    gsap.to('.main-nav', {
      opacity: this.isMenuOpen ? 1 : 0,
      duration: animationDuration,
      onComplete: () => {
        if (!this.isMenuOpen) {
          this.isMenuClosing = false;
        }
      }
    });
  }

  private handleDocumentClick(event: MouseEvent) {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (nav && toggle && !nav.contains(event.target as Node) && !toggle.contains(event.target as Node)) {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
        this.cdr.detectChanges();
        this.cleanupDocumentListener();

        gsap.to('.main-nav', {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            this.isMenuClosing = false;
          }
        });

        const toggleElement = document.querySelector('.mobile-menu-toggle');
        gsap.to(toggleElement, {
          opacity: 0,
          duration: 0.1,
          onComplete: () => {
            gsap.to(toggleElement, {
              opacity: 1,
              duration: 0.1
            });
          }
        });
      }
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
        if (this.isMenuOpen) {
          this.toggleMenu();
        }
      });
    });
  }

  initializeMenu() {
    this.addMenuLinkListeners();
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
