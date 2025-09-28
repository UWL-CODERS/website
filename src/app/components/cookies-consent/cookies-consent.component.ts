import {Component, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-cookies-consent',
  templateUrl: './cookies-consent.component.html',
  styleUrls: ['./cookies-consent.component.scss'],
})
export class CookiesConsentComponent {
  private platformId = inject<object>(PLATFORM_ID);

  isConsentGiven = false;
  showConsent = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.isConsentGiven = localStorage.getItem('cookiesConsent') === 'true';

      if (!this.isConsentGiven) {
        setTimeout(() => {
          this.showConsent = true; // Show the pop-up after 3 seconds
        }, 3000);
      }
    }
  }

  acceptCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookiesConsent', 'true');
      this.isConsentGiven = true;
      this.showConsent = false; // Hide the pop-up
    }
  }
}
