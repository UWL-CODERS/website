import { describe, it, expect } from 'vitest';
import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, provideCheckNoChangesConfig } from '@angular/core';

describe('AppComponent (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({ exhaustive: true, interval: 100 })
      ]
    });
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
