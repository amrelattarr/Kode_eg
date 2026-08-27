import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  id: string;
  icon: string;
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
    { number: '250+', label: 'Events Organized' },
    { number: '100K+', label: 'Guests Managed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '360°', label: 'Turnkey Production' }
  ];

  // Services Data (Events Focus)
  services: ServiceItem[] = [
    {
      id: 'corporate-summits',
      icon: 'award',
      title: 'Corporate Summits & Conferences',
      shortDesc: 'Turnkey planning, stage design, keynote setup, and multi-track session management for business leaders.',
      fullDesc: 'We handle every detail of your corporate conference—from venue selection and stage architecture to sound engineering, speaker hospitality, and high-impact visual presentations.',
      features: ['Stage & Lighting Architecture', 'Keynote & Panel Coordination', 'AV & Acoustic Sound Design', 'Multi-Language Translation Hubs'],
      tag: 'Conferences'
    },
    {
      id: 'brand-activations',
      icon: 'sparkles',
      title: 'Brand Activations & Launches',
      shortDesc: 'Immersive experiential setups, interactive brand booths, product reveals, and live PR events.',
      fullDesc: 'Transform product launches into unforgettable moments. We design interactive brand activations that captivate media, influencers, and attendees with custom booth builds and engaging experiences.',
      features: ['Experiential Booth Design', 'Press & Media Coordination', 'VIP Red Carpet Management', 'Interactive Photo & AR Booths'],
      tag: 'Brand Experience'
    },
    {
      id: 'galas-concerts',
      icon: 'music',
      title: 'Galas, Award Shows & Concerts',
      shortDesc: 'High-end lighting design, sound staging, celebrity hospitality, and gala dinner production.',
      fullDesc: 'Deliver elegance and excitement. Our team produces grand award ceremonies, charity galas, and live concerts featuring state-of-the-art stage setups and flawless choreography.',
      features: ['VIP Seating & Catering Flow', 'Artist & Talent Management', 'Custom Stage Scenery & LED Screens', 'Pyrotechnics & Special Effects'],
      tag: 'Entertainment'
    },
    {
      id: 'guest-management',
      icon: 'users',
      title: 'Guest Management & Ticketing',
      shortDesc: 'Seamless online ticketing, instant QR check-in, fast badge printing, and VIP concierge.',
      fullDesc: 'Eliminate long queues with KODE\'s event access logistics. We provide instant QR ticket verification, fast badge generation, VIP entry lanes, and real-time attendance dashboards.',
      features: ['Instant QR Check-in System', 'On-Site Badge Printing', 'VIP Concierge & Protocol', 'Real-Time Capacity Analytics'],
      tag: 'Event Logistics'
    },
    {
      id: 'exhibition-trade',
      icon: 'grid',
      title: 'Exhibitions & Trade Shows',
      shortDesc: 'Custom booth construction, venue floor planning, electrical distribution, and exhibitor services.',
      fullDesc: 'Complete trade show management for large-scale expos. We design venue layouts, construct custom exhibitor booths, and manage power, security, and logistics.',
      features: ['3D Floorplan & Spatial Layout', 'Custom Wooden & Aluminum Booths', 'Exhibitor Support Portal', 'Freight & Freight Rigging Logistics'],
      tag: 'Expos & Fairs'
    },
    {
      id: 'live-broadcast',
      icon: 'video',
      title: 'Hybrid Events & Live Streaming',
      shortDesc: '4K multi-camera broadcast streaming, hybrid audience engagement, and post-event media creation.',
      fullDesc: 'Extend your reach worldwide. We broadcast your event in ultra-high-definition to virtual audiences with interactive live Q&A, polls, and instant social media highlights.',
      features: ['Multi-Camera 4K Live Broadcast', 'Hybrid Event Virtual Platform', 'Real-Time Audience Q&A Polling', 'Same-Day Video Highlights Edit'],
      tag: 'Media Production'
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
      image: 'otel event.jpg',
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
      image: 'otel event.jpg',
      quote: '“We combine creative art with precision logistics to build extraordinary moments that captivate every guest.”',
      author: 'KODE Operations Lead',
      role: 'Experiential Brand Expo',
      eventTitle: 'Global Innovation & Trade Expo 2026',
      description: 'Full-scale trade expo management spanning over 10,000+ attendees, custom brand booths, real-time QR badge verification, and 4K livestreaming.',
      metrics: ['10,000+ Attendees', 'Custom Booth Builds', '360° Media Coverage'],
      imageLeft: true
    }
  ];

  // Social Platforms for Contact Us Section
  socialPlatforms: SocialPlatform[] = [
    {
      name: 'Instagram',
      handle: '@kode.events.eg',
      url: 'https://instagram.com',
      icon: 'instagram',
      colorClass: 'insta',
      btnText: 'Follow on Instagram'
    },
    {
      name: 'WhatsApp',
      handle: '+20 10 1234 5678',
      url: 'https://wa.me/201012345678',
      icon: 'whatsapp',
      colorClass: 'whatsapp',
      btnText: 'Chat on WhatsApp'
    },
    {
      name: 'LinkedIn',
      handle: 'KODE Events Organization',
      url: 'https://linkedin.com',
      icon: 'linkedin',
      colorClass: 'linkedin',
      btnText: 'Connect on LinkedIn'
    },
    {
      name: 'Facebook',
      handle: 'KODE Events EG',
      url: 'https://facebook.com',
      icon: 'facebook',
      colorClass: 'facebook',
      btnText: 'Visit Facebook Page'
    },
    {
      name: 'Direct Phone',
      handle: '+20 (2) 2345-6789',
      url: 'tel:+20223456789',
      icon: 'phone',
      colorClass: 'phone',
      btnText: 'Call Us Now'
    },
    {
      name: 'Email Inquiry',
      handle: 'info@kode-eg.com',
      url: 'mailto:info@kode-eg.com',
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
