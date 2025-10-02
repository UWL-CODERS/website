import {describe, it, expect} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';
import {CookiesConsentComponent} from './cookies-consent.component';

describe('CookiesConsentComponent (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [CookiesConsentComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(CookiesConsentComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
