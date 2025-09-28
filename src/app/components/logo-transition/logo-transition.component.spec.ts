import {describe, it, expect} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';
import {LogoTransitionComponent} from './logo-transition.component';

describe('LogoTransitionComponent (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [LogoTransitionComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(LogoTransitionComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
