import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

declare var WOW: any;
declare var $: any;
declare var $: any;
declare var flatpickr: any;
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {
  private countersStarted = false;
  private counterSections: { element: Element, started: boolean }[] = [];

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
      }, 500);
    }
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
      console.error('No counter sections found on the page');
      return;
    }
    
    // Set up observers for all counter sections
    this.counterSections.forEach((section, index) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !section.started) {
            console.log(`Counter section ${index} is visible, starting counters`);
            this.startCountersInSection(section.element);
            section.started = true;
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(section.element);
    });
  }

  startCountersInSection(section: Element): void {
    // Find all counters within this section
    const counters = section.querySelectorAll('.count-text');
    
    counters.forEach((element) => {
      const $element = $(element);
      const countTo = parseInt($element.attr('data-stop') || '0');
      const countSpeed = parseInt($element.attr('data-speed') || '1500');
      
      console.log(`Starting counter: from 0 to ${countTo} with speed ${countSpeed}`);
      
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

  // ngAfterViewInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     // Initialize datepicker
  //     setTimeout(() => {
  //       try {
  //         // Initialize datepicker
  //         flatpickr("#datepicker", {
  //           dateFormat: "Y-m-d",
  //           minDate: "today"
  //         });

  //         // Initialize timepicker
  //         $('.time-picker').timepicker({
  //           timeFormat: 'h:mm p',
  //           interval: 30,
  //           minTime: '10',
  //           maxTime: '23:30',
  //           defaultTime: '11',
  //           startTime: '10:00',
  //           dynamic: false,
  //           dropdown: true,
  //           scrollbar: true
  //         });

  //         // Initialize nice select
  //         $('select.nice-select').niceSelect();
  //       } catch (error) {
  //         console.error('Error initializing form components:', error);
  //       }
  //     }, 100);
  //   }
  // }
  

}
