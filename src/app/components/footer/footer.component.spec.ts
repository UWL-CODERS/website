import {describe, it, expect} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';
import {FooterComponent} from './footer.component';

describe('FooterComponent (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(FooterComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
