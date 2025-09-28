import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  viewChild,
} from '@angular/core';
import {LogoTransitionComponent} from '../../components/logo-transition/logo-transition.component';
import {SeoService} from '../../services/seo.service';
import {PageMeta} from '../../models/meta.model';

interface BannerSlide {
  image: string;
  title: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
}

interface Activity {
  icon: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

interface Event {
  title: string;
  time: string;
  timeRange: string;
  timeRange2?: string;
  location?: string;
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  imports: [LogoTransitionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);

  readonly bannerSlider = viewChild.required<ElementRef<HTMLElement>>('bannerSlider');
  readonly prevSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('prevSlideBtn');
  readonly nextSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('nextSlideBtn');
  readonly sliderDots = viewChild.required<ElementRef<HTMLElement>>('sliderDots');
  readonly logoTransition = viewChild.required(LogoTransitionComponent);

  private currentSlide = 0;
  private slideInterval: ReturnType<typeof setInterval> | undefined;

  bannerSlides: BannerSlide[] = [
    {
      image: 'assets/images/Other/coding.jpeg',
      title: '< CODERS />',
      description: 'Where Innovation Meets Community',
    },
    {
      image: 'assets/images/TrickOrTreat24/IMG_6144_Long.png',
      title: 'Code. Create. Connect.',
      description: 'Join Our Community at UW-La Crosse',
    },
    {
      image: 'assets/images/CookiesCODERS/IMG_7009.png',
      title: 'Learn and Grow',
      description: 'Weekly Coding Sessions with Free Cookies!',
    },
    {
      image: 'assets/images/KidsCollege/IMG_6887.png',
      title: 'Help Us Build the Future',
      description: 'Work On Real Projects That Impact Our Community',
    },
  ];

  features: Feature[] = [
    {
      icon: 'pi pi-code',
      title: 'Coding Workshops',
      description: 'Volunteer and On-Campus hands-on coding sessions covering a variety of topics',
      image: 'assets/images/KidsCollege/IMG_6923.png',
      techStack: ['Python', 'Java', 'Code.org', 'Scratch', 'Git', 'Terminal'],
    },
    {
      icon: 'pi pi-globe',
      title: 'CODERS Projects',
      description:
        'Build real-world applications and contribute to open-source team projects that impact our community',
      image: 'assets/images/Logos/logo.png',
      techStack: ['Typescript', 'SCSS', 'Javascript', 'HTML', 'Angular', 'GitHub'],
    },
    {
      icon: 'pi pi-users',
      title: 'Tech Community',
      description:
        'Connect with fellow developers and industry professionals for advice and mentorship',
      image: 'assets/images/Intern_Panel24/IMG_7995.jpg',
      techStack: ['Networking', 'College Readiness', 'Internship Advice', 'Career Growth'],
    },
  ];

  activities: Activity[] = [
    {
      icon: 'pi pi-desktop',
      title: 'Teaching Computer Science',
      description:
        'Share your knowledge by teaching basic coding conecpts to students and community members.',
      image: 'assets/images/Other/Codeorg.png',
      technologies: ['Scratch', 'Code.org', 'Python', 'Presenting New Concepts'],
    },
    {
      icon: 'pi pi-briefcase',
      title: 'Local Volunteering',
      description:
        'Volunteer for good causes to teach Computer Science and Coding Concepts to the next generation of innovators.',
      image: 'assets/images/Boys_And_Girls/IMG_6759.png',
      technologies: ['Volunteer', 'Coding', 'Fun', 'Teaching', 'Presenting'],
    },
    {
      icon: 'pi pi-globe',
      title: 'Cookies With CODERS',
      description: 'Chill and relax with fellow CODERS members while enjoying free cookies!',
      image: 'assets/images/CookiesCODERS/Cookievar.JPG',
      technologies: ['Chill', 'Coding', 'Cookies', 'Tasty', 'Friendship'],
    },
  ];

  events: Event[] = [
    {
      title: 'DevLab Sessions',
      time: 'Happening Soon!',
      timeRange: 'TBD',
      image: 'assets/images/Logos/logo.png',
      tags: ['Python', 'Scratch', 'Teaching', 'Networking', 'New Concepts'],
    },
    {
      title: 'Cookies With CODERS',
      time: 'Every Tuesday',
      timeRange: '3:30 PM - 5:30 PM',
      location: 'WING 016',
      image: 'assets/images/Other/cookiemain.png',
      tags: ['Coding', 'Cookies', 'Community'],
    },
    {
      title: "Boys' and Girls' Club Volunteering",
      time: 'Happening Again this Fall!',
      timeRange: 'TBD',
      image: 'assets/images/Logos/BGCNAL-Official-Symbol.png',
      tags: ['Conceptual', 'Games', 'Code.org'],
    },
  ];

  ngOnInit(): void {
    // Set default SEO metadata for home page - explicitly set title and description to undefined to use defaults
    const pageMeta: Partial<PageMeta> = {
      title: undefined,
      description: undefined,
      keywords: undefined,
    };
    this.seoService.setPageMeta(pageMeta);
  }

  ngAfterViewInit(): void {
    this.initBannerSlider();
    this.logoTransition().startAnimation(); // Start the logo transition
  }

  ngOnDestroy(): void {
    this.pauseAutoSlide();
  }

  private initBannerSlider(): void {
    const bannerSlider = this.bannerSlider();
    const sliderDots = this.sliderDots();
    if (!bannerSlider || !this.prevSlideBtn() || !this.nextSlideBtn() || !sliderDots) {
      console.error('Required elements not found');
      return;
    }

    const slider = bannerSlider.nativeElement;
    const dotsContainer = sliderDots.nativeElement;
    const totalSlides = this.bannerSlides.length;

    this.createDots(totalSlides, dotsContainer);
    this.updateSlider();

    this.startAutoSlide();

    slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
    slider.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  private createDots(totalSlides: number, container: HTMLElement): void {
    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => this.goToSlide(i));
      container.appendChild(dot);
    }
  }

  private updateSlider(): void {
    const slider = this.bannerSlider().nativeElement;
    const dotsContainer = this.sliderDots().nativeElement;

    slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot: Element, index: number) => {
      if (index === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.bannerSlides.length;
    this.updateSlider();
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.bannerSlides.length) % this.bannerSlides.length;
    this.updateSlider();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateSlider();
  }

  private startAutoSlide(): void {
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
  }

  private pauseAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }
}
