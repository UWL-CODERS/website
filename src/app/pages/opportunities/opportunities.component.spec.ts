import {describe, it, expect} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';
import {OpportunitiesComponent} from './opportunities.component';

describe('OpportunitiesComponent (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [OpportunitiesComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(OpportunitiesComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
