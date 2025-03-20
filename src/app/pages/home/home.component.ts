import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

declare var WOW: any;
declare var $: any;
declare var flatpickr: any;
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {
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
