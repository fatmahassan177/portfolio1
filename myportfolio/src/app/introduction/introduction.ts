import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IIntro } from '../core/interfaces/Iintro';
import { IntroService } from '../core/services/intro-service';
import { About } from '../about/about';
import { Project } from '../project/project';
import { Skills } from '../skills/skills';
import { ContactUs } from '../contact-us/contact-us';
@Component({
  selector: 'app-introduction',
  imports: [CommonModule,About,Project,Skills,ContactUs],
  providers:[IntroService],
  templateUrl: './introduction.html',
  styleUrl: './introduction.css'
})
export class Introduction implements OnInit {
   introData!: IIntro;

     constructor(private _introS:IntroService){}

   ngOnInit() {
    this.getData()
  }

  getData() {
    this._introS.getData().subscribe(data => {
      this.introData = data[0];
      console.log('Intro data:', this.introData);
    });
   
    
}}



