import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-about',
  imports: [MatExpansionModule, TitleCasePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  public packageList: { name: string; link: string }[] = [
    { name: 'angular', link: 'https://angular.io/' },
    { name: 'angular-material', link: 'https://material.angular.io/' },
    { name: 'fullCalendar', link: 'https://fullcalendar.io/docs/angular' },
    { name: 'ngx-infinite-scroll', link: 'https://www.npmjs.com/package/ngx-infinite-scroll' },
    { name: 'rxjs', link: 'https://rxjs.dev/' },
    { name: 'swiper', link: 'https://swiperjs.com/' },
  ];

  constructor() {}
}
