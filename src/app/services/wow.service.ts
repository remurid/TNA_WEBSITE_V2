import { Injectable } from '@angular/core';

declare const WOW: any;

@Injectable({
  providedIn: 'root'
})
export class WowService {
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

  init() {
    this.wow.init();
  }
} 