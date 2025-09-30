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

interface TeamMember {
  name: string;
  image: string;
  major: string;
  linkedin?: string;
  github?: string;
}

interface FacultyAdvisor {
  name: string;
  image: string;
}

interface ExecMember {
  name: string;
  image: string;
  role: string;
}

interface Chairperson {
  name: string;
  image: string;
  role: string;
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
  
  readonly teamSlider = viewChild.required<ElementRef<HTMLElement>>('teamSlider');
  readonly prevTeamSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('prevTeamSlideBtn');
  readonly nextTeamSlideBtn = viewChild.required<ElementRef<HTMLButtonElement>>('nextTeamSlideBtn');
  readonly teamSliderDots = viewChild.required<ElementRef<HTMLElement>>('teamSliderDots');
  
  readonly logoTransition = viewChild.required(LogoTransitionComponent);

  private currentSlide = 0;
  private currentTeamSlide = 0;
  private slideInterval: ReturnType<typeof setInterval> | undefined;
  private teamSlideInterval: ReturnType<typeof setInterval> | undefined;

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

  teamMembers: TeamMember[] = [
    {
      name: 'Zach Ydunate',
      image: 'assets/images/People/zach_ydunate.jpg',
      major: 'Major: Computer Science | Class of 28\'',
      linkedin: 'https://www.linkedin.com/in/zachary-ydunate/',
      github: 'https://github.com/zydunate'
    },
    {
      name: 'Brendan Lambrecht',
      image: 'assets/images/People/brendan_lambrecht.jpeg',
      major: 'Major: Computer Science Master of Software Engineering | Class of 27\'',
      linkedin: 'https://www.linkedin.com/in/brendanlambrecht/',
      github: 'https://github.com/BlambrechtCodes'
    },
    {
      name: 'Andree Lin',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQHT4qsWsqPo0g/profile-displayphoto-shrink_400_400/B56ZVZv0UiGQAo-/0/1740967462603?e=1761782400&v=beta&t=BNlXJUWana2qBzkvNeKbWTieAKShg_PpflKPsfljZmU',
      major: 'Major: Computer Science | Class of 25\'',
      linkedin: 'https://www.linkedin.com/in/andree-lin-56196a284/',
      github: 'https://github.com/andreelinyx'
    },
    {
      name: 'Muhammad Fardeen',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQG3tlbwKzghRg/profile-displayphoto-shrink_400_400/B4DZVQZak0G8Ag-/0/1740810595075?e=1761782400&v=beta&t=QQHIkNn7uyBbi0JHVniFB0fFp9i9KJ0EUY_N3o9WtD8',
      major: 'Major: Computer Science | Class of 26\'',
      linkedin: 'https://www.linkedin.com/in/muhdfdeen/',
      github: 'https://github.com/muhdfdeen'
    },
    {
      name: 'Bishal Karki',
      image: 'assets/images/People/IMG_7025.JPG',
      major: 'Major: Computer Science: Master of Software Engineering | Class of 25\'',
      linkedin: 'https://www.linkedin.com/in/bishalkarki655/',
      github: 'https://github.com/bishalkarki01'
    },
    {
      name: 'Leroy Ombogo',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQGnxJrH_Ff6Rg/profile-displayphoto-shrink_400_400/B4DZVkqyZsGkAg-/0/1741150694280?e=1761782400&v=beta&t=tLsaD16J3sSwsDm7acepBJYlMtejqo1WbPEDvWfKq3s',
      major: 'Major: Computer Science | Class of 27\'',
      linkedin: 'https://www.linkedin.com/in/leroy-o-13b724247/',
      github: 'https://github.com/Leroy-collab'
    },
    {
      name: 'Ahra Cho',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQFygoRxp3Hzog/profile-displayphoto-shrink_400_400/B4EZY7CioRHYAg-/0/1744747244782?e=1761782400&v=beta&t=dzn_38d88L71ZkkuXzdle0AUSUJhGvC2g_ff0fR0iFM',
      major: 'Major: Computer Science | Class of 27\'',
      linkedin: 'https://www.linkedin.com/in/ahra-cho-3630a5355/',
      github: 'https://github.com/Ahrax-x'
    },
    {
      name: 'Jack Kern',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQGw3r0jjhKSXg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729082092958?e=1761782400&v=beta&t=8rIb8JwuCK85w0IfSfmA02BNVZZBkLNMegW4u-qX0VE',
      major: 'Major: Computer Science Master of Software Engineering | Class of 26\'',
      linkedin: 'https://www.linkedin.com/in/jack-kern-b9b501333/',
      github: 'https://github.com/KernJack'
    }
  ];

