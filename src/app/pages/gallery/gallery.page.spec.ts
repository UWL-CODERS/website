import {describe, it, expect} from 'vitest';
import {TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection, provideCheckNoChangesConfig} from '@angular/core';
import {GalleryPage} from './gallery.page';

describe('GalleryPage (minimal)', () => {
  it('should create', async () => {
    TestBed.configureTestingModule({
      imports: [GalleryPage],
      providers: [
        provideZonelessChangeDetection(),
        provideCheckNoChangesConfig({exhaustive: true, interval: 100}),
      ],
    });
    const fixture = TestBed.createComponent(GalleryPage);
    await fixture.whenStable();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
