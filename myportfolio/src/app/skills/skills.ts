import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHtml5, faCss3Alt, faJs, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons';
import { Iskills } from '../core/interfaces/Iskills';
import { SkillsService } from '../core/services/skills-service';

@Component({
  selector: 'app-skills',
  standalone: true,
  providers:[SkillsService],
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements OnInit {
  skills !: Iskills[] ;
 
  constructor(private _skillsS:SkillsService){}
 
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this._skillsS.getData().subscribe(data=>{
      this.skills=data
       console.log('skill data:', this.skills);
    })
  }

  
}
