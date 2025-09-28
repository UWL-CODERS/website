import {describe, it, expect} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';
import {HomeComponent} from './home.component';

describe('HomeComponent (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(HomeComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
