import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {PageMeta} from '../../models/meta.model';
import {SeoService} from '../../services/seo.service';

interface Meta {
  text: string;
  iconPath: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  event: string;
}

interface Album {
  title: string;
  description: string;
  images: GalleryImage[];
  meta: Meta[];
}

@Component({
  selector: 'app-pictures',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPage implements OnInit {
  private seoService = inject(SeoService);

  selectedImage: GalleryImage | null = null;

  // Events array to be initialized in ngOnInit
  events: Album[] = [];

  keydownSpaceHandler(event: KeyboardEvent, image: GalleryImage): void {
    event.preventDefault();
    this.openModal(image);
  }

  // Helper method to create an album
  private createAlbum(
    title: string,
    description: string,
    images: GalleryImage[],
    meta: Meta[] = [],
  ): Album {
    return {title, description, meta, images};
  }

  ngOnInit(): void {
    const pageMeta: PageMeta = {
      title: 'Gallery',
      description:
        'Browse through our collection of photos from various club events, workshops, and activities.',
      keywords:
        'gallery, photos, events, volunteer work, programming workshops, computer science club, CODERS, UWL, community service',
    };
    this.seoService.setPageMeta(pageMeta);
    this.events = [
      this.createAlbum(
        "Volunteer Work at Boys' and Girls' Club",
        'Weekly Sessions of Volunteering Dedicated to Teach Computer Science Concepts.',
        [
          {
            src: 'assets/images/boys-and-girls/IMG_6750.webp',
            alt: 'Andree Helping A Student Improve their Problem-Solving Skills',
            caption: 'Andree Helping A Student Improve their Problem-Solving Skills',
            event: 'UWL | Boys and Girls Club',
          },
          {
            src: 'assets/images/boys-and-girls/IMG_6737.webp',
            alt: "Luke Checking A Student's Code",
            caption: 'Luke Checking Code',
            event: 'UWL | Boys and Girls Club',
          },
          {
            src: 'assets/images/boys-and-girls/IMG_6745.webp',
            alt: 'Andree Guiding A Student on How to Solve a Coding Problem',
            caption: 'Andree Guiding A Student on How to Solve a Coding Problem',
            event: 'UWL | Boys and Girls Club',
          },
        ],
        [
          {
            text: ' La Crosse',
            iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
          },
        ],
      ),

      this.createAlbum(
        'Cookies With CODERS',
        'A Weekly Event to Hang out, Work On Projects, and Eat Cookies!',
        [
          {
            src: 'assets/images/cookies-with-coders/IMG_6956.webp',
            alt: 'Chill Guys Working on the Website Project',
            caption: 'Chill Guys Working on the Website',
            event: 'Cookies With CODERS | Weekly Event',
          },
          {
            src: 'assets/images/cookies-with-coders/IMG_7013.webp',
            alt: 'Oreos!!!',
            caption: 'Oreos!!!',
            event: 'Cookies With CODERS | Weekly Event',
          },
          {
            src: 'assets/images/cookies-with-coders/IMG_7008.webp',
            alt: 'Putting Final Touches on the Website Project',
            caption: 'Putting Final Touches on the Website Project',
            event: 'Cookies With CODERS | Weekly Event',
          },
        ],
        [
          {
            text: ' UWL',
            iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
          },
        ],
      ),

      this.createAlbum(
        "Kids' College | April 2025",
        'Volunteering to Teach 6-8th Graders the Wonderful World of Computer Science!',
        [
          {
            src: 'assets/images/kids-college/IMG_0875.webp',
            alt: 'Brendan Teaching Students How To Think Critically',
            caption: 'Brendan Teaching Students How To Think Critically',
            event: "Kids' College | April 2025",
          },
          {
            src: 'assets/images/kids-college/IMG_6891.webp',
            alt: 'Students Discussing to Solve the Maze',
            caption: 'Students Discussing to Solve the Maze',
            event: "Kids' College | April 2025",
          },
          {
            src: 'assets/images/kids-college/IMG_6895.webp',
            alt: 'Students Attempting to Solve A Puzzle',
            caption: 'Students Attempting to Solve A Puzzle',
            event: "Kids' College | April 2025",
          },
          {
            src: 'assets/images/kids-college/IMG_0878.webp',
            alt: 'A Group of Students Solved The Puzzle!',
            caption: 'A Group of Students Solved The Puzzle!',
            event: "Kids' College | April 2025",
          },
          {
            src: 'assets/images/kids-college/IMG_6889.webp',
            alt: 'Zheyi and Jack Presenting Facts of CS Majors',
            caption: 'Zheyi and Jack Presenting Topics of CS',
            event: "Kids' College | April 2025",
          },
          {
            src: 'assets/images/kids-college/IMG_6899.webp',
            alt: 'Jack Handing Out Candy to The Winners',
            caption: 'Jack Handing Out Candy to The Winners',
            event: "Kids' College | April 2025",
          },
        ],
        [
          {
            text: ' UWL',
            iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
          },
        ],
      ),

      this.createAlbum(
        'All of Our Past Events',
        'A Variety of Volunteer Opportunities Both On and Off Campus!',
        [
          {
            src: 'assets/images/trick-or-treat/2024/IMG_6144.webp',
            alt: 'Friends Handing Out Candy',
            caption: 'Friends Handing Out Candy',
            event: 'Enchanted Forest Trick Or Treat Trail | October 2024',
          },
          {
            src: 'assets/images/other/IMG_7388.webp',
            alt: 'The CODERS Math and Science Career Forum Booth',
            caption: 'The CODERS Math and Science Career Forum Booth',
            event: 'Math and Science Career Forum | November 2024',
          },
          {
            src: 'assets/images/trick-or-treat/2024/IMG_6146.webp',
            alt: 'Jack being Jack',
            caption: 'Jack Being Jack',
            event: 'Enchanted Forest Trick Or Treat Trail | October 2024',
          },
        ],
        [
          {
            text: ' La Crosse',
            iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
          },
        ],
      ),
    ];
  }

  openModal(image: GalleryImage): void {
    this.selectedImage = image;
  }

  closeModal(): void {
    this.selectedImage = null;
  }

  onBackdropClick(event: Event): void {
    // Only proceed if it's a MouseEvent or keyboard Enter/Space key
    if (
      event.type === 'click' ||
      (event instanceof KeyboardEvent && (event.key === 'Enter' || event.key === ' '))
    ) {
      if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
        this.closeModal();
      }
    }
  }
}
