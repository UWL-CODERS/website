import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  viewChild,
} from '@angular/core';

import {LogoTransitionComponent} from '../../core/logo-transition/logo-transition.component';
import {SeoService} from '../../services/seo.service';
import {PageMeta} from '../../models/meta.model';
import {GithubIconComponent, LinkedinIconComponent} from '../../shared/icons';

interface BannerSlide {
  image: string;
  title: string;
  description: string;
}
interface Feature {
  title: string;
  description: string;
  image: string;
  techStack: string[];
}
interface Activity {
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

type HighlightColor = 'sky' | 'indigo' | 'fuchsia' | 'emerald' | 'rose' | 'amber';
interface HighlightPoint {
  text: string;
  color?: HighlightColor;
}

interface TeamMember {
  name: string;
  image: string;
  major: string;
  linkedin?: string;
  github?: string;
  highlights?: HighlightPoint[];
}

@Component({
  selector: 'app-home',
  imports: [LogoTransitionComponent, GithubIconComponent, LinkedinIconComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  private seoService = inject(SeoService);

  readonly bannerSlider = viewChild.required<ElementRef<HTMLElement>>('bannerSlider');
  readonly prevSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('prevSlideBtn');
  readonly nextSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('nextSlideBtn');
  readonly sliderDots = viewChild.required<ElementRef<HTMLElement>>('sliderDots');

  readonly teamSlider = viewChild.required<ElementRef<HTMLElement>>('teamSlider');
  readonly prevTeamSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('prevTeamSlideBtn');
  readonly nextTeamSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('nextTeamSlideBtn');
  readonly teamSliderDots = viewChild.required<ElementRef<HTMLElement>>('teamSliderDots');

  readonly logoTransition = viewChild.required(LogoTransitionComponent);

  private currentSlide = 0;
  private currentTeamSlide = 0;
  private slideInterval: ReturnType<typeof setInterval> | undefined;
  private teamSlideInterval: ReturnType<typeof setInterval> | undefined;
  private teamAnimating = false;

  bannerSlides: BannerSlide[] = [
    {
      image: 'assets/images/other/coding.jpeg',
      title: '< CODERS />',
      description: 'Where Innovation Meets Community',
    },
    {
      image: 'assets/images/trick-or-treat/2024/IMG_6144_Long.png',
      title: 'Code. Create. Connect.',
      description: 'Join Our Community at UW-La Crosse',
    },
    {
      image: 'assets/images/cookies-with-coders/IMG_7009.png',
      title: 'Learn and Grow',
      description: 'Weekly Coding Sessions with Free Cookies!',
    },
    {
      image: 'assets/images/kids-college/IMG_6887.png',
      title: 'Help Us Build the Future',
      description: 'Work On Real Projects That Impact Our Community',
    },
  ];

  features: Feature[] = [
    {
      title: 'Coding Workshops',
      description: 'Volunteer and On-Campus hands-on coding sessions covering a variety of topics',
      image: 'assets/images/kids-college/IMG_6923.png',
      techStack: ['Python', 'Java', 'Code.org', 'Scratch', 'Git', 'Terminal'],
    },
    {
      title: 'CODERS Projects',
      description:
        'Build real-world applications and contribute to open-source team projects that impact our community',
      image: 'assets/images/logos/CODERS.png',
      techStack: ['Typescript', 'SCSS', 'Javascript', 'HTML', 'Angular', 'GitHub'],
    },
    {
      title: 'Tech Community',
      description:
        'Connect with fellow developers and industry professionals for advice and mentorship',
      image: 'assets/images/intern-panels/2024/IMG_7995.jpg',
      techStack: ['Networking', 'College Readiness', 'Internship Advice', 'Career Growth'],
    },
  ];

  activities: Activity[] = [
    {
      title: 'Teaching Computer Science',
      description:
        'Share your knowledge by teaching basic coding conecpts to students and community members.',
      image: 'assets/images/logos/CODE.png',
      technologies: ['Scratch', 'Code.org', 'Python', 'Presenting New Concepts'],
    },
    {
      title: 'Local Volunteering',
      description:
        'Volunteer for good causes to teach Computer Science and Coding Concepts to the next generation of innovators.',
      image: 'assets/images/boys-and-girls/IMG_6759.png',
      technologies: ['Volunteer', 'Coding', 'Fun', 'Teaching', 'Presenting'],
    },
    {
      title: 'Cookies With CODERS',
      description: 'Chill and relax with fellow CODERS members while enjoying free cookies!',
      image: 'assets/images/cookies-with-coders/Cookievar.JPG',
      technologies: ['Chill', 'Coding', 'Cookies', 'Tasty', 'Friendship'],
    },
  ];

  events: Event[] = [
    {
      title: 'DevLab Sessions',
      time: 'Every Tuesday!',
      timeRange: '4:30 PM - 5:00 PM',
      location: 'WING 016',
      image: 'assets/images/logos/CODERS.png',
      tags: ['Python', 'Scratch', 'Teaching', 'Networking', 'New Concepts'],
    },
    {
      title: 'Cookies With CODERS',
      time: 'Every Tuesday',
      timeRange: '3:30 PM - 5:30 PM',
      location: 'WING 016',
      image: 'assets/images/other/cookiemain.png',
      tags: ['Coding', 'Cookies', 'Community'],
    },
    {
      title: "Boys' and Girls' Club Volunteering",
      time: 'Happening Throughout The Year!',
      timeRange: 'September - May',
      location: 'La Crosse County',
      image: 'assets/images/logos/BGCNAL.png',
      tags: ['Conceptual', 'Games', 'Code.org'],
    },
  ];

  teamMembers: TeamMember[] = [
    {
      name: 'Brendan Lambrecht',
      image: 'assets/images/people/brendan-lambrecht.webp',
      major: "Major: Computer Science Master of Software Engineering | Class of 27'",
      linkedin: 'https://www.linkedin.com/in/brendanlambrecht/',
      github: 'https://github.com/BlambrechtCodes',
      highlights: [
        {text: 'President of CODERS (2024-Current)', color: 'sky'},
        {
          text: 'Built a phishing-detection ML system in Collaboration with the UW System.',
          color: 'indigo',
        },
        {
          text: 'Mentored Members on Git, Angular, and Internship best Practices and Advice.',
          color: 'fuchsia',
        },
      ],
    },
    {
      name: 'Jack Kern',
      image: 'assets/images/people/jack-kern.webp',
      major: "Major: Computer Science Master of Software Engineering | Class of 26'",
      linkedin: 'https://www.linkedin.com/in/jack-kern-b9b501333/',
      github: 'https://github.com/KernJack',
      highlights: [
        {text: 'Vice President of CODERS (2024-Current)', color: 'emerald'},
        {
          text: 'Served as a Leader During Boys and Girls Club Volunteering Events.',
          color: 'indigo',
        },
        {text: 'Co-led Cookies With CODERS community events.', color: 'amber'},
      ],
    },
    {
      name: 'Zach Ydunate',
      image: 'assets/images/people/zach-ydunate.webp',
      major: "Major: Computer Science | Class of 28'",
      linkedin: 'https://www.linkedin.com/in/zachary-ydunate/',
      github: 'https://github.com/zydunate',
      highlights: [
        {text: 'Built the Home and Gallery Pages of the Website', color: 'sky'},
        {text: 'Helped form Ideas for Website Redesign.', color: 'rose'},
        {text: 'Contributed Advice at the 2025 CODERS Internship Panel.', color: 'sky'},
      ],
    },
    {
      name: 'Muhammad Fardeen',
      image: 'assets/images/people/muhammad-fardeen.webp',
      major: "Major: Computer Science | Class of 27'",
      linkedin: 'https://www.linkedin.com/in/muhdfdeen/',
      github: 'https://github.com/muhdfdeen',
      highlights: [
        {text: 'Website Development Chair (2024-Current).', color: 'indigo'},
        {text: 'Built Contributor Tooling and PR Templates.', color: 'emerald'},
        {text: 'Reviewed and Approved Pull Requests.', color: 'sky'},
      ],
    },
    {
      name: 'Bishal Karki',
      image: 'assets/images/people/bishal-karki.webp',
      major: "Major: Computer Science: Master of Software Engineering | Class of 25'",
      linkedin: 'https://www.linkedin.com/in/bishalkarki655/',
      github: 'https://github.com/bishalkarki01',
      highlights: [
        {text: 'Contributed to Home Page and Header/Footer Development.', color: 'sky'},
        {text: 'Helped form Ideas for Website Redesign.', color: 'rose'},
        {text: 'Amazing at Pair Programming.', color: 'emerald'},
      ],
    },
    {
      name: 'Andree Lin',
      image: 'assets/images/people/andree-lin.webp',
      major: "Major: Computer Science | Class of 25'",
      linkedin: 'https://www.linkedin.com/in/andree-lin-56196a284/',
      github: 'https://github.com/andreelinyx',
      highlights: [
        {text: 'Social media coordinator (2024-Current).', color: 'fuchsia'},
        {text: 'Launched event promomotions and social media posts.', color: 'sky'},
        {text: 'Designed graphics for social media and events.', color: 'rose'},
      ],
    },
    {
      name: 'Leroy Ombogo',
      image: 'assets/images/people/leroy-ombogo.webp',
      major: "Major: Computer Science | Class of 27'",
      linkedin: 'https://www.linkedin.com/in/leroy-o-13b724247/',
      github: 'https://github.com/Leroy-collab',
      highlights: [
        {text: 'Is THAT Guy.', color: 'emerald'},
        {text: 'Contributed to UI/UX polishing and testing.', color: 'indigo'},
        {text: 'Has a great sense of humor.', color: 'emerald'},
      ],
    },
    {
      name: 'Dr. Samantha Foley',
      image: 'https://www.uwlax.edu/User/photo/sfoley.jpg',
      major: 'Faculty Advisor — CODERS',
      linkedin: 'https://www.linkedin.com/in/samantha-foley-47aab4a/',
      highlights: [
        {text: 'Guides CODERS strategy and academic alignment.', color: 'indigo'},
        {
          text: 'Actively promotes CODERS Events Throughout the CS & CPE Department.',
          color: 'emerald',
        },
        {text: 'Super Helpful to Plan and Coordinate Department-Wide Events!!!', color: 'sky'},
      ],
    },
    {
      name: 'Dr. Allison Sauppé',
      image: 'https://www.uwlax.edu/User/photo/asauppe.jpg',
      major: 'Faculty Advisor — CODERS',
      linkedin: 'https://www.linkedin.com/in/allisonsauppe/',
      highlights: [
        {
          text: 'Actively Promotes CODERS Events Throughout the CS & CPE Department.',
          color: 'amber',
        },
        {text: 'Encourages Student Excellence in Teaching and Volunteerism.', color: 'rose'},
        {text: "Buys Cookies for Our 'Cookies With CODERS' Events!!!", color: 'fuchsia'},
      ],
    },
  ];

  ngOnInit(): void {
    const pageMeta: Partial<PageMeta> = {
      title: 'Home',
      description: undefined,
      keywords: undefined,
    };
    this.seoService.setPageMeta(pageMeta);
  }

  ngAfterViewInit(): void {
    this.initBannerSlider();
    this.initTeamSlider();
    this.logoTransition().startAnimation();
  }

  ngOnDestroy(): void {
    this.pauseAutoSlide();
    this.pauseTeamAutoSlide();
    window.removeEventListener('resize', this.updateTeamSliderBound);
  }

  // ===== Banner slider (namespaced dots) =====
  private initBannerSlider(): void {
    const bannerSlider = this.bannerSlider();
    const sliderDots = this.sliderDots();
    if (!bannerSlider || !this.prevSlideBtn() || !this.nextSlideBtn() || !sliderDots) {
      console.error('Required elements not found');
      return;
    }

    const slider = bannerSlider.nativeElement;
    const slides = slider.querySelectorAll<HTMLElement>('.banner-slide');
    slides.forEach((s, i) => {
      s.style.position = 'absolute';
      s.style.inset = '0';
      if (i === 0) s.classList.add('active');
      else s.classList.remove('active');
    });

    this.createBannerDots(this.bannerSlides.length, sliderDots.nativeElement);
    this.syncBannerDots();

    this.startAutoSlide();

    slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
    slider.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  private createBannerDots(totalSlides: number, container: HTMLElement): void {
    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'banner-dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        this.pauseAutoSlide();
        this.goToSlide(i);
        this.startAutoSlide();
      });
      container.appendChild(dot);
    }
  }

  private syncBannerDots(): void {
    const dots = this.sliderDots().nativeElement.querySelectorAll('.banner-dot');
    dots.forEach((dot: Element, index: number) => {
      if (index === this.currentSlide) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  private applyBannerActive(): void {
    const slides = this.bannerSlider().nativeElement.querySelectorAll<HTMLElement>('.banner-slide');
    slides.forEach((slide, index) => {
      if (index === this.currentSlide) slide.classList.add('active');
      else slide.classList.remove('active');
    });
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.bannerSlides.length;
    this.applyBannerActive();
    this.syncBannerDots();
  }
  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.bannerSlides.length) % this.bannerSlides.length;
    this.applyBannerActive();
    this.syncBannerDots();
  }
  goToSlide(index: number): void {
    this.currentSlide = index;
    this.applyBannerActive();
    this.syncBannerDots();
  }

  private startAutoSlide(): void {
    this.pauseAutoSlide();
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
  }
  private pauseAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }

  // ===== Team slider (layout + namespaced dots) =====
  private layoutTeamSlides(): void {
    const team = this.teamSlider()?.nativeElement;
    if (!team) return;
    Array.from(team.children).forEach((el: Element) => {
      const node = el as HTMLElement;
      node.style.minWidth = '100%';
      node.style.flex = '0 0 100%';
      node.style.display = 'flex';
    });
    team.style.display = 'flex';
    team.style.willChange = 'transform';
    team.style.transition = 'transform 500ms cubic-bezier(0.77, 0, 0.18, 1)';
  }

  private initTeamSlider(): void {
    const teamSlider = this.teamSlider();
    const dotsRef = this.teamSliderDots();
    if (!teamSlider || !this.prevTeamSlideBtn() || !this.nextTeamSlideBtn() || !dotsRef) {
      console.error('Required team slider elements not found');
      return;
    }

    this.layoutTeamSlides();

    const slider = teamSlider.nativeElement;
    const dotsContainer = dotsRef.nativeElement;

    slider.addEventListener('transitionend', () => {
      this.teamAnimating = false;
    });

    this.createTeamDots(this.teamMembers.length, dotsContainer);
    this.updateTeamSlider();

    this.startTeamAutoSlide();
    slider.addEventListener('mouseenter', () => this.pauseTeamAutoSlide());
    slider.addEventListener('mouseleave', () => this.startTeamAutoSlide());

    window.addEventListener('resize', this.updateTeamSliderBound);
  }

  private createTeamDots(totalSlides: number, container: HTMLElement): void {
    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'team-dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        this.pauseTeamAutoSlide();
        this.goToTeamSlide(i);
        this.startTeamAutoSlide();
      });
      container.appendChild(dot);
    }
  }

  private updateTeamSlider(): void {
    const slider = this.teamSlider().nativeElement;
    const dots = this.teamSliderDots().nativeElement.querySelectorAll('.team-dot');
    slider.style.transform = `translateX(-${this.currentTeamSlide * 100}%)`;
    dots.forEach((dot: Element, index: number) => {
      if (index === this.currentTeamSlide) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }

  private updateTeamSliderBound = () => {
    this.layoutTeamSlides();
    this.updateTeamSlider();
  };

  nextTeamSlide(): void {
    if (this.teamAnimating) return;
    this.teamAnimating = true;
    this.currentTeamSlide = (this.currentTeamSlide + 1) % this.teamMembers.length;
    this.updateTeamSlider();
  }
  prevTeamSlide(): void {
    if (this.teamAnimating) return;
    this.teamAnimating = true;
    this.currentTeamSlide =
      (this.currentTeamSlide - 1 + this.teamMembers.length) % this.teamMembers.length;
    this.updateTeamSlider();
  }
  goToTeamSlide(index: number): void {
    if (this.teamAnimating) return;
    this.teamAnimating = true;
    this.currentTeamSlide = index;
    this.updateTeamSlider();
  }

  private startTeamAutoSlide(): void {
    this.pauseTeamAutoSlide();
    this.teamSlideInterval = setInterval(() => this.nextTeamSlide(), 5000);
  }
  private pauseTeamAutoSlide(): void {
    if (this.teamSlideInterval) {
      clearInterval(this.teamSlideInterval);
      this.teamSlideInterval = undefined;
    }
  }

  onPrevTeamClick = (evt?: MouseEvent | PointerEvent): void => {
    evt?.preventDefault?.();
    evt?.stopPropagation?.();
    this.pauseTeamAutoSlide();
    this.prevTeamSlide();
    this.startTeamAutoSlide();
  };
  onNextTeamClick = (evt?: MouseEvent | PointerEvent): void => {
    evt?.preventDefault?.();
    evt?.stopPropagation?.();
    this.pauseTeamAutoSlide();
    this.nextTeamSlide();
    this.startTeamAutoSlide();
  };
}
