import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

declare var WOW: any;
declare var $: any;
declare var flatpickr: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit  {
  
  private countersStarted = false;
  private counterSections: { element: Element, started: boolean }[] = [];


  year: number = new Date().getFullYear();
  testimonials = [
    {
      image: 'assets/wp-content/uploads/2023/01/testimonial-1-4.jpg',
      text: 'There are many variations of passage of available but the majority have suffered alteration in some form by injected humor or randomed.',
      name: 'Jimmy Smith',
      role: 'Customer'
    },
    {
      image: 'assets/wp-content/uploads/2023/01/testimonial-2-2.jpg',
      text: 'There are many variations of passage of available but the majority have suffered alteration in some form by injected humor or randomed.',
      name: 'Sarah Albert',
      role: 'Customer'
    },
    {
      image: 'assets/wp-content/uploads/2023/01/testimonial-2-1.jpg',
      text: 'There are many variations of passage of available but the majority have suffered alteration in some form by injected humor or randomed.',
      name: 'Bonnie Tolbet',
      role: 'Customer'
    },
    {
      image: 'assets/wp-content/uploads/2023/01/testimonial-1-3.jpg',
      text: 'There are many variations of passage of available but the majority have suffered alteration in some form by injected humor or randomed.',
      name: 'Christine Eve',
      role: 'Customer'
    }
  ];


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    // Only initialize WOW.js in the browser, not during server-side rendering
    if (isPlatformBrowser(this.platformId)) {
      // Delay initialization to ensure DOM is ready
      setTimeout(() => {
        try {
          const wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
          });
          wow.init();
          
        } catch (error) {
          console.error('Error initializing WOW.js:', error);
        }
      }, 0);
    }
  }
  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.setupAllCounters();
        // Initialize datepicker
      $('#datepicker').datepicker();

      // Initialize timepicker
      $('.time-picker').timepicker();

      // Initialize nice-select
      $('select').niceSelect();
      }, 500);

      
    }
  }

  

  startCountersInSection(section: Element): void {
    // Find all counters within this section
    const counters = section.querySelectorAll('.count-text');
    
    counters.forEach((element) => {
      const $element = $(element);
      const countTo = parseInt($element.attr('data-stop') || '0');
      const countSpeed = parseInt($element.attr('data-speed') || '1500');
      
      
      // Create animation object
      const animObj = { countNum: 0 };
      
      $(animObj).animate({
        countNum: countTo
      }, {
        duration: countSpeed,
        easing: 'linear',
        step: () => {
          $element.text(Math.floor(animObj.countNum));
        },
        complete: () => {
          $element.text(countTo);
        }
      });
    });
  }


      


  
  setupAllCounters(): void {
    // Find all sections containing counters
    const counterOneSection = document.querySelector('.counter-one');
    const aboutOneSection = document.querySelector('.about-one__satisfied');
    
    // Add all counter sections to our tracking array
    if (counterOneSection) {
      this.counterSections.push({ element: counterOneSection, started: false });
    }
    
    if (aboutOneSection) {
      this.counterSections.push({ element: aboutOneSection, started: false });
    }
    
    if (this.counterSections.length === 0) {

      return;
    }
    
    // Set up observers for all counter sections
    this.counterSections.forEach((section, index) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !section.started) {
            this.startCountersInSection(section.element);
            section.started = true;
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(section.element);
    });
  }

  
 

}