import {describe, it, expect} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';
import {HomePage} from './home.page';

describe('HomePage (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
