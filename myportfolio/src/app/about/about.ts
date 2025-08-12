import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Iabout } from '../core/interfaces/Iabout';

import { AboutService } from '../core/services/about-service';
@Component({
  selector: 'app-about',
  standalone: true,
  providers: [AboutService],
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
aboutData!: Iabout;

  constructor(private _aboutS: AboutService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._aboutS.getData().subscribe(data => {
      this.aboutData = data[0];
      console.log('About data:', this.aboutData);
    });
  }
   
}

