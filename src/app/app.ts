import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  id: string;
  icon: string;
  image: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  tag: string;
}

interface EventShowcase {
  id: string;
  number: string;
  tag: string;
  image: string;
  quote: string;
  author: string;
  role: string;
  eventTitle: string;
  description: string;
  metrics: string[];
  imageLeft: boolean;
}

interface SocialPlatform {
  name: string;
  handle: string;
  url: string;
  icon: string;
  colorClass: string;
  btnText: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'KODE Events';
  activeSection = 'hero';
  mobileMenuOpen = false;
  scrolledNav = false;

  // Modals state
  activeServiceModal: ServiceItem | null = null;
  activeShowcaseModal: EventShowcase | null = null;
  toastMessage: string | null = null;

  // Nav Items required by user
  navItems = [
    { label: 'Who We Are', target: 'who-we-are' },
    { label: 'Services', target: 'services' },
    { label: 'Events', target: 'events' },
    { label: 'Contact Us', target: 'contact-us' }
  ];

  // Stats
  stats = [
    { number: '100+', label: 'Events Organized' },
    { number: '10K+', label: 'Guests Managed' },
    // { number: '98%', label: 'Client Satisfaction' },
    // { number: '360°', label: 'Turnkey Production' }
  ];

  // Services Data
  services: ServiceItem[] = [
    {
      id: 'event-management',
      icon: 'award',
      image: 'svc_event_management_1788127463884.png',
      title: 'Event Management',
      shortDesc: 'From planning to execution, we manage every detail to deliver seamless and memorable events.',
      fullDesc: 'From planning to execution, we manage every detail to deliver seamless and memorable events. Our team handles venue coordination, scheduling, vendor management, and on-site oversight to ensure a flawless experience from start to finish.',
      features: ['End-to-End Event Planning', 'Vendor & Venue Coordination', 'Timeline & Schedule Management', 'On-Site Supervision & Execution'],
      tag: '01 — Event Management'
    },
    {
      id: 'guest-management',
      icon: 'users',
      image: 'svc_guest_management_1788127474574.png',
      title: 'Guest Management',
      shortDesc: 'A smooth guest journey from the moment of arrival, including registration and guest organization.',
      fullDesc: 'A smooth guest journey from the moment of arrival. We manage guest lists, arrivals, seating coordination, and VIP hospitality to ensure every attendee feels welcomed and well-attended throughout the event.',
      features: ['Guest List & RSVP Management', 'VIP Protocol & Concierge', 'Arrival Coordination & Seating', 'Real-Time Guest Flow Tracking'],
      tag: '02 — Guest Management'
    },
    {
      id: 'qr-invitation',
      icon: 'sparkles',
      image: 'svc_qr_invitation_1788127484743.png',
      title: 'QR Invitation & Access System',
      shortDesc: 'Smart digital invitations and QR-based access control for a faster, smoother check-in experience.',
      fullDesc: 'Smart digital invitations and QR-based access control for a faster, smoother check-in experience. We deliver personalized digital invitations with unique QR codes that enable instant scanning and access verification at the event gate.',
      features: ['Personalized Digital Invitations', 'Instant QR Code Scanning', 'Real-Time Access Verification', 'Guest Check-In Analytics'],
      tag: '03 — QR Invitation & Access'
    },
    {
      id: 'registration-management',
      icon: 'grid',
      image: 'svc_registration_1788127500055.png',
      title: 'Registration Management',
      shortDesc: 'Professional registration desks and on-ground teams to ensure an organized and efficient guest experience.',
      fullDesc: 'Professional registration desks and dedicated on-ground teams to ensure an organized, efficient, and welcoming guest experience. We handle pre-event registration setup, badge printing, and real-time attendee tracking.',
      features: ['Pre-Event Online Registration', 'On-Site Badge Printing', 'Dedicated Registration Staff', 'Attendee Data & Reporting'],
      tag: '04 — Registration Management'
    },
    {
      id: 'onground-management',
      icon: 'music',
      image: 'svc_onground_1788127510223.png',
      title: 'On-Ground Management',
      shortDesc: 'Experienced teams managing operations, guest flow, coordination, and every detail throughout the event.',
      fullDesc: 'Experienced on-ground teams managing every operational aspect of your event. From coordinating vendors and managing guest flow to resolving on-site challenges instantly, our team ensures everything runs perfectly.',
      features: ['Operations & Logistics Control', 'Guest Flow Coordination', 'Vendor & Crew Management', 'Real-Time Problem Resolution'],
      tag: '05 — On-Ground Management'
    },
    {
      id: 'event-staffing',
      icon: 'users',
      image: 'svc_staffing_1788127519894.png',
      title: 'Event Staffing',
      shortDesc: 'Professional hosts, hostesses, registration teams, and event staff selected to represent your brand perfectly.',
      fullDesc: 'We provide professional hosts, hostesses, registration teams, and event staff who are trained, elegantly dressed, and briefed to represent your brand with the highest level of professionalism.',
      features: ['Trained Hosts & Hostesses', 'Registration & Welcome Teams', 'Brand-Aligned Staff Presentation', 'Flexible Staffing Solutions'],
      tag: '06 — Event Staffing'
    },
    {
      id: 'entry-control',
      icon: 'grid',
      image: 'svc_entry_control_1788127536537.png',
      title: 'Entry Control Solutions',
      shortDesc: 'Organized access management using smart systems and professional teams to keep every entrance running smoothly.',
      fullDesc: 'Organized access management using smart systems and professional teams. We design and implement comprehensive entry control solutions including barriers, access lanes, and staff deployment to maintain smooth and secure event entry.',
      features: ['Smart Access Control Systems', 'Barrier & Gate Management', 'Security Coordination', 'Multi-Entrance Management'],
      tag: '07 — Entry Control'
    },
    {
      id: 'event-setup',
      icon: 'award',
      image: 'svc_setup_logistics_1788127547495.png',
      title: 'Event Setup & Logistics',
      shortDesc: 'From barriers and registration setups to operational logistics, we make sure everything is ready when it matters.',
      fullDesc: 'From barriers and registration desk setups to full operational logistics, we ensure every element of your event is installed, organized, and ready on time. We manage delivery, installation, and breakdown of all event infrastructure.',
      features: ['Event Infrastructure Setup', 'Registration Desk Installation', 'Barriers & Crowd Management', 'Operational Logistics Planning'],
      tag: '08 — Setup & Logistics'
    },
    {
      id: 'media-coverage',
      icon: 'video',
      image: 'svc_media_coverage_1788127558062.png',
      title: 'Media Coverage',
      shortDesc: 'Capturing the moments that matter through professional photo and video coverage.',
      fullDesc: 'Capturing the moments that matter through professional photo and video coverage. Our media team delivers high-quality event photography and videography, ensuring every key moment is professionally documented and ready for sharing.',
      features: ['Professional Photography', 'Event Videography', 'Same-Day Highlight Edits', 'Social Media Content Delivery'],
      tag: '09 — Media Coverage'
    }
  ];

