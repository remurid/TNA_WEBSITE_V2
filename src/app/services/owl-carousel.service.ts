import { Injectable, OnInit } from '@angular/core';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class OwlCarouselService implements OnInit {
  constructor() {}

  ngOnInit() {
    this.initCarousels();
  }

  initCarousels() {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  }
} 