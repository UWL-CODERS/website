import {describe, it, expect} from 'vitest';
import {ProjectsComponent} from './projects.component';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';

describe('ProjectsComponent (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(ProjectsComponent);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
