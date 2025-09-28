import {Injectable, inject} from '@angular/core';
import {Title, Meta, MetaDefinition} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {PageMeta} from '../models/meta.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);

  private readonly siteName = 'CODERS Club';
  private readonly defaultPageTitle = 'Official Website';
  private readonly defaultDescription =
    'The official website of the CODERS Club at UW-La Crosse. Learn, code, and connect with fellow tech enthusiasts.';
  private readonly defaultImageUrl = 'https://coders.cs.uwlax.edu/assets/images/Logos/logo.png';
  private readonly baseUrl = 'https://coders.cs.uwlax.edu';
  private readonly defaultTwitterCard = 'summary_large_image';
  private readonly defaultOgType = 'website';
  private readonly defaultKeywords =
    'CODERS Club, UWL, University of Wisconsin La Crosse, coding club, programming community, computer science, student organization, tech community, coding workshops, volunteer opportunities';

  public setPageMeta(config: Partial<PageMeta>): void {
    const title = config.title
      ? `${this.siteName} | ${config.title}`
      : `${this.siteName} | ${this.defaultPageTitle}`;
    const description = config.description ?? this.defaultDescription;
    const imageUrl = config.imageUrl ?? this.defaultImageUrl;
    const ogType = config.ogType ?? this.defaultOgType;
    const twitterCard = config.twitterCard ?? this.defaultTwitterCard;
    const keywords = config.keywords ?? this.defaultKeywords;
    const currentUrl = this.baseUrl + this.router.url;

    this.titleService.setTitle(title);

    const metaTags: MetaDefinition[] = [
      {property: 'description', content: description},
      {property: 'og:title', content: title},
      {property: 'og:description', content: description},
      {property: 'og:type', content: ogType},
      {property: 'og:url', content: currentUrl},
      {property: 'og:image', content: imageUrl},
      {property: 'og:keywords', content: keywords},
      {property: 'og:site_name', content: this.siteName},
      {name: 'twitter:title', content: title},
      {name: 'twitter:description', content: description},
      {name: 'twitter:url', content: currentUrl},
      {name: 'twitter:image', content: imageUrl},
      {name: 'twitter:card', content: twitterCard},
    ];

    metaTags.forEach((tagDef) => this.metaService.updateTag(tagDef));
  }

  public setDefaultMeta(): void {
    this.setPageMeta({});
  }
}