  // 3 Alternating Event Showcases for Events Section (Image + Quote Zig-Zag)
  eventShowcases: EventShowcase[] = [
    {
      id: 'showcase-1',
      number: '01',
      tag: 'GRAND SUMMITS & CONFERENCES',
      image: 'otel event.jpg',
      quote: '“Events are not just gatherings; they are powerful brand statements that leave lasting impressions for years.”',
      author: 'KODE Production Director',
      role: 'Luxury Hotel Summit Showcase',
      eventTitle: 'Middle East Business & Tech Summit 2026',
      description: 'Produced in a luxury hotel grand ballroom featuring custom 360-degree LED video walls, precision sound engineering, and flawless VIP reception.',
      metrics: ['500+ Executive Guests', 'Turnkey Stage & AV', '100% On-Time Execution'],
      imageLeft: true
    },
    {
      id: 'showcase-2',
      number: '02',
      tag: 'EXCLUSIVE GALAS & AWARDS',
      image: 'nobu.png',
      quote: '“Excellence is in every single detail—from the first VIP red carpet welcome to the final standing ovation.”',
      author: 'KODE Event Architect',
      role: 'Annual Leadership Gala',
      eventTitle: 'The Business Leadership & Gala Awards',
      description: 'An elegant evening combining high-end gala catering, automated stage lighting choreography, and seamless guest arrival protocol.',
      metrics: ['Red Carpet Reception', 'Custom Stage Scenery', 'VIP Protocol Concierge'],
      imageLeft: false
    },
    {
      id: 'showcase-3',
      number: '03',
      tag: 'INTERNATIONAL EXPOS & ACTIVATIONS',
      image: 'ferrari.png',
      quote: '“We combine creative art with precision logistics to build extraordinary moments that captivate every guest.”',
      author: 'KODE Operations Lead',
      role: 'Experiential Brand Expo',
      eventTitle: 'Global Innovation & Trade Expo 2026',
      description: 'Full-scale trade expo management spanning over 10,000+ attendees, custom brand booths, real-time QR badge verification, and 4K livestreaming.',
      metrics: ['10,000+ Attendees', 'Custom Booth Builds', '360° Media Coverage'],
      imageLeft: true
    },
    {
      id: 'showcase-3',
      number: '03',
      tag: 'INTERNATIONAL EXPOS & ACTIVATIONS',
      image: 'taghmisa.png',
      quote: '“We combine creative art with precision logistics to build extraordinary moments that captivate every guest.”',
      author: 'KODE Operations Lead',
      role: 'Experiential Brand Expo',
      eventTitle: 'Global Innovation & Trade Expo 2026',
      description: 'Full-scale trade expo management spanning over 10,000+ attendees, custom brand booths, real-time QR badge verification, and 4K livestreaming.',
      metrics: ['10,000+ Attendees', 'Custom Booth Builds', '360° Media Coverage'],
      imageLeft: true
    },
    // {
    //   id: 'showcase-3',
    //   number: '03',
    //   tag: 'INTERNATIONAL EXPOS & ACTIVATIONS',
    //   image: 'mava.png',
    //   quote: '“We combine creative art with precision logistics to build extraordinary moments that captivate every guest.”',
    //   author: 'KODE Operations Lead',
    //   role: 'Experiential Brand Expo',
    //   eventTitle: 'Global Innovation & Trade Expo 2026',
    //   description: 'Full-scale trade expo management spanning over 10,000+ attendees, custom brand booths, real-time QR badge verification, and 4K livestreaming.',
    //   metrics: ['10,000+ Attendees', 'Custom Booth Builds', '360° Media Coverage'],
    //   imageLeft: true
    // }
  ];

