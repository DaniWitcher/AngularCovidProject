import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  slides: any[] = new Array(6).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: './assets/i1.png',
    };
    this.slides[1] = {
      src: './assets/i2.png',
    }
    this.slides[2] = {
      src: './assets/i3.png',
    }
    this.slides[3] = {
      src: './assets/i4.png',
    }
    this.slides[4] = {
      src: './assets/i5.png',
    }
    this.slides[5] = {
      src: './assets/i6.png',
    }
  }
}
