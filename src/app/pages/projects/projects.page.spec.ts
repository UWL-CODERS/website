import {describe, it, expect} from 'vitest';
import {ProjectsPage} from './projects.page';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';

describe('ProjectsPage (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [ProjectsPage],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(ProjectsPage);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