  facultyAdvisors: FacultyAdvisor[] = [
    {
      name: 'Samantha Foley',
      image: 'https://www.uwlax.edu/User/photo/sfoley.jpg'
    },
    {
      name: 'Allison Sauppé',
      image: 'https://www.uwlax.edu/User/photo/asauppe.jpg'
    }
  ];

  execTeam: ExecMember[] = [
    {
      name: 'Brendan Lambrecht',
      image: 'assets/images/People/brendan_lambrecht.jpeg',
      role: 'President'
    },
    {
      name: 'Jack Kern',
      image: 'assets/images/People/jack_kern.jpg',
      role: 'Vice President'
    },
    {
      name: 'Mason Wagner',
      image: 'assets/images/People/mason_wagner.jpg',
      role: 'Secretary'
    },
    {
      name: 'Andree Lin',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQHT4qsWsqPo0g/profile-displayphoto-shrink_400_400/B56ZVZv0UiGQAo-/0/1740967462603?e=1761782400&v=beta&t=BNlXJUWana2qBzkvNeKbWTieAKShg_PpflKPsfljZmU',
      role: 'Social Media Coordinator'
    }
  ];

  chairpersons: Chairperson[] = [
    {
      name: 'Muhammad Fardeen',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQG3tlbwKzghRg/profile-displayphoto-shrink_400_400/B4DZVQZak0G8Ag-/0/1740810595075?e=1761782400&v=beta&t=QQHIkNn7uyBbi0JHVniFB0fFp9i9KJ0EUY_N3o9WtD8',
      role: 'Website Development Chair'
    }
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
    this.initTeamSlider();
    this.logoTransition().startAnimation(); // Start the logo transition
  }

  ngOnDestroy(): void {
    this.pauseAutoSlide();
    this.pauseTeamAutoSlide();
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
    this.activateCurrentSlide();

    this.startAutoSlide();

    slider.addEventListener('mouseenter', () => this.pauseAutoSlide());
    slider.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  private initTeamSlider(): void {
    const teamSlider = this.teamSlider();
    const teamSliderDots = this.teamSliderDots();
    if (!teamSlider || !this.prevTeamSlideBtn() || !this.nextTeamSlideBtn() || !teamSliderDots) {
      console.error('Required team slider elements not found');
      return;
    }

    const slider = teamSlider.nativeElement;
    const dotsContainer = teamSliderDots.nativeElement;
    const totalSlides = this.teamMembers.length;

    this.createTeamDots(totalSlides, dotsContainer);
    this.updateTeamSlider();

    this.startTeamAutoSlide();

    slider.addEventListener('mouseenter', () => this.pauseTeamAutoSlide());
    slider.addEventListener('mouseleave', () => this.startTeamAutoSlide());
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

  private createTeamDots(totalSlides: number, container: HTMLElement): void {
    container.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === 0) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => this.goToTeamSlide(i));
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

    this.activateCurrentSlide();
  }

  private updateTeamSlider(): void {
    const slider = this.teamSlider().nativeElement;
    const dotsContainer = this.teamSliderDots().nativeElement;

    slider.style.transform = `translateX(-${this.currentTeamSlide * 100}%)`;

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot: Element, index: number) => {
      if (index === this.currentTeamSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  private activateCurrentSlide(): void {
    const slides = this.bannerSlider().nativeElement.querySelectorAll('.banner-slide');
    slides.forEach((slide: HTMLElement | Element, index: number) => {
  if (index === this.currentSlide) {
    slide.classList.add('active');
  } else {
    slide.classList.remove('active');
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

  nextTeamSlide(): void {
    this.currentTeamSlide = (this.currentTeamSlide + 1) % this.teamMembers.length;
    this.updateTeamSlider();
  }

  prevTeamSlide(): void {
    this.currentTeamSlide =
      (this.currentTeamSlide - 1 + this.teamMembers.length) % this.teamMembers.length;
    this.updateTeamSlider();
  }

  goToTeamSlide(index: number): void {
    this.currentTeamSlide = index;
    this.updateTeamSlider();
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

  private startTeamAutoSlide(): void {
    this.teamSlideInterval = setInterval(() => this.nextTeamSlide(), 5000);
  }

  private pauseTeamAutoSlide(): void {
    if (this.teamSlideInterval) {
      clearInterval(this.teamSlideInterval);
      this.teamSlideInterval = undefined;
    }
  }
}