  // Social Platforms for Contact Us Section
  socialPlatforms: SocialPlatform[] = [
    {
      name: 'Instagram',
      handle: '@kode.eg',
      url: 'https://www.instagram.com/kode.eg?igsi=MXIydGgxYXp4bmJ0MQ==',
      icon: 'instagram',
      colorClass: 'insta',
      btnText: 'Follow on Instagram'
    },
    {
      name: 'WhatsApp',
      handle: '+20 10 6481 9789',
      url: 'https://wa.me/201064819789',
      icon: 'whatsapp',
      colorClass: 'whatsapp',
      btnText: 'Chat on WhatsApp'
    },
    // {
    //   name: 'LinkedIn',
    //   handle: 'KODE Events Organization',
    //   url: 'https://linkedin.com',
    //   icon: 'linkedin',
    //   colorClass: 'linkedin',
    //   btnText: 'Connect on LinkedIn'
    // },
    {
      name: 'Facebook',
      handle: 'Kode',
      url: 'https://www.facebook.com/share/1DJgrRaV39/?mibextid=wwXIfr',
      icon: 'facebook',
      colorClass: 'facebook',
      btnText: 'Visit Facebook Page'
    },
    {
      name: 'Direct Phone',
      handle: '+20 10 9496 9899',
      url: 'tel:+201094969899',
      icon: 'phone',
      colorClass: 'phone',
      btnText: 'Call Us Now'
    },
    {
      name: 'Email Inquiry',
      handle: 'kode.events.eg@gmail.com',
      url: 'mailto:kode.events.eg@gmail.com',
      icon: 'mail',
      colorClass: 'mail',
      btnText: 'Send an Email'
    }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolledNav = window.scrollY > 40;
    this.updateActiveSectionOnScroll();
  }

  scrollTo(targetId: string) {
    this.mobileMenuOpen = false;
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  updateActiveSectionOnScroll() {
    const sections = ['who-we-are', 'services', 'events', 'contact-us'];
    const scrollPos = window.scrollY + 120;

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          this.activeSection = sectionId;
          return;
        }
      }
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  openServiceModal(service: ServiceItem) {
    this.activeServiceModal = service;
  }

  closeServiceModal() {
    this.activeServiceModal = null;
  }

  openShowcaseModal(showcase: EventShowcase) {
    this.activeShowcaseModal = showcase;
  }

  closeShowcaseModal() {
    this.activeShowcaseModal = null;
  }

  requestInquiry(showcase: EventShowcase) {
    this.activeShowcaseModal = null;
    this.showToast(`Inquiry initiated for ${showcase.eventTitle}! Connect with us on social media or WhatsApp below.`);
    this.scrollTo('contact-us');
  }

  showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => {
      if (this.toastMessage === msg) {
        this.toastMessage = null;
      }
    }, 4500);
  }
}


// <!-- HERO SECTION -->
// <section id="hero" class="hero-section">
//   <div class="hero-glow-1"></div>
//   <div class="hero-glow-2"></div>
  
//   <div class="hero-content">
//     <div class="badge-tag">
//       <span class="pulse-dot"></span>
//       FULL-SERVICE EVENT ORGANIZATION & PRODUCTION
//     </div>

//     <h1 class="hero-title">
//       Crafting Unforgettable <br />
//       <span class="gradient-text">Events & Experiences</span>
//     </h1>

//     <p class="hero-subtitle">
//       KODE is a premier event management and production company. We design, organize, and execute extraordinary corporate summits, brand activations, expos, and grand galas with flawless perfection.
//     </p>

//     <div class="hero-actions">
//       <button (click)="scrollTo('services')" class="btn btn-accent btn-lg">
//         Explore Event Services
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
//           <line x1="5" y1="12" x2="19" y2="12"></line>
//           <polyline points="12 5 19 12 12 19"></polyline>
//         </svg>
//       </button>
//       <button (click)="scrollTo('contact-us')" class="btn btn-outline btn-lg">
//         Connect With Us
//       </button>
//     </div>

//     <!-- Stats Grid -->
//     <div class="hero-stats grid-4 ">
//       <div *ngFor="let stat of stats" class="stat-card glass-card">
//         <span class="stat-number">{{ stat.number }}</span>
//         <span class="stat-label">{{ stat.label }}</span>
//       </div>
//     </div>
//   </div>
// </section>