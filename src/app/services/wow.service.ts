import { Injectable, OnInit } from '@angular/core';

declare const WOW: any;

@Injectable({
  providedIn: 'root'
})
export class WowService implements OnInit {
  private wow: any;

  constructor() {
    this.wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    });
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.wow.init();
  }
} 